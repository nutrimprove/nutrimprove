import { deleteList } from 'server/users/users';

const getCollectionResults = async (req, res) => {
  const { user, list } = req.body;

  const result = await deleteList(user, list);

  return result ? res.status(200).json(result) : res.status(404).json([]);
};

export default getCollectionResults;
