import { connectToDatabase } from '../../../lib/db';

const getRecommendations = async (req, res) => {
  const mongodb = await connectToDatabase(process.env.MONGODB_URI);
  const collection = await mongodb.collection('recommendations');
  const recommendations = await collection.find({}).toArray();

  return res.status(200).json({ recommendations });
};

export default getRecommendations;
