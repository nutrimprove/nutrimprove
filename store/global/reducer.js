import { CATEGORIES } from '../../helpers/constants';
import { ActionsTypes } from './actions';

const userWithAddedPoints = (userDetails, points) => {
  if (points > 0 && userDetails && userDetails.points) {
    userDetails.points = userDetails.points + points;
    return userDetails;
  }
};

export const reducer = (state = {
  userDetails: {},
  categories: CATEGORIES,
  foodNames: [],
  preferences: {},
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
  } else {
    return state;
  }
};
