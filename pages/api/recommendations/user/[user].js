import { getUserRecommendations } from '../../../../server/recommendations/recommendations';

const getCollectionResults = async (req, res) => {
  const { user } = req.query;

  const result = await getUserRecommendations(user);

  return result
    ? res.status(200).json(result)
    : res.status(404);
};

export default getCollectionResults;
