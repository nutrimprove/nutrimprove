import url from 'url';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

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

const getDocuments = async (collectionName, query = {}) => {
  const mongodb = await connectToDatabase(URI);
  const collection = await mongodb.collection(collectionName);
  return collection.find(query).toArray();
};

const searchTermSchema = new mongoose.Schema(
  {
    search_term: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    matches: [
      {
        food_name: {
          type: String,
          required: true,
        },
        food_id: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const addSearchTerm = (searchTermObj, res) => {
  // Connect to mongoDB using mongoose
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(URI, function(err, res) {
      if (err) {
        console.log(`ERROR connecting to: ${URI}. ${err}`);
      } else {
        console.log(`Succeeded connected to: ${URI}`);
      }
    });
  }

  const term = searchTermObj.search_term;

  // Set new search term based on a schema
  const SearchTermModel = mongoose.model(
    'SearchTerm',
    searchTermSchema,
    'search_cache'
  );
  SearchTermModel.findOne({ search_term: term }, (err, result) => {
    if (err) {
      console.error(`Error when searching for '${term}': ${err}`);
    }
    if (!result) {
      const newSearchTerm = new SearchTermModel(searchTermObj);
      // Save search term document to DB
      newSearchTerm.save(err => {
        if (err) {
          console.error(`Error saving '${searchTermObj}'`);
        }
        return res.status(200).json(newSearchTerm);
      });
      console.log(`Search term cached: '${term}'`);
    }
  });
};

export { connectToDatabase, getDocuments, addSearchTerm };
