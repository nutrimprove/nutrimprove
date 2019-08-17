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

export const addFood = food => {
  return { type: ActionsTypes.ADD_FOOD, food };
};

export const addRecommendedFood = food => {
  return { type: ActionsTypes.ADD_RECOMMENDED_FOOD, food };
};

export const editFood = food => {
  return { type: ActionsTypes.EDIT_FOOD, food };
};

export const editRecommendedFood = food => {
  return { type: ActionsTypes.EDIT_RECOMMENDED_FOOD, food };
};

export const editFoodSuggestions = (foodId, suggestions) => {
  return {
    type: ActionsTypes.EDIT_FOOD_SUGGESTIONS,
    foodId,
    suggestions,
  };
};

export const editRecommendedFoodSuggestions = (id, suggestions) => {
  return {
    type: ActionsTypes.EDIT_RECOMMENDED_FOOD_SUGGESTIONS,
    id,
    suggestions,
  };
};

export const removeFood = food => {
  return { type: ActionsTypes.REMOVE_FOOD, food };
};

export const removeRecommendedFood = food => {
  return { type: ActionsTypes.REMOVE_RECOMMENDED_FOOD, food };
};

const editFoodName = (dispatch, food, newName) => {
  dispatch(editFood({ ...food, name: newName }));
};

const editRecommendedFoodName = (dispatch, food, newName) => {
  dispatch(editRecommendedFood({ ...food, name: newName }));
};

const setFoodSuggestions = (dispatch, id, suggestions) => {
  dispatch(editFoodSuggestions(id, suggestions));
};

const setRecommendedFoodSuggestions = (dispatch, id, suggestions) => {
  dispatch(editRecommendedFoodSuggestions(id, suggestions));
};

export const changeFoodName = (food, newName) => {
  if (newName == null) return;

  return async (dispatch, getState) => {
    editFoodName(dispatch, food, newName);
    if (newName.length > 2) {
      const search = await getSearchedTerms(newName);
      if (search && search.matches) {
        const suggestions = search.matches.map(match => match.food_name);
        if (suggestions) {
          setFoodSuggestions(dispatch, food.id, suggestions);
        }
      }
    } else {
      setFoodSuggestions(dispatch, food.id, []);
    }
  };
};

export const changeRecommendedFoodName = (food, newName) => {
  if (newName == null) return;

  return async (dispatch, getState) => {
    editRecommendedFoodName(dispatch, food, newName);
    if (newName.length > 2) {
      const search = await getSearchedTerms(newName);
      if (search && search.matches) {
        const suggestions = search.matches.map(match => match.food_name);
        if (suggestions) {
          setRecommendedFoodSuggestions(dispatch, food.id, suggestions);
        }
      }
    } else {
      setRecommendedFoodSuggestions(dispatch, food.id, []);
    }
  };
};
