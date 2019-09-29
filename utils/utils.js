import { getUser } from '../connect/api';

export const setUserDetailsWithRole = async (setUserDetails, userInfo) => {
  if (userInfo) {
    const user = await getUser(userInfo.email);
    if (user) {
      const role = user && user[0] ? user[0].role : '';
      if (role) {
        setUserDetails({ ...userInfo, role });
      } else {
        setUserDetails(userInfo);
      }
    } else {
      console.warn('User not found', userInfo.email);
    }
  } else {
    console.warn('No userInfo!!');
  }
};
