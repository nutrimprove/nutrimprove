import { updateDB } from 'server/db/db';

const getCollectionResults = async (req, res) => {
  if (req.method !== 'POST') return null;

  const result = await updateDB();

  return result ? res.status(200).json(result) : res.status(404).json([]);
};

export default getCollectionResults;
