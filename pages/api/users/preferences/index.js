import { savePreferences } from 'server/users/users';

const getCollectionResults = async (req, res) => {
  const { user, preferences } = req.body;

  const result = await savePreferences(user, preferences);

  return result ? res.status(200).json(result) : res.status(404).json([]);
};

export default getCollectionResults;
