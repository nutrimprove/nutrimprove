import { CATEGORIES } from 'helpers/constants';
import { ActionsTypes } from './actions';

const userWithAddedPoints = (userDetails, points) => {
  if (points > 0 && userDetails && userDetails.points) {
    userDetails.points = userDetails.points + points;
    return userDetails;
  }
};

const updateCurrentList = (lists, currentList) => lists.map(list => list.id !== -1 ? list : currentList);

export const reducer = (state = {
  userDetails: {},
  categories: CATEGORIES,
  foodNames: [],
  preferences: {},
  currentList: undefined,
  lists: undefined,
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
  } else if (action.type === ActionsTypes.SET_CURRENT_LIST) {
    return {
      ...state,
      lists: state.lists ? updateCurrentList(state.lists, action.list) : null,
      currentList: action.list,
    };
  } else if (action.type === ActionsTypes.SET_LISTS) {
    return {
      ...state,
      lists: action.lists,
    };
  } else if (action.type === ActionsTypes.ADD_LIST) {
    return {
      ...state,
      lists: [...state.lists, action.list],
    };
  } else if (action.type === ActionsTypes.DELETE_LIST) {
    return {
      ...state,
      lists: [...state.lists.filter(list => list.id !== action.listId)],
    };
  } else {
    return state;
  }
};
