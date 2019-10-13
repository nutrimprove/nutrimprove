import {
  getUser,
  getAllUsers,
  getApprovedUsers,
  getNotApprovedUsers,
  saveUser,
} from '../../../server/db';

const getCollectionResults = async (req, res) => {
  const { user } = req.query;
  let result;

  if (user) {
    switch (user) {
      case 'approved':
        result = await getApprovedUsers();
        break;
      case 'notapproved':
        result = await getNotApprovedUsers();
        break;
      case 'getall':
        result = await getAllUsers();
        break;
      default:
        result = await getUser(user);
        if (!result) {
          const newUserDocument = {
            email: user,
            role: 100,
            approved: false,
          };
          result = await saveUser(newUserDocument);
        }
    }
  }

  return result
    ? res.status(200).json(result)
    : res.status(404);
};

export default getCollectionResults;
