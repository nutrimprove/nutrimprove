import { getSearchedTerms } from '../../connect/api';
import { trackPromise } from 'react-promise-tracker';

let timeout = null;

export const ActionsTypes = {
  ADD_FOOD: 'ADD_FOOD',
  ADD_RECOMMENDED_FOOD: 'ADD_RECOMMENDED_FOOD',
  EDIT_FOOD: 'EDIT_FOOD',
  EDIT_RECOMMENDED_FOOD: 'EDIT_RECOMMENDED_FOOD',
  EDIT_FOOD_SUGGESTIONS: 'EDIT_FOOD_SUGGESTIONS',
  EDIT_RECOMMENDED_FOOD_SUGGESTIONS: 'EDIT_RECOMMENDED_FOOD_SUGGESTIONS',
  REMOVE_FOOD: 'REMOVE_FOOD',
  REMOVE_RECOMMENDED_FOOD: 'REMOVE_RECOMMENDED_FOOD',
  REMOVE_FOOD_OR_RECOMMENDED_FOOD: 'REMOVE_FOOD_OR_RECOMMENDED_FOOD',
  REMOVE_ALL_FOODS_AND_RECOMMENDATIONS:
    'REMOVE_ALL_FOODS_AND_RECOMMENDATIONS',
};

export const addFoodAction = food => {
  return { type: ActionsTypes.ADD_FOOD, food };
};

export const addRecommendedFoodAction = food => {
  return { type: ActionsTypes.ADD_RECOMMENDED_FOOD, food };
};

export const editFoodAction = food => {
  return { type: ActionsTypes.EDIT_FOOD, food };
};

export const editRecommendedFoodAction = food => {
  return { type: ActionsTypes.EDIT_RECOMMENDED_FOOD, food };
};

export const removeFoodAction = food => {
  return { type: ActionsTypes.REMOVE_FOOD, food };
};

export const removeRecommendedFoodAction = food => {
  return { type: ActionsTypes.REMOVE_RECOMMENDED_FOOD, food };
};

export const removeAllFoodsAndRecommendationsAction = () => {
  return { type: ActionsTypes.REMOVE_ALL_FOODS_AND_RECOMMENDATIONS };
};

export const editFood = (food, foodName, isRecommendation) => {
  if (foodName == null) return;

  return async (dispatch, getState) => {
    const action = isRecommendation
      ? editRecommendedFoodAction
      : editFoodAction;

    const type = isRecommendation ? 'rec' : 'food';

    dispatch(action({ ...food, id: '', name: foodName, suggestions: [] }));

    clearTimeout(timeout);
    // Timeout to control fetching of data while typing
    timeout = setTimeout(async () => {
      // Fetches search results if more than 2 characters are typed
      if (foodName.length > 2) {
        const search = await trackPromise(
          getSearchedTerms(foodName, isRecommendation),
          `getSearchTerms-${type}`
        );
        if (search && search.matches) {
          const suggestions = search.matches.map(match => ({
            food_name: match.food_name,
            food_id: match.food_id,
          }));

          const selectedSuggestion = suggestions.find(
            suggestion => suggestion.food_name === foodName
          );
          if (
            selectedSuggestion &&
            selectedSuggestion.food_id !== food.id
          ) {
            dispatch(
              action({
                ...food,
                name: foodName,
                id: selectedSuggestion.food_id,
                suggestions,
              })
            );
          } else if (suggestions.length > 0) {
            dispatch(action({ ...food, name: foodName, suggestions }));
          }
        }
      }
    }, 500);
  };
};
