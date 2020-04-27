import { getNutrients } from '../../../../server/foods/foods';

const getCollectionResults = async (req, res) => {
  const { nutrientGroups } = req.query;
  const result = await getNutrients(nutrientGroups);

  return result ? res.status(200).json(result) : res.status(404);
};

export default getCollectionResults;
