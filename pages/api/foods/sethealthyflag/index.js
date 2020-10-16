import { setHealthyFlag } from 'server/foods/foods';

const getCollectionResults = async (req, res) => {
  if (req.method === 'POST') {
    const { foodId, flag } = req.body;
    const result = await setHealthyFlag(foodId, flag);

    return result
      ? res.status(200).json(result)
      : res.status(404).json([]);
  }
};

export default getCollectionResults;
