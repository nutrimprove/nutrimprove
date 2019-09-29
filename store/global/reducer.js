import { ActionsTypes } from './actions';

export const reducer = (
  state = { loading: false, userDetails: {} },
  action
) => {
  if (action.type === ActionsTypes.LOADING) {
    return {
      ...state,
      loading: action.loading,
    };
  } else if (action.type === ActionsTypes.SET_USER_DETAILS) {
    return {
      ...state,
      userDetails: action.userDetails,
    };
  } else {
    return state;
  }
};
