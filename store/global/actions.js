export const ActionsTypes = {
  LOADING: 'LOADING',
  SET_USER_DETAILS: 'SET_USER_DETAILS',
};

export const setLoadingAction = loading => {
  return { type: ActionsTypes.LOADING, loading };
};

export const setUserDetails = userDetails => {
  return { type: ActionsTypes.SET_USER_DETAILS, userDetails };
};
