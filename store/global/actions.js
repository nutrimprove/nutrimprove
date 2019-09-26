export const ActionsTypes = {
  IS_SAVING: 'IS_SAVING',
  SET_USER_DETAILS: 'SET_USER_DETAILS',
};

export const setSavingAction = isSaving => {
  return { type: ActionsTypes.IS_SAVING, isSaving };
};

export const setUserDetails = userDetails => {
  return { type: ActionsTypes.SET_USER_DETAILS, userDetails };
};
