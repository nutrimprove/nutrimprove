import { getDocuments } from '../../../server/db';

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
  }

  return result
    ? res.status(200).json(result)
    : res.status(404).json(result);
};

export default getCollectionResults;
