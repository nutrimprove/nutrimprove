import { connectToDatabase } from '../../../connect/db';

const getCollectionResults = async (req, res) => {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = await db.collection('search_cache');
  const result = req.query.term
    ? await collection.findOne({ search_term: req.query.term })
    : await collection.find({}).toArray();

  return res.status(200).json({ result });
};

export default getCollectionResults;
