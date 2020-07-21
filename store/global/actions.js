export const ActionsTypes = {
  SET_USER_DETAILS: 'SET_USER_DETAILS',
  ADD_USER_POINTS: 'ADD_USER_POINTS',
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_USER_PREFERENCES: 'SET_USER_PREFERENCES',
  SET_FOOD_NAMES: 'SET_FOOD_NAMES',
  SET_LISTS: 'SET_LISTS',
  ADD_LIST: 'ADD_LIST',
  DELETE_LIST: 'DELETE_LIST',
  SET_CURRENT_LIST: 'SET_CURRENT_LIST',
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

export const setCurrentListAction = list => {
  return { type: ActionsTypes.SET_CURRENT_LIST, list };
};

export const addListAction = list => {
  return { type: ActionsTypes.ADD_LIST, list };
};

export const deleteListAction = listId => {
  return { type: ActionsTypes.DELETE_LIST, listId };
};

export const setListsAction = lists => {
  return { type: ActionsTypes.SET_LISTS, lists };
};
