import { getFoodsByIds } from 'server/foods/foods';

const getCollectionResults = async (req, res) => {
  if (req.method !== 'POST') return res.status(400).json(res.status);

  const { ids } = req.body;
  const result = await getFoodsByIds(ids);

  return result
    ? res.status(200).json(result)
    : res.status(404).json([]);
};

export default getCollectionResults;
