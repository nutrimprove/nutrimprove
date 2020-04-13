import { trackPromise } from 'react-promise-tracker';
import { getRequest } from './requests';

const foodApiEndpoint = '/api/foods';

const getFoods = (name, context = 'getFoods') =>
  trackPromise(
    getRequest(`${foodApiEndpoint}/name/${encodeURIComponent(name)}`),
    context
  );

const getFood = (id, context = 'getFoodData') =>
  trackPromise(
    getRequest(`${foodApiEndpoint}/id/${encodeURIComponent(id)}`),
    context
  );

export { getFoods, getFood };
