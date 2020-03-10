import mongoose from 'mongoose';
import {
  recommendationsSchema,
  searchTermSchema,
  userSchema,
} from './mongoDBSchemas';
import { remove } from 'lodash';

const URI = process.env.MONGODB_URI;
const mongoOptions = { useUnifiedTopology: true, useNewUrlParser: true };

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
  return (
    mongoose.models[description] ||
    mongoose.model(description, schema, collection)
  );
};

const getSearchTermConnection = () =>
  connect(
    'SearchTerm',
    searchTermSchema,
    'search_cache'
  );

const getSearchTerm = async term => {
  const SearchTermConnection = await getSearchTermConnection();
  return SearchTermConnection.findOne({ search_term: term });
};

const addSearchTerm = async searchTermObj => {
  const SearchTerm = await getSearchTermConnection();
  const newSearchTerm = new SearchTerm(searchTermObj);
  return newSearchTerm.save();
};

const getUserConnection = () =>
  connect(
    'users',
    userSchema,
    'users'
  );

const getUser = async user => {
  const UserConnection = await getUserConnection();
  return UserConnection.findOne({ email: user });
};

const saveUser = async userObj => {
  const UserConnection = await getUserConnection();
  const newUser = new UserConnection(userObj);
  return newUser.save();
};

const setUserApproval = async (user, approval) => {
  const UserConnection = await getUserConnection();
  return UserConnection.findOneAndUpdate(
    { email: user },
    { approved: approval }
  );
};

const deleteUser = async user => {
  const UserConnection = await getUserConnection();
  return UserConnection.deleteOne({ email: user });
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

const getRecommendationsConnection = () =>
  connect(
    'recommendations',
    recommendationsSchema,
    'recommendations'
  );

const getUserRecommendations = async user => {
  const RecommendationsConnection = await getRecommendationsConnection();
  return RecommendationsConnection.find({ 'contributors.id': user });
};

const getRecommendationsByFood = async food => {
  const RecommendationsConnection = await getRecommendationsConnection();
  return RecommendationsConnection.find({
    $or: [{ 'food.name': food }, { 'recommendation.name': food }],
  });
};

const getAllRecommendations = async () => {
  const RecommendationsConnection = await getRecommendationsConnection();
  return RecommendationsConnection.find({});
};

const addRecommendations = async recommendationsObj => {
  const contributor = recommendationsObj[0].contributors[0];
  const recommendations = recommendationsObj.map(recommendation => ({
    food: {
      id: recommendation.food.id,
      name: recommendation.food.name,
    },
    recommendation: {
      id: recommendation.recommendation.id,
      name: recommendation.recommendation.name,
    },
    contributors: recommendation.contributors,
    timestamp: new Date().getTime(),
  }));

  const AddRecommendationsConnection = await getRecommendationsConnection();

  const getRecommendationsQuery = list =>
    list.map(rec => ({
      $and: [
        { 'food.name': rec.food.name },
        { 'recommendation.name': rec.recommendation.name },
      ],
    }));

  const formatResultRecs = recs =>
    recs.map(rec => ({
      food: rec.food.name,
      recommendation: rec.recommendation.name,
    }));

  return AddRecommendationsConnection.find()
    .or(getRecommendationsQuery(recommendations))
    .then(async duplicateDocs => {
      if (duplicateDocs.length === 0) {
        const results = await AddRecommendationsConnection.insertMany(
          recommendations
        );
        return { inserted: formatResultRecs(results) };
      } else {
        // Get recommendations already added by current user (removes from duplicateDocs)
        const duplicates = remove(duplicateDocs, recommendation =>
          recommendation.contributors.find(({ id }) => id === contributor)
        );

        let updated;
        // Add current user as contributor to recommendations already present
        if (duplicateDocs.length > 0) {
          updated = await AddRecommendationsConnection.update(
            { $or: getRecommendationsQuery(duplicateDocs) },
            {
              $addToSet: {
                contributors: { id: contributor, added_on: new Date() },
              },
            },
            { multi: true }
          );
        }

        if (updated && updated.nModified !== duplicateDocs.length) {
          throw Error(
            `Number of documents updated: ${updated.nModified}, expected: ${duplicateDocs.length}`
          );
        }
        return { duplicates, incremented: duplicateDocs };
      }
    });
};

export {
  getSearchTerm,
  addSearchTerm,
  getUserRecommendations,
  getRecommendationsByFood,
  getAllRecommendations,
  addRecommendations,
  getUser,
  getAllUsers,
  getApprovedUsers,
  getNotApprovedUsers,
  setUserApproval,
  deleteUser,
  saveUser,
};
