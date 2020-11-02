import { getHealthyFoods } from 'server/foods/foods';

const getCollectionResults = async (req, res) => {
  const result = await getHealthyFoods();

  return result ? res.status(200).json(result) : res.status(404).json([]);
};

export default getCollectionResults;
