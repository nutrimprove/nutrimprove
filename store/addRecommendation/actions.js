import { getSearchedTerms } from '../../connect/api'

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
}

export const addFood = (foodName) => {
  return { type: ActionsTypes.ADD_FOOD, foodName }
}

export const addRecommendedFood = (foodName) => {
  return { type: ActionsTypes.ADD_RECOMMENDED_FOOD, foodName }
}

export const editFood = (foodItem) => {
  return { type: ActionsTypes.EDIT_FOOD, foodItem }
}

export const editRecommendedFood = (foodItem) => {
  return { type: ActionsTypes.EDIT_RECOMMENDED_FOOD, foodItem }
}

export const editFoodSuggestions = (foodItemKey, suggestions) => {
  return { type: ActionsTypes.EDIT_FOOD_SUGGESTIONS, foodItemKey, suggestions }
}

export const editRecommendedFoodSuggestions = (foodItemKey, suggestions) => {
  return { type: ActionsTypes.EDIT_RECOMMENDED_FOOD_SUGGESTIONS, foodItemKey, suggestions }
}

export const removeFood = (foodItem) => {
  return { type: ActionsTypes.REMOVE_FOOD, foodItem }
}

export const removeRecommendedFood = (foodItem) => {
  return { type: ActionsTypes.REMOVE_RECOMMENDED_FOOD, foodItem }
}

export const removeFoodOrRecommendedFood = (foodItem) => {
  return { type: ActionsTypes.REMOVE_FOOD_OR_RECOMMENDED_FOOD, foodItem }
}

const editFoodItemNameOnly = (dispatch, foodItem, newName) => {
  if (foodItem.key.startsWith("food_")) {
    dispatch(editFood({...foodItem, name: newName}))
  } else {
    dispatch(editRecommendedFood({...foodItem, name: newName}))
  }
}
const setFoodItemSuggestions = (dispatch, foodItemKey, suggestions) => {
  if (foodItemKey.startsWith("food_")) {
    dispatch(editFoodSuggestions(foodItemKey, suggestions))
  } else {
    dispatch(editRecommendedFoodSuggestions(foodItemKey, suggestions))
  }
}

export const editFoodItemName = (foodItem, newName) => {
  if (newName == null) return;

  return async (dispatch, getState) => {
    editFoodItemNameOnly(dispatch, foodItem, newName)
    if (newName.length > 2) {
      const search = await getSearchedTerms(newName);
      const suggestions = search.matches.map(
        match => match.food_name
      );
      if (suggestions) {
        setFoodItemSuggestions(dispatch, foodItem.key, suggestions);
      }
    } else {
      setFoodItemSuggestions(dispatch, foodItem.key, []);
    }
  }
}
