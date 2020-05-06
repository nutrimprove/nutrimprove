import { ActionsTypes } from './actions';
import { CATEGORIES } from '../../helpers/constants';

const userWithAddedPoints = (userDetails, points) => {
  if (points > 0 && userDetails && userDetails.points) {
    userDetails.points = userDetails.points + points;
    return userDetails;
  }
};

const userWithNewPreferences = (userDetails, preferences) => {
  if (preferences && userDetails) {
    userDetails.preferences = preferences;
    return userDetails;
  }
};

export const reducer = (state = {
  userDetails: {},
  categories: CATEGORIES,
  foodNames: [],
}, action) => {
  if (action.type === ActionsTypes.SET_USER_DETAILS) {
    return {
      ...state,
      userDetails: action.userDetails,
    };
  } else if (action.type === ActionsTypes.SET_USER_PREFERENCES) {
    return {
      ...state,
      userDetails: userWithNewPreferences(state.userDetails, action.preferences),
    };
  }
    else if (action.type === ActionsTypes.ADD_USER_POINTS) {
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
  } else {
    return state;
  }
};
