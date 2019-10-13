import {
  getUser,
  getAllUsers,
  getApprovedUsers,
  getNotApprovedUsers,
  saveUser,
} from '../../../server/db';

const getCollectionResults = async (req, res) => {
  let result;
  const { user } = req.query;

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

  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json(result);
  }
};

export default getCollectionResults;
