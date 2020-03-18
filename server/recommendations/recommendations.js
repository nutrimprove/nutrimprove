import connect from '../connect';
import { remove } from 'lodash';
import { calcPoints } from '../../helpers/userUtils';
import recommendationsSchema from './recommendationsSchema';
import { getUserConnection } from '../users/users';

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

export {
  getUserRecommendations,
  getRecommendationsByFood,
  getAllRecommendations,
  addRecommendations,
};
