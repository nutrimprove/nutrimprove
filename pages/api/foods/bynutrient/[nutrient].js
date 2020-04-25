import { getFoodsByNutrient } from '../../../../server/foods/foods';

const getCollectionResults = async (req, res) => {
  const { nutrient, limit } = req.query;
  const result = await getFoodsByNutrient(nutrient, limit);

  return result
    ? res.status(200).json(result)
    : res.status(404);
};

export default getCollectionResults;
