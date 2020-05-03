import { getFoodsByNutrient } from '../../../../server/foods/foods';

const getCollectionResults = async (req, res) => {
  const { nutrient, limit, filters } = req.query;
  const result = await getFoodsByNutrient(nutrient, limit, filters);

  return result
    ? res.status(200).json(result)
    : res.status(404).json([]);
};

export default getCollectionResults;
