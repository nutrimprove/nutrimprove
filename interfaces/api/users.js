import { trackPromise } from 'react-promise-tracker';
import { getRequest, postRequest } from './requests';

const usersEndpoint = '/api/users';

const getUser = user =>
  trackPromise(
    getRequest(`${usersEndpoint}/${encodeURIComponent(user)}`),
    'getUser',
  );

const getAllUsers = () =>
  trackPromise(
    getRequest(`${usersEndpoint}/all`),
    'getall',
  );

const getApprovedUsers = () =>
  trackPromise(
    getRequest(`${usersEndpoint}/approved?approved=true`),
    'approved',
  );

const getNotApprovedUsers = () =>
  trackPromise(
    getRequest(`${usersEndpoint}/approved?approved=false`),
    'notapproved',
  );

const approveUser = user =>
  trackPromise(
    postRequest(`${usersEndpoint}/approve`, { user, approval: true }),
    `approveUser-${user}`,
  );

const revokeUser = user =>
  trackPromise(
    postRequest(`${usersEndpoint}/approve`, { user, approval: false }),
    `revokeUser-${user}`,
  );

const deleteUser = user =>
  trackPromise(
    postRequest(`${usersEndpoint}/delete`, { user }),
    `deleteUser-${user}`,
  );

const updateAllUsersPoints = () =>
  trackPromise(
    postRequest(`${usersEndpoint}/points`),
    'updateAllUsersPoints',
  );

export {
  getUser,
  getAllUsers,
  getApprovedUsers,
  getNotApprovedUsers,
  approveUser,
  revokeUser,
  deleteUser,
  updateAllUsersPoints,
};
