import connect from '../connect';
import { remove } from 'lodash';
import { calcPoints } from '../../helpers/userUtils';
import recommendationsSchema from './recommendationsSchema';
import { addUserPoints } from '../users/users';

const getRecommendationsConnection = () =>
  connect('recommendations', recommendationsSchema, 'recommendations');

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

const getRecommendation = async id => {
  const RecommendationsConnection = await getRecommendationsConnection();
  return RecommendationsConnection.findOne({ _id: id });
};

const getRecommendationsQuery = list =>
  list.map(rec => ({
    $and: [
      { 'food.name': rec.food.name },
      { 'recommendation.name': rec.recommendation.name },
    ],
  }));

const applyRecommendationRating = async (recommendationId, rating) => {
  const RecommendationsConnection = await getRecommendationsConnection();
  return RecommendationsConnection.update({ _id: recommendationId },
    { $inc: { rating } },
  );
};

const formatResultRecs = recs =>
  recs.map(rec => ({
    food: rec.food.name,
    recommendation: rec.recommendation.name,
  }));

const addPoints = (user, points) => {
  if (points > 0) {
    return addUserPoints(user, calcPoints({ added: points }));
  }
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
    rating: 10,
  }));

  const AddRecommendationsConnection = await getRecommendationsConnection();

  return AddRecommendationsConnection.find()
    .or(getRecommendationsQuery(recommendations))
    .then(async duplicateDocs => {
      if (duplicateDocs.length === 0) {
        const results = await AddRecommendationsConnection.insertMany(
          recommendations
        );

        await addPoints(contributor, results.length);
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
              $inc: { rating: 10 },
            },
            { multi: true }
          );
        }

        if (updated && updated.nModified !== duplicateDocs.length) {
          throw Error(
            `Number of documents updated: ${updated.nModified}, expected: ${duplicateDocs.length}`
          );
        }

        if (updated && updated.nModified > 0) {
          await addPoints(contributor, updated.nModified);
        }

        return { duplicates, incremented: duplicateDocs };
      }
    });
};

export {
  getRecommendationsConnection,
  getUserRecommendations,
  getRecommendationsByFood,
  getAllRecommendations,
  getRecommendation,
  addRecommendations,
  applyRecommendationRating,
};
