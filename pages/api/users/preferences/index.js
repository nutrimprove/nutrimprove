import { setPreferences } from '../../../../server/users/users';

const getCollectionResults = async (req, res) => {
  const { user, preferences } = req.body;

  const result = await setPreferences(user, preferences);

  return result ? res.status(200).json(result) : res.status(404).json([]);
};

export default getCollectionResults;
