import { ActionsTypes } from './actions';

/*
 * FoodItem
 *  # key {string} - starts with either food_ or recommendedFood_ to denote its purpose
 *  # name {string} - food name
 *  # suggestions {string[]} - populates all suggestions there
 */

const editFoodItemArray = (foods, foodToChange) => {
  const indexToModify = foods
    .map(food => food.id)
    .indexOf(foodToChange.id);
  const updateFoods = [...foods];
  updateFoods.splice(indexToModify, 1, foodToChange);
  return updateFoods;
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
          id: action.food.id,
          name: action.food.name,
          suggestions: [],
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
          id: action.food.id,
          name: action.food.name,
          suggestions: [],
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
  } else if (action.type === ActionsTypes.EDIT_FOOD_SUGGESTIONS) {
    const foodToChange = state.foods.find(food => food.id === action.id);
    const foods = editFoodItemArray(state.foods, {
      ...foodToChange,
      suggestions: action.suggestions,
    });
    return {
      ...state,
      foods,
    };
  } else if (
    action.type === ActionsTypes.EDIT_RECOMMENDED_FOOD_SUGGESTIONS
  ) {
    const foodToChange = state.recommendedFoods.find(
      food => food.id === action.id
    );
    const recommendedFoods = editFoodItemArray(state.recommendedFoods, {
      ...foodToChange,
      suggestions: action.suggestions,
    });
    return {
      ...state,
      recommendedFoods,
    };
  } else if (action.type === ActionsTypes.REMOVE_FOOD) {
    return {
      ...state,
      foods: state.foods.filter(food => food.id !== action.food.id),
    };
  } else if (action.type === ActionsTypes.REMOVE_RECOMMENDED_FOOD) {
    return {
      ...state,
      recommendedFoods: state.recommendedFoods.filter(
        food => food.id !== action.food.id
      ),
    };
  } else {
    return state;
  }
};
