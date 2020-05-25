import { getAllRecommendations } from 'server/recommendations/recommendations';

const getCollectionResults = async (req, res) => {
  const result = await getAllRecommendations();

  return result ? res.status(200).json(result) : res.status(404).json([]);
};

export default getCollectionResults;
