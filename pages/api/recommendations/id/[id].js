import { getRecommendation } from '../../../../server/recommendations/recommendations';

const getCollectionResults = async (req, res) => {
  const { id } = req.query;

  const result = await getRecommendation(id);

  return result
    ? res.status(200).json(result)
    : res.status(404).json([]);
};

export default getCollectionResults;
