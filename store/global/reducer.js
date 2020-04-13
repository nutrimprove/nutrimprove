import { ActionsTypes } from './actions';

const userWithAddedPoints = (userDetails, points) => {
  if (points > 0 && userDetails && userDetails.points) {
    userDetails.points = userDetails.points + points;
    return userDetails;
  }
};

export const reducer = (state = { userDetails: {} }, action) => {
  if (action.type === ActionsTypes.SET_USER_DETAILS) {
    return {
      userDetails: action.userDetails,
    };
  } else if (action.type === ActionsTypes.ADD_USER_POINTS) {
    return {
      userDetails: userWithAddedPoints(state.userDetails, action.points),
    };
  } else {
    return state;
  }
};
