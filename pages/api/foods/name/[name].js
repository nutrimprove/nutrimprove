import { getFoodByName } from '../../../../server/foods/foods';

const getCollectionResults = async (req, res) => {
  const { name } = req.query;
  const result = await getFoodByName(name);

  return result ? res.status(200).json(result) : res.status(404).json([]);
};

export default getCollectionResults;
