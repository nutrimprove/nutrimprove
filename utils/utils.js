import { addUser, getUser } from '../connect/api';

export const setUserDetailsWithRole = async (setUserDetails, userInfo) => {
  if (userInfo) {
    const user = await getUser(userInfo.email);
    if (user && user[0]) {
      const { role, approved } = user[0];
      setUserDetails({ ...userInfo, role, approved });
    } else {
      await addUser({
        user: userInfo.email,
        role: 'contributor',
        approved: false,
      });
    }
  } else {
    console.warn('No userInfo!!');
  }
};
