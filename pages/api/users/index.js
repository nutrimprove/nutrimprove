import { setUserApproval, deleteUser } from '../../../server/db';

const getCollectionResults = async (req, res) => {
  if (req.method !== 'POST') return null;

  const { user, approval, deleteuser } = req.body;
  if (!user) return null;

  let result;
  if ('approval' in req.body) {
    result = await setUserApproval(user, approval);
  } else if (deleteuser === true) {
    result = await deleteUser(user);
  }
  return result ? res.status(200).json(result) : res.status(404);
};

export default getCollectionResults;
