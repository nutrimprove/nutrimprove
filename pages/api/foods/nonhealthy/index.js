import { getNonHealthyFoods } from 'server/foods/foods';

const getCollectionResults = async (req, res) => {
  const result = await getNonHealthyFoods();

  return result ? res.status(200).json(result) : res.status(404).json([]);
};

export default getCollectionResults;
