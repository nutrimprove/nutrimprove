import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const foodApiEndpoint = 'https://api.edamam.com/api/food-database/parser';
const nutritionApiEndpoint =
  'https://api.edamam.com/api/food-database/nutrients';
const category = ``; // Edamam category filter
const apiAuthParams = `app_key=8a2617ec655417bd43fd2b3df4b85a30&app_id=652bd7d5`;
const searchTermsEndpoint = '/api/search';
const recommendationsEndpoint = '/api/recommendations';
const usersEndpoint = '/api/users';

const getRequest = endpoint =>
  axios
    .get(endpoint)
    .then(res => res.data)
    .catch(error =>
      console.error(`ERROR connecting to '${endpoint}': ${error}`)
    );

const postRequest = (endpoint, payload) =>
  axios
    .post(endpoint, payload)
    .then(res => res.data)
    .catch(error =>
      console.error(`ERROR connecting to '${endpoint}': ${error}`)
    );

const fetchFoods = name =>
  trackPromise(
    getRequest(
      `${foodApiEndpoint}?ingr=${encodeURIComponent(
        name
      )}&${apiAuthParams}${category}`
    ).then(res => res.hints),
    'fetchFoods'
  );

const getNutritionalData = foodId =>
  postRequest(`${nutritionApiEndpoint}?${apiAuthParams}`, {
    ingredients: [
      {
        foodId,
        quantity: 100, // Currently hard coding 100 grams as measurement
        measureURI:
          'http://www.edamam.com/ontologies/edamam.owl#Measure_gram',
      },
    ],
  });

const getRecommendations = user =>
  trackPromise(
    getRequest(`${recommendationsEndpoint}/${encodeURIComponent(user)}`),
    'getRecommendations'
  );

const getUsers = user =>
  getRequest(`${usersEndpoint}/${encodeURIComponent(user)}`);

const addUser = user =>
  postRequest(usersEndpoint, encodeURIComponent(user));

const approveUser = user =>
  trackPromise(
    postRequest(usersEndpoint, { user, approval: true }),
    `approveUser-${user}`
  );

const revokeUser = user =>
  trackPromise(
    postRequest(usersEndpoint, { user, approval: false }),
    `revokeUser-${user}`
  );

const deleteUser = user =>
  trackPromise(
    postRequest(usersEndpoint, { user, deleteuser: true }),
    `deleteUser-${user}`
  );

const getSearchedTerms = searchTerm =>
  getRequest(`${searchTermsEndpoint}/${encodeURIComponent(searchTerm)}`);

const postSearchTerm = searchTerm =>
  postRequest(searchTermsEndpoint, encodeURIComponent(searchTerm));

const postRecommendations = payload =>
  trackPromise(
    postRequest(recommendationsEndpoint, payload),
    'postRecommendations'
  );

export {
  postRecommendations,
  postSearchTerm,
  addUser,
  fetchFoods,
  getRecommendations,
  getUsers,
  getSearchedTerms,
  approveUser,
  revokeUser,
  deleteUser,
  getNutritionalData,
};
