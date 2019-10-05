import { getUsers } from '../connect/api';
import { ROLES } from './constants';

export const userRoleToString = userRole => {
  return Object.keys(ROLES).find(key => ROLES[key] === userRole);
};

export const setUserDetailsWithRole = async (setUserDetails, userInfo) => {
  if (userInfo && userInfo.email) {
    const user = await getUsers(userInfo.email);
    if (user) {
      const { role, approved } = user;
      const isAdmin = role === ROLES.OWNER || role === ROLES.ADMIN;
      setUserDetails({ ...userInfo, role, approved, isAdmin });
    } else {
      console.error('User not found!', userInfo.email);
    }
  } else {
    console.error('UserInfo object not valid!', userInfo);
  }
};

export const getTime = () => {
  const today = new Date();
  const hours = today.getHours();
  let minutes = today.getMinutes();
  minutes = minutes <= 9 ? '0' + minutes : minutes;
  let seconds = today.getSeconds();
  seconds = seconds <= 9 ? '0' + seconds : seconds;

  return `${hours}:${minutes}:${seconds}`;
};
