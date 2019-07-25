import { ActionsTypes, removeFood, removeRecommendedFood } from './actions'
import uniqid from 'uniqid'

/*
 * FoodItem
 *  # key {string} - starts with either food_ or recommendedFood_ to denote its purpose
 *  # name {string} - food name
 *  # suggestions {string[]} - populates all suggestions there
 */

export const reducer = (
  state = { recommendedFoods: [], foods: [] },
  action
) => {
  switch (action.type) {
    case ActionsTypes.ADD_FOOD:
      return {
        ...state,
        foods: [...state.foods, { key: `food_${uniqid()}`, name: action.foodName, suggestions: [] }],
      }
    case ActionsTypes.ADD_RECOMMENDED_FOOD:
      return {
        ...state,
        recommendedFoods: [
          ...state.recommendedFoods,
          { key: `recommendedFood_${uniqid()}`, name: action.foodName, suggestions: [] },
        ],
      }
    case ActionsTypes.EDIT_FOOD:
      let indexToModify = state.foods.map(f=>f.key).indexOf(action.foodItem.key)
      const foods = [...state.foods]
      foods.splice(indexToModify, 1, action.foodItem)
      return {
        ...state,
        foods,
      }
    case ActionsTypes.EDIT_RECOMMENDED_FOOD:
      indexToModify = state.recommendedFoods.map(f=>f.key).indexOf(action.foodItem.key)
      const recommendedFoods = [...state.recommendedFoods]
      recommendedFoods.splice(indexToModify, 1, action.foodItem)
      return {
        ...state,
        recommendedFoods,
      }
    case ActionsTypes.REMOVE_FOOD:
      return {
        ...state,
        foods: state.foods.filter(f => f.key !== action.foodItem.key),
      }
    case ActionsTypes.REMOVE_RECOMMENDED_FOOD:
      return {
        ...state,
        recommendedFoods: state.recommendedFoods.filter(
          r => r.key !== action.foodItem.key
        ),
      }
    case ActionsTypes.REMOVE_FOOD_OR_RECOMMENDED_FOOD:
      if (action.foodItem.key.startsWith("food_")) {
        return reducer(state, removeFood(action.foodItem))
      } else {
        return reducer(state, removeRecommendedFood(action.foodItem))
      }
    default:
      return state
  }
}
