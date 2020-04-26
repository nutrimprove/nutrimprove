import { getFoods } from '../../../../server/foods/foods';

const getCollectionResults = async (req, res) => {
  const { withCategories } = req.query;
  const result = await getFoods(withCategories);
  return result
    ? res.status(200).json(result)
    : res.status(404);
};

export default getCollectionResults;
