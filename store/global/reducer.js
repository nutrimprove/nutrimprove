import { ActionsTypes } from './actions';
import { CATEGORIES } from '../../helpers/constants';

const userWithAddedPoints = (userDetails, points) => {
  if (points > 0 && userDetails && userDetails.points) {
    userDetails.points = userDetails.points + points;
    return userDetails;
  }
};

export const reducer = (state = { userDetails: {}, categories: CATEGORIES }, action) => {
  if (action.type === ActionsTypes.SET_USER_DETAILS) {
    return {
      ...state,
      userDetails: action.userDetails,
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
  } else {
    return state;
  }
};
