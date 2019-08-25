import url from 'url';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import {
  recommendationsSchema,
  searchTermSchema,
} from './schemas/mongoDBSchemas';

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

const getDocuments = async (
  collectionName,
  query = {},
  projection = {}
) => {
  const mongodb = await connectToDatabase(URI);
  const collection = await mongodb.collection(collectionName);
  return collection
    .find(query)
    .project(projection)
    .toArray();
};

const addSearchTerm = async searchTermObj => {
  // Connect to mongoDB using mongoose
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(URI, { useNewUrlParser: true }, err => {
      if (err) {
        console.error(`ERROR connecting to '${URI}': ${err}`);
      } else {
        console.log(`Succeeded connecting to '${URI}'`);
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
  return new Promise((resolve, reject) =>
    SearchTermModel.findOne({ search_term: term }, (err, result) => {
      if (err) {
        console.error(`Error when searching for '${term}': ${err}`);
        mongoose.disconnect();
        reject(err);
      }
      if (!result) {
        const newSearchTerm = new SearchTermModel(searchTermObj);
        // Save search term document to DB
        newSearchTerm.save(err => {
          if (err) {
            console.error(`Error saving '${term}': ${err}`);
            mongoose.disconnect();
            reject(err);
          }
          console.log(`Search term '${term}' cached`);
          mongoose.disconnect();
          resolve(newSearchTerm);
        });
      }
    })
  );
};

const addRecommendation = recommendationObj => {
  // Connect to mongoDB using mongoose
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(URI, err => {
      if (err) {
        console.error(`ERROR connecting to '${URI}': ${err}`);
      } else {
        console.log(`Succeeded connecting to '${URI}'`);
      }
    });
  }

  const AddRecommendationsModel = mongoose.model(
    'recommendations',
    recommendationsSchema,
    'recommendations'
  );

  const recommendations = {
    food_id: recommendationObj.foodId,
    recommendation_id: recommendationObj.recommendationId,
    contributor_id: recommendationObj.contributorId,
  };

  return new Promise((resolve, reject) =>
    AddRecommendationsModel.findOne(recommendations, (err, result) => {
      if (err) {
        console.error(`Error when checking for recommendation: ${err}`);
        mongoose.disconnect();
        reject(err);
      }
      if (result) {
        console.warn('Recommendation already exists!');
      } else {
        const newRecommendation = new AddRecommendationsModel(
          recommendations
        );

        newRecommendation.save(err => {
          if (err) {
            console.error(`Error saving recommendation: ${err}`);
            mongoose.disconnect();
            reject(err);
          } else {
            mongoose.disconnect();
            resolve(newRecommendation);
          }
        });
      }
    })
  );
};

export {
  connectToDatabase,
  getDocuments,
  addSearchTerm,
  addRecommendation,
};
