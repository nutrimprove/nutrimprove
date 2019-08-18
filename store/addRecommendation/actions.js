import { getSearchedTerms } from '../../connect/api';

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

export const editFood = (food, foodName) => {
  if (foodName == null) return;

  return async (dispatch, getState) => {
    dispatch(editFoodAction({ ...food, name: foodName }));
    if (foodName.length > 2) {
      const search = await getSearchedTerms(foodName);
      if (search && search.matches) {
        const suggestions = search.matches.map(match => ({
          food_name: match.food_name,
          food_id: match.food_id,
        }));

        const selectedSuggestion = suggestions.find(
          suggestion => suggestion.food_name === foodName
        );
        if (selectedSuggestion && selectedSuggestion.food_id !== food.id) {
          dispatch(
            editFoodAction({
              ...food,
              name: foodName,
              id: selectedSuggestion.food_id,
              suggestions,
            })
          );
        } else if (suggestions.length) {
          dispatch(
            editFoodAction({ ...food, name: foodName, suggestions })
          );
        }
      }
    }
  };
};

export const editRecommendedFood = (food, foodName) => {
  if (foodName == null) return;

  return async (dispatch, getState) => {
    dispatch(editRecommendedFoodAction({ ...food, name: foodName }));
    if (foodName.length > 2) {
      const search = await getSearchedTerms(foodName);
      if (search && search.matches) {
        const suggestions = search.matches.map(match => ({
          food_name: match.food_name,
          food_id: match.food_id,
        }));

        const selectedSuggestion = suggestions.find(
          suggestion => suggestion.food_name === foodName
        );
        if (selectedSuggestion && selectedSuggestion.food_id !== food.id) {
          dispatch(
            editRecommendedFoodAction({
              ...food,
              name: foodName,
              id: selectedSuggestion.food_id,
              suggestions,
            })
          );
        } else if (suggestions.length) {
          dispatch(
            editRecommendedFoodAction({
              ...food,
              name: foodName,
              suggestions,
            })
          );
        }
      }
    }
  };
};
