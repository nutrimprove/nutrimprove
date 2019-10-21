import { deleteUser } from '../../../../server/db';

const getCollectionResults = async (req, res) => {
  const { user } = req.body;
  if (!user) return null;

  const result = await deleteUser(user);
  return result ? res.status(200).json(result) : res.status(404);
};

export default getCollectionResults;
