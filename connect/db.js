import url from 'url';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import { recommendationsSchema, searchTermSchema } from './mongoDBSchemas';

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

const connect = (description, schema, collection) => {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(URI, { useNewUrlParser: true }, err => {
      if (err) {
        console.error(`ERROR connecting to '${URI}'`, err);
      } else {
        console.log(`Succeeded connecting to '${URI}'`);
      }
    });
  }

  return mongoose.model(description, schema, collection);
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
  const term = searchTermObj.search_term;
  const SearchTermConnection = await connect(
    'SearchTerm',
    searchTermSchema,
    'search_cache'
  );

  return new Promise((resolve, reject) =>
    SearchTermConnection.findOne({ search_term: term }, (err, result) => {
      if (err) {
        console.error(`Error when searching for '${term}'`, err);
        mongoose.connection.close();
        reject(err);
      }
      if (!result) {
        const newSearchTerm = new SearchTermConnection(searchTermObj);
        newSearchTerm.save(err => {
          mongoose.connection.close();
          if (err) {
            console.error(`Error saving '${term}'`, err);
            reject(err);
          } else {
            console.log('Search term cached!', term);
            resolve(newSearchTerm);
          }
        });
      }
    })
  );
};

const addRecommendation = async recommendationObj => {
  const recommendation = {
    food_id: recommendationObj.foodId,
    recommendation_id: recommendationObj.recommendationId,
    contributor_id: recommendationObj.contributorId,
  };
  const AddRecommendationsConnection = await connect(
    'recommendations',
    recommendationsSchema,
    'recommendations'
  );

  return new Promise((resolve, reject) =>
    AddRecommendationsConnection.findOne(recommendation, (err, result) => {
      if (err) {
        console.error('Error when checking for recommendation!', err);
        mongoose.connection.close();
        reject(err);
      }
      if (result) {
        console.warn('Recommendation already exists!', recommendation);
        mongoose.connection.close();
      } else {
        const newRecommendation = new AddRecommendationsConnection(
          recommendation
        );

        newRecommendation.save(err => {
          mongoose.connection.close();
          if (err) {
            console.error('Error saving recommendation!', err);
            reject(err);
          } else {
            console.log('Recommendation saved!', recommendation);
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
