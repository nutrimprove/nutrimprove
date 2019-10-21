import { addRecommendations } from '../../../server/db';

const getCollectionResults = async (req, res) => {
  if (req.method !== 'POST') return null;

  const result = await addRecommendations(req.body);

  return result ? res.status(200).json(result) : res.status(404);
};

export default getCollectionResults;
