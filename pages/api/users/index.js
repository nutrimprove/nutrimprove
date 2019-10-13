import { setUserApproval, deleteUser } from '../../../server/db';

const getCollectionResults = async (req, res) => {
  let result;

  if (req.method === 'POST') {
    const { user, approval, deleteuser } = req.body;
    if (user) {
      if ('approval' in req.body) {
        result = await setUserApproval(user, approval);
      } else if (deleteuser === true) {
        result = await deleteUser(user);
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
