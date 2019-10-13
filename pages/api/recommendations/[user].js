import { getRecommendations } from '../../../server/db';

const getCollectionResults = async (req, res) => {
  const { user } = req.query;
  let result;

  if (user) {
    result = await getRecommendations(user);
  }

  return result
    ? res.status(200).json(result)
    : res.status(404);
};

export default getCollectionResults;
