import { getHealthyUnflaggedFoods } from 'server/foods/foods';

const getCollectionResults = async (req, res) => {
  const result = await getHealthyUnflaggedFoods();

  return result ? res.status(200).json(result) : res.status(404).json([]);
};

export default getCollectionResults;
