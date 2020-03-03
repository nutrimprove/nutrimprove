import { getRecommendationsByFood } from '../../../../server/db';

const getCollectionResults = async (req, res) => {
  const { food } = req.query;

  const result = await getRecommendationsByFood(food);

  return result
    ? res.status(200).json(result)
    : res.status(404);
};

export default getCollectionResults;
