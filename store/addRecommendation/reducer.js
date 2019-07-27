import { ActionsTypes, removeFood, removeRecommendedFood } from './actions'
import uniqid from 'uniqid'

/*
 * FoodItem
 *  # key {string} - starts with either food_ or recommendedFood_ to denote its purpose
 *  # name {string} - food name
 *  # suggestions {string[]} - populates all suggestions there
 */

const editFoodItemArray = (foodItems, foodItemToChange) => {
  const indexToModify = foodItems.map(f=>f.key).indexOf(foodItemToChange.key)
  const updateFoodItems = [...foodItems]
  updateFoodItems.splice(indexToModify, 1, foodItemToChange)
  return updateFoodItems
}

export const reducer = (
  state = { recommendedFoods: [], foods: [] },
  action
) => {
  if (action.type === ActionsTypes.ADD_FOOD) {
    return {
      ...state,
      foods: [...state.foods, { key: `food_${uniqid()}`, name: action.foodName, suggestions: [] }],
    }
  } else if (action.type === ActionsTypes.ADD_RECOMMENDED_FOOD) {
    return {
      ...state,
      recommendedFoods: [
        ...state.recommendedFoods,
        { key: `recommendedFood_${uniqid()}`, name: action.foodName, suggestions: [] },
      ],
    }
  } else if (action.type === ActionsTypes.EDIT_FOOD) {
    const foods = editFoodItemArray(state.foods, action.foodItem)
    return {
      ...state,
      foods,
    }
  } else if (action.type === ActionsTypes.EDIT_RECOMMENDED_FOOD) {
    const recommendedFoods = editFoodItemArray(state.recommendedFoods, action.foodItem)
    return {
      ...state,
      recommendedFoods,
    }
  } else if (action.type === ActionsTypes.EDIT_FOOD_SUGGESTIONS) {
    const foodToChange = state.foods.find(i=> i.key === action.foodItemKey)
    const foods = editFoodItemArray(state.foods, { ...foodToChange, suggestions: action.suggestions })
    return {
      ...state,
      foods,
    }
  } else if (action.type === ActionsTypes.EDIT_RECOMMENDED_FOOD_SUGGESTIONS) {
    const foodToChange = state.recommendedFoods.find(i=> i.key === action.foodItemKey)
    const recommendedFoods = editFoodItemArray(state.recommendedFoods, { ...foodToChange, suggestions: action.suggestions })
    return {
      ...state,
      recommendedFoods,
    }
  } else if (action.type === ActionsTypes.REMOVE_FOOD) {
    return {
      ...state,
      foods: state.foods.filter(f => f.key !== action.foodItem.key),
    }
  } else if (action.type === ActionsTypes.REMOVE_RECOMMENDED_FOOD) {
    return {
      ...state,
      recommendedFoods: state.recommendedFoods.filter(
        r => r.key !== action.foodItem.key
      ),
    }
  } else if (action.type === ActionsTypes.REMOVE_FOOD_OR_RECOMMENDED_FOOD) {
    if (action.foodItem.key.startsWith('food_')) {
      return reducer(state, removeFood(action.foodItem))
    } else {
      return reducer(state, removeRecommendedFood(action.foodItem))
    }
  } else {return state}
}
