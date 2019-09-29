import { addUser, getUser } from '../connect/api';

export const setUserDetailsWithRole = async (setUserDetails, userInfo) => {
  if (userInfo) {
    const user = await getUser(userInfo.email);
    if (user && user[0]) {
      const { role, approved } = user[0];
      setUserDetails({ ...userInfo, role, approved });
    } else {
      const userDetails = {
        email: userInfo.email,
        role: 'contributor',
        approved: false,
      };
      await addUser(userDetails);
      setUserDetails({ ...userInfo, userDetails });
    }
  } else {
    console.warn('No userInfo!!');
  }
};
