import { addSearchTerm, connectToDatabase } from '../../../connect/db';
import { fetchFoods } from '../../../connect/api';

const formatSearchTerm = (searchTerm, foods) => {
  const searchTermObj = {
    search_term: searchTerm,
    matches: [],
  };
  if (foods) {
    foods.map(food => {
      const foodName = food.food.brand
        ? `${food.food.brand} ${food.food.label}`
        : food.food.label;
      searchTermObj.matches.push({
        food_id: food.food.foodId,
        food_name: foodName,
      });
    });
  }
  return searchTermObj;
};

const getCollectionResults = async (req, res) => {
  let { term } = req.query;

  if (term) {
    term = term.toLowerCase();

    const db = await connectToDatabase(process.env.MONGODB_URI);
    const collection = await db.collection('search_cache');

    if (term === '*') {
      // for testing
      return res.status(200).json(await collection.find({}).toArray());
    }

    let result = await collection.findOne({ search_term: term });

    if (!result) {
      const foods = await fetchFoods(term);
      const searchTermObject = formatSearchTerm(term, foods);
      result = await addSearchTerm(searchTermObject, res);
    }
    return res.status(200).json(result);
  }
};

export default getCollectionResults;
