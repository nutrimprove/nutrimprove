import { trackPromise } from 'react-promise-tracker';
import { getRequest } from './requests';

const foodApiEndpoint = '/api/foods';

const getFoods = (name, context = 'getFoods', categories = []) => {
  const subgroups = categories.map(category => `/${category}`).join('');
  return trackPromise(
    getRequest(`${foodApiEndpoint}/name/${encodeURIComponent(name)}${subgroups}`),
    context
  );
};

const getFood = (id, context = 'getFoodData') =>
  trackPromise(
    getRequest(`${foodApiEndpoint}/id/${encodeURIComponent(id)}`),
    context
  );

const getAllFoodNames = (context = 'getAllFoodNames') =>
  trackPromise(
    getRequest(`${foodApiEndpoint}/names`),
    context
  );

export { getFoods, getFood, getAllFoodNames };
