export const ActionsTypes = {
  SET_USER_DETAILS: 'SET_USER_DETAILS',
};

export const setUserDetails = userDetails => {
  return { type: ActionsTypes.SET_USER_DETAILS, userDetails };
};
