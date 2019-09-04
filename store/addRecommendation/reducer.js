import { ActionsTypes } from './actions';

/*
 * FoodItem
 *  # key {string} - starts with either food_ or recommendedFood_ to denote its purpose
 *  # name {string} - food name
 *  # suggestions {string[]} - populates all suggestions there
 */

const editFoodItemArray = (foods, foodToChange) => {
  const indexToModify = foods
    .map(food => food.key)
    .indexOf(foodToChange.key);
  const updatedFoods = [...foods];
  updatedFoods.splice(indexToModify, 1, foodToChange);

  return updatedFoods;
};

export const reducer = (
  state = { recommendedFoods: [], foods: [] },
  action
) => {
  if (action.type === ActionsTypes.ADD_FOOD) {
    return {
      ...state,
      foods: [
        ...state.foods,
        {
          key: action.food.key,
          id: action.food.id,
          name: action.food.name,
          suggestions: action.food.suggestions,
          isRecommendation: false,
        },
      ],
    };
  } else if (action.type === ActionsTypes.ADD_RECOMMENDED_FOOD) {
    return {
      ...state,
      recommendedFoods: [
        ...state.recommendedFoods,
        {
          key: action.food.key,
          id: action.food.id,
          name: action.food.name,
          suggestions: action.food.suggestions,
          isRecommendation: true,
        },
      ],
    };
  } else if (action.type === ActionsTypes.EDIT_FOOD) {
    const foods = editFoodItemArray(state.foods, action.food);
    return {
      ...state,
      foods,
    };
  } else if (action.type === ActionsTypes.EDIT_RECOMMENDED_FOOD) {
    const recommendedFoods = editFoodItemArray(
      state.recommendedFoods,
      action.food
    );
    return {
      ...state,
      recommendedFoods,
    };
  } else if (action.type === ActionsTypes.REMOVE_FOOD) {
    return {
      ...state,
      foods: state.foods.filter(food => food.key !== action.food.key),
    };
  } else if (action.type === ActionsTypes.REMOVE_RECOMMENDED_FOOD) {
    return {
      ...state,
      recommendedFoods: state.recommendedFoods.filter(
        food => food.key !== action.food.key
      ),
    };
  } else if (
    action.type === ActionsTypes.REMOVE_ALL_FOODS_AND_RECOMMENDATIONS
  ) {
    return {
      recommendedFoods: [],
      foods: [],
    };
  } else {
    return state;
  }
};
