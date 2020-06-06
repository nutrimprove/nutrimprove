import { ROLES } from './constants';

const registeredStorage = [];

const userRoleToString = userRole => {
  return Object.keys(ROLES).find(key => ROLES[key] === userRole);
};

const isAdmin = user => {
  return user.role === ROLES.OWNER || user.role === ROLES.ADMIN;
};

const isOwner = user => {
  return user.role === ROLES.OWNER;
};

// Registers items in storage for better tracking and disposal
const registerStorage = (item) => {
  registeredStorage.push(item);
};

const getUserStorage = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('useAuth:user'));
  }
};

const isLoggedIn = () => {
  const user = getUserStorage();
  return user && user.email;
};

const isApproved = () => {
  return getFromLocalStorage('approved');
};

const emailVerified = () => {
  const user = getUserStorage();
  return user && user.email_verified;
};

const addToLocalStorage = (item, value) => {
  if (typeof window !== 'undefined') {
    registerStorage(item);
    localStorage.setItem(item, value);
  }
};

const getFromLocalStorage = item => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(item));
  }
};

const clearStorage = () => {
  if (typeof window !== 'undefined') {
    registeredStorage.forEach(item => {
      localStorage.removeItem(item);
    })
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
