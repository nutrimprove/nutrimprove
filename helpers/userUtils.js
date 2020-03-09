import { ROLES } from './constants';
import { getUser } from '../connect/api';

export const userRoleToString = userRole => {
  return Object.keys(ROLES).find(key => ROLES[key] === userRole);
};

export const setUserDetailsWithRole = async (setUserDetails, userInfo) => {
  if (userInfo && userInfo.email) {
    const user = await getUser(userInfo.email);
    if (user) {
      const { role, approved, points } = user;
      setUserDetails({ ...userInfo, role, approved, points });
    } else {
      console.error('User not found!', userInfo.email);
    }
  } else {
    console.error('UserInfo object not valid!', userInfo);
  }
};

export const isAdmin = user => {
  return user.role === ROLES.OWNER || user.role === ROLES.ADMIN;
};

export const isValidEmail = email => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).toLowerCase());
};
