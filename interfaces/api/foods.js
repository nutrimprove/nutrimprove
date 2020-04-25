import { trackPromise } from 'react-promise-tracker';
import { getRequest } from './requests';

const foodApiEndpoint = '/api/foods';

const spreadUrlParams = (params) => {
  const urlParams = Array.isArray(params) ? params : [params];
  return urlParams.map(param => `/${param}`).join('');
};

const getFoods = (name, context = 'getFoods', categories = []) => {
  const subgroups = spreadUrlParams(categories);
  return trackPromise(
    getRequest(`${foodApiEndpoint}/name/${encodeURIComponent(name)}${subgroups}`),
    context,
  );
};

const getFood = (id, context = 'getFoodData') =>
  trackPromise(
    getRequest(`${foodApiEndpoint}/id/${encodeURIComponent(id)}`),
    context,
  );

const getAllFoodNames = () =>
  trackPromise(
    getRequest(`${foodApiEndpoint}`),
    'getAllFoodNames',
  );

const getNutrients = (nutrientGroups) => {
  const groups = spreadUrlParams(nutrientGroups);
  return trackPromise(
    getRequest(`${foodApiEndpoint}/nutrients${groups}`),
    'getNutrients',
  );
};

const getFoodsByNutrient = (nutrient, limit = 100) =>
  trackPromise(
    getRequest(`${foodApiEndpoint}/bynutrient/${encodeURIComponent(nutrient)}?limit=${limit}`),
    'getFoodsByNutrient',
  );

export { getFoods, getFood, getAllFoodNames, getFoodsByNutrient, getNutrients };
