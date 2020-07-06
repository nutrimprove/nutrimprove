import { CATEGORIES } from 'helpers/constants';
import { ActionsTypes } from './actions';

const userWithAddedPoints = (userDetails, points) => {
  if (points > 0 && userDetails && userDetails.points) {
    userDetails.points = userDetails.points + points;
    return userDetails;
  }
};

const getNewList = (name, foods) => ({ foods, name, id: -1 });

const saveNewFoodsList = (lists = [], name, foods) => {
  let found = false;
  const newList = getNewList(name, foods);
  const listsToSave = lists.map(list => {
    if (list.id !== -1) {
      return list;
    } else {
      found = true;
      return newList;
    }
  });

  if (!found) {
    listsToSave.push(newList);
  }
  return listsToSave;
};

const addNewFoodsList = (lists = [], name, foods) => {
  const newList = getNewList(name, foods);
  const listsToSave = lists.map(list => list.id !== -1 ? list : { ...list, id: list.length });
  listsToSave.push(newList);
  return listsToSave;
};

export const reducer = (state = {
  userDetails: {},
  categories: CATEGORIES,
  foodNames: [],
  preferences: {},
  lists: [],
}, action) => {
  if (action.type === ActionsTypes.SET_USER_DETAILS) {
    return {
      ...state,
      userDetails: action.userDetails,
    };
  } else if (action.type === ActionsTypes.SET_USER_PREFERENCES) {
    return {
      ...state,
      preferences: action.preferences,
    };
  } else if (action.type === ActionsTypes.ADD_USER_POINTS) {
    return {
      ...state,
      userDetails: userWithAddedPoints(state.userDetails, action.points),
    };
  } else if (action.type === ActionsTypes.SET_CATEGORIES) {
    return {
      ...state,
      categories: action.categories,
    };
  } else if (action.type === ActionsTypes.SET_FOOD_NAMES) {
    return {
      ...state,
      foodNames: action.foodNames,
    };
  } else if (action.type === ActionsTypes.SET_FOOD_LISTS) {
    return {
      ...state,
      lists: action.foodLists,
    };
  } else if (action.type === ActionsTypes.SAVE_NEW_FOODS_LIST) {
    return {
      ...state,
      lists: saveNewFoodsList(state.lists, action.name, action.foods),
    };
  } else if (action.type === ActionsTypes.ADD_NEW_FOODS_LIST) {
    return {
      ...state,
      lists: addNewFoodsList(state.lists, action.name, action.foods),
    };
  } else {
    return state;
  }
};
