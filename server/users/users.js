import { calcPoints } from 'helpers/userUtils';
import connect from '../connect';
import { getAllRecommendations } from '../recommendations/recommendations';
import usersSchema from './usersSchema';

const getUserConnection = () => connect('users', usersSchema, 'users');

const getUser = async user => {
  const UserConnection = await getUserConnection();
  return UserConnection.findOne({ email: user });
};

const saveUser = async userObj => {
  const UserConnection = await getUserConnection();
  const newUser = new UserConnection(userObj);
  return newUser.save();
};

const setUserApproval = async (user, approval) => {
  const UserConnection = await getUserConnection();
  return UserConnection.findOneAndUpdate(
    { email: user },
    { approved: approval },
  );
};

const deleteUser = async user => {
  const UserConnection = await getUserConnection();
  return UserConnection.deleteOne({ email: user });
};

const getAllUsers = async () => {
  const UserConnection = await getUserConnection();
  return UserConnection.find({});
};

const getApprovedUsers = async () => {
  const UserConnection = await getUserConnection();
  return UserConnection.find({ approved: true });
};

const getNotApprovedUsers = async () => {
  const UserConnection = await getUserConnection();
  return UserConnection.find({ approved: false });
};

const updateAllUsersPoints = async () => {
  const usersPointsResult = [];
  let recommendations;
  let users;

  await Promise.all([
    (async () => {
      recommendations = await getAllRecommendations();
    })(),
    (async () => {
      users = await getAllUsers();
    })(),
  ]);

  if (recommendations && users) {
    const usersPoints = [];
    users.forEach(user => {
      let addedCount = 0;
      let incrementedCount = 0;
      recommendations.forEach(recommendation => {
        const userIndex = recommendation.contributors.findIndex(
          contributor => contributor.id === user.email,
        );
        if (userIndex !== -1) {
          if (userIndex === 0) {
            addedCount++;
          } else {
            incrementedCount++;
          }
        }
      });
      usersPoints.push({ user: user.email, addedCount, incrementedCount });
    });

    const UserConnection = await getUserConnection();
    // Updates users points asynchronously
    await (async () =>
      Promise.all(
        usersPoints.map(async ({ user, addedCount, incrementedCount }) => {
          const userResult = await UserConnection.findOneAndUpdate(
            { email: user },
            {
              points: calcPoints({
                added: addedCount,
                incremented: incrementedCount,
              }),
            },
            {
              returnNewDocument: true,
              projection: { _id: 0, email: 1, points: 1 },
            },
          );
          usersPointsResult.push(userResult);
        }),
      ))();
  }
  return usersPointsResult;
};

const addUserPoints = async (user, points) => {
  const UserConnection = await getUserConnection();
  return UserConnection.findOneAndUpdate({ email: user }, [
    { $set: { points: { $add: ['$points', points] } } },
  ]);
};

const savePreferences = async (user, preferences) => {
  const UserConnection = await getUserConnection();
  return UserConnection.findOneAndUpdate({ email: user }, [
    { $set: { preferences } },
  ]);
};

const editList = async (user, list) => {
  const UserConnection = await getUserConnection();
  return UserConnection.updateOne({ email: user },
    { $set: { 'lists.$[list]': list } },
    {
      upsert: true,
      arrayFilters: [{ 'list.id': list.id }],
    },
  );
};

const addList = async (user, list) => {
  const UserConnection = await getUserConnection();
  return UserConnection.updateOne({ email: user },
    { $addToSet: { lists: { ...list, created: Date.now() } } },
  );
};

export {
  getUserConnection,
  getUser,
  getAllUsers,
  getApprovedUsers,
  getNotApprovedUsers,
  setUserApproval,
  deleteUser,
  saveUser,
  addUserPoints,
  updateAllUsersPoints,
  savePreferences,
  editList,
  addList,
};
