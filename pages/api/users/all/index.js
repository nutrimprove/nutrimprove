import { getAllUsers } from '../../../../server/users/users';

const getCollectionResults = async (req, res) => {
  const result = await getAllUsers();
  return result ? res.status(200).json(result) : res.status(404);
};

export default getCollectionResults;
