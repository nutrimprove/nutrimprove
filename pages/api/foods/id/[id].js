import { getFood } from '../../../../server/foods/foods';

const getCollectionResults = async (req, res) => {
  const { id } = req.query;

  const result = await getFood(id);

  return result
    ? res.status(200).json(result)
    : res.status(404);
};

export default getCollectionResults;
