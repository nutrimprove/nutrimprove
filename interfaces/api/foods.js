import { trackPromise } from 'react-promise-tracker';
import { getRequest, postRequest } from './requests';

const foodApiEndpoint = '/api/foods';

const spreadUrlParams = (params) => {
  const urlParams = Array.isArray(params) ? params : [params];
  return urlParams.map(param => `/${param}`).join('');
};

const getFoodsByCategories = (name, context = 'getFoods', categories = []) => {
  const subgroups = spreadUrlParams(categories);
  return trackPromise(
    getRequest(`${foodApiEndpoint}/name/${encodeURIComponent(name)}${subgroups}`),
    context,
  );
};

const getFoodById = (id, context = 'getFoodData') =>
  trackPromise(
    getRequest(`${foodApiEndpoint}/id/${encodeURIComponent(id)}`),
    context,
  );

const getFoodsByIds = (ids, context = 'getFoodData') =>
  trackPromise(
    postRequest(`${foodApiEndpoint}/ids`, { ids }),
    context,
  );

const getFoodByName = (name, context = 'getFoodData') =>
  trackPromise(
    getRequest(`${foodApiEndpoint}/name/${encodeURIComponent(name)}`),
    context,
  );

const getAllFoodNames = () =>
  trackPromise(
    getRequest(`${foodApiEndpoint}/names`),
    'getAllFoodNames',
  );

const getNutrients = (nutrientGroups) => {
  const groups = spreadUrlParams(nutrientGroups);
  return trackPromise(
    getRequest(`${foodApiEndpoint}/nutrients${groups}`),
    'getNutrients',
  );
};

const getFoodsByNutrient = ({ nutrient, limit = 100, filters }) => {
  const filtersQuery = filters && filters.length > 0 ? `&filters=${filters.join(',')}` : '';
  return trackPromise(
    getRequest(`${foodApiEndpoint}/nutrient/${encodeURIComponent(nutrient)}?limit=${limit}${filtersQuery}`),
    'getFoodsByNutrient',
  );
};

const setHealthyFlag = (foodId, flag) => {
  return trackPromise(
    postRequest(`${foodApiEndpoint}/sethealthyflag`, { foodId, flag }),
    'setHealthyFlag',
  );
};

const getHealthyFoods = () => {
  return trackPromise(
    getRequest(`${foodApiEndpoint}/healthy`),
    'getFlaggedFoods',
  );
};

const getNonHealthyFoods = () => {
  return trackPromise(
    getRequest(`${foodApiEndpoint}/nonhealthy`),
    'getFlaggedFoods',
  );
};

const getHealthyUnflaggedFoods = () => {
  return trackPromise(
    getRequest(`${foodApiEndpoint}/healthyunflagged`),
    'getFlaggedFoods',
  );
};

export {
  getFoodsByCategories,
  getFoodById,
  getFoodsByIds,
  getFoodByName,
  getAllFoodNames,
  getFoodsByNutrient,
  getNutrients,
  setHealthyFlag,
  getHealthyFoods,
  getNonHealthyFoods,
  getHealthyUnflaggedFoods,
};
