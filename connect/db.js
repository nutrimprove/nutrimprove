import url from 'url';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import {
  recommendationsSchema,
  searchTermSchema,
  userSchema,
} from './mongoDBSchemas';

const URI = process.env.MONGODB_URI;
let db = null;
const mongoOptions = { useUnifiedTopology: true, useNewUrlParser: true };

const connectToDatabase = async uri => {
  // Return db if already cached
  if (db) {
    return db;
  }

  // Create new MongoDB connection
  const client = await MongoClient.connect(uri, mongoOptions);

  // eslint-disable-next-line node/no-deprecated-api
  db = await client.db(url.parse(uri).pathname.substr(1));
  return db;
};

const connect = (description, schema, collection) => {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(URI, mongoOptions, err => {
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

const getUserConnection = () =>
  connect(
    'users',
    userSchema,
    'users'
  );

const getUser = async user => {
  const UserConnection = await getUserConnection();

  return new Promise((resolve, reject) =>
    UserConnection.findOne({ email: user }, (err, result) => {
      if (err) {
        console.error(`Error when searching for '${user}'`, err);
        mongoose.connection.close();
        reject(err);
      }
      if (!result) {
        const newUser = new UserConnection({
          email: user,
          role: 100,
          approved: false,
        });
        newUser.save(err => {
          if (err) {
            console.error(`Error saving '${user}'`, err);
            reject(err);
          } else {
            console.log('User stored!', user);
            resolve(newUser);
          }
        });
      } else {
        console.log('User fetched!', user);
        resolve(result);
      }
    })
  );
};

const setUserApproval = async (user, approval) => {
  const UserConnection = await getUserConnection();
  return UserConnection.findOneAndUpdate(
    { email: user },
    { approved: approval }
  );
};

const getAllUsers = async () => {
  const UserConnection = await getUserConnection();
  return UserConnection.find({});
};

const getApprovedUsers = async () => {
  const UserConnection = await getUserConnection();
  return UserConnection.find({ approved: true });
};

const getNotApprovedUsers = async () => {
  const UserConnection = await getUserConnection();
  return UserConnection.find({ approved: false });
};

const addRecommendations = async recommendationsObj => {
  const recommendations = recommendationsObj.map(recommendation => ({
    food: {
      id: recommendation.food.id,
      name: recommendation.food.name,
    },
    recommendation: {
      id: recommendation.recommendation.id,
      name: recommendation.recommendation.name,
    },
    contributor_id: recommendation.contributorId,
    timestamp: new Date().getTime(),
  }));

  const AddRecommendationsConnection = await connect(
    'recommendations',
    recommendationsSchema,
    'recommendations'
  );

  return new Promise((resolve, reject) => {
    AddRecommendationsConnection.collection.insertMany(
      recommendations,
      (err, docs) => {
        mongoose.connection.close();
        if (err) {
          console.error('Error inserting recommendations!', err);
          reject(err);
        } else {
          console.log('Recommendations inserted!', docs);
          resolve(docs);
        }
      }
    );
  });
};

export {
  connectToDatabase,
  getDocuments,
  addSearchTerm,
  addRecommendations,
  getUser,
  getAllUsers,
  getApprovedUsers,
  getNotApprovedUsers,
  setUserApproval,
};
