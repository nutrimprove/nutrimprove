import mongoose from 'mongoose';
import {
  recommendationsSchema,
  searchTermSchema,
  userSchema,
} from './mongoDBSchemas';

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
  return newSearchTerm;
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

const getRecommendations = async user => {
  const RecommendationsConnection = await getRecommendationsConnection();
  return RecommendationsConnection.find({ contributor_id: user });
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

  const AddRecommendationsConnection = await getRecommendationsConnection();

  const allRecsQuery = recommendations.map(rec => ({
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
    .or(allRecsQuery)
    .then(async duplicateDocs => {
      if (duplicateDocs.length === 0) {
        const results = await AddRecommendationsConnection.insertMany(
          recommendations
        );
        return formatResultRecs(results);
      } else {
        const duplicates = formatResultRecs(duplicateDocs);
        console.warn('Found duplicate recommendations!', duplicates);
        return { duplicates };
      }
    });
};

export {
  getSearchTerm,
  addSearchTerm,
  getRecommendations,
  addRecommendations,
  getUser,
  getAllUsers,
  getApprovedUsers,
  getNotApprovedUsers,
  setUserApproval,
  deleteUser,
  saveUser,
};
