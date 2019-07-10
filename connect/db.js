import url from 'url';
import { MongoClient } from 'mongodb';

let db = null;

export const connectToDatabase = async uri => {
  // Return db if already cached
  if (db) {
    return db;
  }

  // Create new MongoDB connection
  const client = await MongoClient.connect(uri, { useNewUrlParser: true });

  // eslint-disable-next-line node/no-deprecated-api
  db = await client.db(url.parse(uri).pathname.substr(1));
  return db;
};

export const getDocuments = async (collectionName, query = {}) => {
  const mongodb = await connectToDatabase(process.env.MONGODB_URI);
  const collection = await mongodb.collection(collectionName);
  return collection.find(query).toArray();
};
