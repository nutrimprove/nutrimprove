import connect from '../connect';
import usersSchema from './usersSchema';
import { calcPoints } from '../../helpers/userUtils';
import { getAllRecommendations } from '../recommendations/recommendations';

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
    { approved: approval }
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
          contributor => contributor.id === user.email
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
            }
          );
          usersPointsResult.push(userResult);
        })
      ))();
  }
  return usersPointsResult;
};

const addUserPoints = async (user, points) => {
  const UserConnection = await getUserConnection();
  const userRecord = await UserConnection.findOne({ email: user });
  const currentPoints = userRecord.points;
  return UserConnection.findOneAndUpdate(
    { email: user },
    { points: currentPoints + points }
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
};
