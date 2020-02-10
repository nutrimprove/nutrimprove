import { ActionsTypes } from './actions';

const editFoodItemArray = (foods, foodToChange) => {
  if (!foods || !foodToChange) return;

  const foodIndex = foods.map(food => food.key).indexOf(foodToChange.key);
  const editedFood = {
    key: foods[foodIndex].key,
    id: foodToChange.id,
    name: foodToChange.name,
    suggestions: foodToChange.suggestions,
    isRecommendation: foods[foodIndex].isRecommendation,
  };
  const updatedFoods = [...foods];
  updatedFoods.splice(foodIndex, 1, editedFood);

  return updatedFoods;
};

export const reducer = (
  state = { recommendedFoods: [], foods: [] },
  action
) => {
  if (action.type === ActionsTypes.ADD_FOOD) {
    return {
      ...state,
      foods: [...state.foods, action.food],
    };
  } else if (action.type === ActionsTypes.ADD_RECOMMENDED_FOOD) {
    return {
      ...state,
      recommendedFoods: [...state.recommendedFoods, action.food],
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
      ...state,
      recommendedFoods: [],
      foods: [],
    };
  } else {
    return state;
  }
};
