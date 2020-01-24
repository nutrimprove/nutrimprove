import { getAllRecommendations } from '../../../../server/db';

const getCollectionResults = async (req, res) => {
  const result = await getAllRecommendations();

  return result ? res.status(200).json(result) : res.status(404);
};

export default getCollectionResults;