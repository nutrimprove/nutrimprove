export const ActionsTypes = {
  SET_USER_DETAILS: 'SET_USER_DETAILS',
  ADD_USER_POINTS: 'ADD_USER_POINTS',
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_USER_PREFERENCES: 'SET_USER_PREFERENCES',
  SET_FOOD_NAMES: 'SET_FOOD_NAMES',
};

export const setUserDetailsAction = userDetails => {
  return { type: ActionsTypes.SET_USER_DETAILS, userDetails };
};

export const setUserPreferencesAction = preferences => {
  return { type: ActionsTypes.SET_USER_PREFERENCES, preferences };
};

export const addUserPointsAction = points => {
  return { type: ActionsTypes.ADD_USER_POINTS, points };
};

export const setCategoriesAction = categories => {
  return { type: ActionsTypes.SET_CATEGORIES, categories };
};

export const setFoodNamesAction = foodNames => {
  return { type: ActionsTypes.SET_FOOD_NAMES, foodNames };
};
