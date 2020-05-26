import { postRecommendations } from 'interfaces/api/recommendations';
import { getStore } from 'store';
import { addUserPointsAction } from 'store/global/actions';
import { calcPoints } from './userUtils';

const dispatch = (action) => getStore().dispatch(action);

const addRecommendations = async ({ foods, recommendations, onSuccess, onFailure }) => {
  const store = getStore();
  const { userDetails } = store.getState().globalState;
  const recommendationsPayload = [];

  // Every recommendation will be added to every single food (n->n)
  for (const food of foods) {
    for (const recommendation of recommendations) {
      recommendationsPayload.push({
        food: { id: food.foodCode, name: food.foodName },
        recommendation: { id: recommendation.foodCode, name: recommendation.foodName },
        contributors: [{ id: userDetails.email }],
      });
    }
  }

  const result = await postRecommendations(recommendationsPayload);
  if (!result) return;

  const recCount = recommendationsPayload.length;
  const insertedCount = result.inserted ? result.inserted.length : 0;
  const incrementedCount = result.incremented ? result.incremented.length : 0;
  const duplicatesCount = result.duplicates ? result.duplicates.length : 0;
  let status;

  if (insertedCount + incrementedCount === recCount) {
    const addedPoints = calcPoints({ added: insertedCount, incremented: incrementedCount });
    dispatch(addUserPointsAction(addedPoints));

    const recommendationString = insertedCount === 1 ? 'recommendation' : 'recommendations';
    status = `${insertedCount} new ${recommendationString} added to the database!`;

    if (result.incremented) {
      status = status + ` Added your contribution to ${incrementedCount} already present.`;
    }
    status += ` +${addedPoints} points`;
    onSuccess(status);
  } else {
    if (duplicatesCount > 0) {
      if (result.duplicates.length === 1) {
        status = [
          'Recommendation already submitted by you!',
          'Please choose another combination before submitting again',
        ];
      } else {
        const duplicatesList = result.duplicates.map(dup => `${dup.food.name} -> ${dup.recommendation.name}`);
        status = [
          'Some recommendations have already been submitted by you!',
          'Please remove these before submitting again:',
          ...duplicatesList,
        ];
      }
    } else {
      status = [
        'Something went wrong when saving record(s) to database.',
        'Please refresh and try again. If it persists please contact us!',
      ];
    }
    onFailure(status);
  }
};

export default addRecommendations;
