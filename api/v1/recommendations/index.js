import { addRecommendations, getDocuments } from '../../../connect/db';

const getCollectionResults = async (req, res) => {
  const { cid } = req.query;

  let result;

  if (cid) {
    result = await getDocuments(
      'recommendations',
      {
        contributor_id: cid,
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

  return res.status(200).json(result);
};

export default getCollectionResults;
