import mongoose from 'mongoose';
import {
  recommendationsSchema,
  searchTermSchema,
  userSchema,
} from './mongoDBSchemas';
import { remove } from 'lodash';
import { calcPoints } from '../helpers/userUtils';

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

const updateUserPoints = async user => {
  const RecommendationsConnection = await getRecommendationsConnection();
  const userRecommendations = await RecommendationsConnection.find({
    'contributors.id': user,
  });

  let addedCount = 0;
  let incrementedCount = 0;
  userRecommendations.forEach(recommendation => {
    if (recommendation.id[0] === user) {
      addedCount++;
    } else {
      incrementedCount++;
    }
  });

  const UserConnection = await getUserConnection();
  return UserConnection.findOneAndUpdate(
    { email: user },
    {
      points: calcPoints({
        added: addedCount,
        incremented: incrementedCount,
      }),
    }
  );
};

const addRecommendations = async recommendationsObj => {
  const contributor = recommendationsObj[0].contributors[0].id;
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

  const recommendationsResult = AddRecommendationsConnection.find()
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
  await updateUserPoints(contributor);
  return recommendationsResult;
};

const updateDB = async (run = false) => {
  if (!run)
    return {
      message:
        'For security reasons please set the "run" flag to true before running the DB update script!',
    };
  const AddRecommendationsConnection = await getRecommendationsConnection();
  const result = await AddRecommendationsConnection.find({
    contributor_id: { $exists: true },
  }).then(docs => {
    docs.forEach(item => {
      item.set('contributors', [{ id: item.get('contributor_id') }], {
        strict: false,
      });
      item.set('contributor_id', undefined, { strict: false });
      item.set('relevance', undefined, { strict: false });
      item.save();
    });
    return docs;
  });
  console.log('Database updated!', result);
  return result;
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
  updateDB,
};
