import { addRecommendations, getDocuments } from '../../../server/db';

const getCollectionResults = async (req, res) => {
  const { user } = req.query;

  let result;

  if (user) {
    result = await getDocuments(
      'recommendations',
      {
        contributor_id: user,
      },
      {
        food: 1,
        recommendation: 1,
        contributor_id: 1,
        _id: 0,
      }
    );
  } else if (req.method === 'POST') {
    req.body.length
      ? (result = await addRecommendations(req.body))
      : console.warn('No recommendations payload!', req.body);
  }

  return result
    ? res.status(200).json(result)
    : res.status(404).json(result);
};

export default getCollectionResults;
