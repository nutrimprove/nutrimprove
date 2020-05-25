import { getUser } from 'interfaces/api/users';
import { ROLES } from './constants';

const userRoleToString = userRole => {
  return Object.keys(ROLES).find(key => ROLES[key] === userRole);
};

const setUserState = async ({ setUserDetails, setUserPreferences, userInfo }) => {
  if (userInfo && userInfo.email) {
    const user = await getUser(userInfo.email);
    if (user) {
      const { role, approved, points, preferences } = user;
      setUserDetails({ ...userInfo, role, approved, points });
      setUserPreferences(preferences);
    } else {
      console.error('User not found!', userInfo.email);
    }
  } else {
    console.error('UserInfo object not valid!', userInfo);
  }
};

const isAdmin = user => {
  return user.role === ROLES.OWNER || user.role === ROLES.ADMIN;
};

const isOwner = user => {
  return user.role === ROLES.OWNER;
};

const isValidEmail = email => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).toLowerCase());
};

const calcPoints = ({ added = 0, incremented = 0 }) => {
  const pointsForAdded = 10;
  const pointsForIncremented = 10;
  return added * pointsForAdded + incremented * pointsForIncremented;
};

export {
  userRoleToString,
  setUserState,
  isAdmin,
  isOwner,
  isValidEmail,
  calcPoints,
};
