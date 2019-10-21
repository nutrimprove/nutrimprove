import { getRecommendations } from '../../../server/db';

const getCollectionResults = async (req, res) => {
  const { user } = req.query;

  if (!user) return res.status(400).json('User not specified!');;

  const result = await getRecommendations(user);
  return result
    ? res.status(200).json(result)
    : res.status(404);
};

export default getCollectionResults;
