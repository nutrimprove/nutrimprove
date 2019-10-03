import { getUser, getUsers, setUserApproval } from '../../../connect/db';

const getCollectionResults = async (req, res) => {
  let result;

  if (req.method === 'GET') {
    const { user } = req.query;
    if (user) {
      result = await getUser(user);
    } else {
      result = await getUsers();
    }
  } else if (req.method === 'POST') {
    const user = req.body.user;
    const approval = req.body.approval;
    user && 'approval' in req.body
      ? (result = await setUserApproval(user, approval))
      : console.warn('No user payload!', req.body);
  }
  if (result) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json(result);
  }
};

export default getCollectionResults;
