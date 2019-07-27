import { addSearchTerm, connectToDatabase } from '../../../connect/db';
import { fetchFoods } from '../../../connect/api';

const formatSearchTerm = (searchTerm, foods) => {
  const searchTermObj = {
    search_term: searchTerm,
    matches: [],
  };
  if (foods) {
    foods.map(food => {
      searchTermObj.matches.push({
        food_id: food.food.foodId,
        food_name: food.food.label,
      });
    });
  }
  return searchTermObj;
};

const getCollectionResults = async (req, res) => {
  const term = req.query.term;

  if (term) {
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