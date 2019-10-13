import { addRecommendations } from '../../../server/db';

const getCollectionResults = async (req, res) => {
  let result;

  if (req.method === 'POST') {
    req.body.length
      ? (result = await addRecommendations(req.body))
      : console.warn('No recommendations payload!', req.body);
  }

  return result
    ? res.status(200).json(result)
    : res.status(404).json(result);
};

export default getCollectionResults;
