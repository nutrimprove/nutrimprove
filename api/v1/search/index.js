import { connectToDatabase } from '../../../connect/db';

const getCollectionResults = async (req, res) => {
  const mongodb = await connectToDatabase(process.env.MONGODB_URI);
  const collection = await mongodb.collection('search_cache');
  const term = req.query.term ? { search_term: req.query.term } : {};
  const documents = await collection.find(term).toArray();

  return res.status(200).json({ documents });
};

export default getCollectionResults;
