import { setUserApproval } from 'server/users/users';

const getCollectionResults = async (req, res) => {
  const { user, approval } = req.body;
  if (!user || approval === undefined)
    return res.status(400).json('Invalid parameters!');

  const result = await setUserApproval(user, approval);
  return result ? res.status(200).json(result) : res.status(404).json([]);
};

export default getCollectionResults;
