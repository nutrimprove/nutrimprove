import { ROLES } from './constants';

const userRoleToString = userRole => {
  return Object.keys(ROLES).find(key => ROLES[key] === userRole);
};

const isAdmin = user => {
  return user
    ? user.role === ROLES.OWNER || user.role === ROLES.ADMIN
    : false;
};

const isOwner = user => {
  return user.role === ROLES.OWNER;
};

const getFromLocalStorage = item => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(item));
  }
};

const getUserStorage = () => getFromLocalStorage('useAuth:user');

const isLoggedIn = () => {
  const user = getUserStorage();
  return user && user.email;
};

const emailVerified = () => {
  const user = getUserStorage();
  return user && user.email_verified;
};

const addToLocalStorage = (item, value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(item, value);
  }
};

const isApproved = () => {
  return getFromLocalStorage('approved');
};

const clearStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('useAuth:user');
    localStorage.removeItem('approved');
    localStorage.removeItem('user_details');
  }
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
  isApproved,
  isValidEmail,
  calcPoints,
  emailVerified,
  addToLocalStorage,
  clearStorage,
};
