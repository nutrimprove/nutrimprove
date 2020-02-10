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
