import { getFoodById } from 'server/foods/foods';

const getCollectionResults = async (req, res) => {
  const { id } = req.query;
  const result = await getFoodById(id);

  return result
    ? res.status(200).json(result)
    : res.status(404).json([]);
};

export default getCollectionResults;
