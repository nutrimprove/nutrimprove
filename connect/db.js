import url from 'url';
import { MongoClient } from 'mongodb';

const URI = process.env.MONGODB_URI;

let db = null;

const connectToDatabase = async uri => {
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

const getCollection = async collectionName => {
  const mongodb = await connectToDatabase(URI);
  const collection = await mongodb.collection(collectionName);

  return collection;
};

const getDocuments = async (collectionName, query = {}) => {
  const collection = getCollection(collectionName);
  return collection.find(query).toArray();
};

const insertDocument = async (collectionName, documents) => {
  const collection = getCollection(collectionName);
  return collection.insert(documents);
};

export { connectToDatabase, getDocuments, insertDocument };
