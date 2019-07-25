import { getSearchedTerms } from '../../connect/api'

export const ActionsTypes = {
  ADD_FOOD: 'ADD_FOOD',
  ADD_RECOMMENDED_FOOD: 'ADD_RECOMMENDED_FOOD',
  EDIT_FOOD: 'EDIT_FOOD',
  EDIT_RECOMMENDED_FOOD: 'EDIT_RECOMMENDED_FOOD',
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

export const removeFood = (foodItem) => {
  return { type: ActionsTypes.REMOVE_FOOD, foodItem }
}

export const removeRecommendedFood = (foodItem) => {
  return { type: ActionsTypes.REMOVE_RECOMMENDED_FOOD, foodItem }
}

export const removeFoodOrRecommendedFood = (foodItem) => {
  return { type: ActionsTypes.REMOVE_FOOD_OR_RECOMMENDED_FOOD, foodItem }
}

const editFoodItem = (dispatch, foodItem, newName, suggestions) => {
  if (foodItem.key.startsWith("food_")) {
    dispatch(editFood({...foodItem, name: newName, suggestions}))
  } else {
    dispatch(editRecommendedFood({...foodItem, name: newName, suggestions}))
  }
}

export const editFoodItemsName = (foodItem, newName) => {
  // return (dispatch) => editFoodItem(dispatch, foodItem, newName, []);

  return async (dispatch, getState) => {
    return new Promise(async (resolve) => {
      if (newName.length > 2) {
        editFoodItem(dispatch, foodItem, newName, ["ASD","ZXC","qwe","rtyt"]);
        // FIXME: for some reason getSearchTerms fails
        // const search = await getSearchedTerms(newName);
        // const suggestions = search.matches.map(
        //   match => match.food_name
        // );
        // if (suggestions) {
          // editFoodItem(dispatch, foodItem, newName, suggestions);
        // }
      } else {
        editFoodItem(dispatch, foodItem, newName, []);
      }
      resolve()
    })
  }
}
