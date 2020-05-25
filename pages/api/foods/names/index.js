import { getAllFoodNames } from 'server/foods/foods';

const getCollectionResults = async (req, res) => {
  const result = await getAllFoodNames();

  return result ? res.status(200).json(result) : res.status(404).json([]);
};

export default getCollectionResults;
