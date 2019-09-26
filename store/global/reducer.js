import { ActionsTypes } from './actions';

export const reducer = (
  state = { isSaving: false, userDetails: {} },
  action
) => {
  if (action.type === ActionsTypes.IS_SAVING) {
    return {
      ...state,
      isSaving: action.isSaving,
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
