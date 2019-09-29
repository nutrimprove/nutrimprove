import { ActionsTypes } from './actions';

export const reducer = (state = { userDetails: {} }, action) => {
  if (action.type === ActionsTypes.SET_USER_DETAILS) {
    return {
      ...state,
      userDetails: action.userDetails,
    };
  } else {
    return state;
  }
};
