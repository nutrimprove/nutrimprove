import { connectToDatabase } from '../../../connect/db';

const getCollectionResults = async (req, res) => {
  const term = req.query.term;

  if (term) {
    const db = await connectToDatabase(process.env.MONGODB_URI);
    const collection = await db.collection('search_cache');

    const result =
      term === '*'
        ? await collection.find({}).toArray()
        : await collection.findOne({ search_term: term });

    return res.status(200).json({ result });
  }
};

export default getCollectionResults;
