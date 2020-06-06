import { ROLES } from './constants';

const userRoleToString = userRole => {
  return Object.keys(ROLES).find(key => ROLES[key] === userRole);
};

const isAdmin = user => {
  return user.role === ROLES.OWNER || user.role === ROLES.ADMIN;
};

const isOwner = user => {
  return user.role === ROLES.OWNER;
};

const isLoggedIn = () => {
  if (typeof window !== 'undefined') {
    const user = JSON.parse(localStorage.getItem('useAuth:user'));
    return user && user.email;
  }
  return false;
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
  isAdmin,
  isOwner,
  isLoggedIn,
  isValidEmail,
  calcPoints,
};
