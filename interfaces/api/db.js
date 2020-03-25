import { trackPromise } from 'react-promise-tracker';
import { postRequest } from './requests';

const updateDBEndpoint = '/api/db/update';

const updateDB = () =>
  trackPromise(postRequest(updateDBEndpoint), 'updateDB');

export { updateDB };
