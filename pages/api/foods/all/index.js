import { getAllFoods } from '../../../../server/foods/foods';

const getCollectionResults = async (req, res) => {
  const result = await getAllFoods();

  return result ? res.status(200).json(result) : res.status(404);
};

export default getCollectionResults;
