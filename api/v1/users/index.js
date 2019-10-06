import {
  getUser,
  getAllUsers,
  getApprovedUsers,
  getNotApprovedUsers,
  setUserApproval,
  deleteUser,
} from '../../../connect/db';

const getCollectionResults = async (req, res) => {
  let result;

  if (req.method === 'GET') {
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
      }
    }
  } else if (req.method === 'POST') {
    const { user, approval, deleteuser } = req.body;
    if (user) {
      if ('approval' in req.body) {
        result = await setUserApproval(user, approval);
      } else if (deleteuser === true) {
        result = await deleteUser(user);
        console.log('===== ( result ) =======>', result);
      }
    } else {
      console.warn('No user payload!', req.body);
    }
  }
  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json(result);
  }
};

export default getCollectionResults;
