import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const foodApiEndpoint = 'https://api.edamam.com/api/food-database/parser';
const nutritionApiEndpoint =
  'https://api.edamam.com/api/food-database/nutrients';
const category = `generic-foods`; // Edamam category filter
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
      )}&${apiAuthParams}&category=${category}`
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

const getUserRecommendations = user =>
  trackPromise(
    getRequest(
      `${recommendationsEndpoint}/user/${encodeURIComponent(user)}`
    ),
    'getUserRecommendations'
  );

const getRecommendationsByFood = food =>
  trackPromise(
    getRequest(
      `${recommendationsEndpoint}/food/${encodeURIComponent(food)}`
    ),
    'getRecommendationsByFood'
  );

const getAllRecommendations = () =>
  trackPromise(
    getRequest(`${recommendationsEndpoint}/all`),
    'getAllRecommendations'
  );

const postRecommendations = payload =>
  trackPromise(
    postRequest(recommendationsEndpoint, payload),
    'postRecommendations'
  );

const getUser = user =>
  trackPromise(
    getRequest(`${usersEndpoint}/${encodeURIComponent(user)}`),
    'getUser'
  );

const getAllUsers = () => getRequest(`${usersEndpoint}/all`);

const getApprovedUsers = () =>
  getRequest(`${usersEndpoint}/approved?approved=true`);

const getNotApprovedUsers = () =>
  getRequest(`${usersEndpoint}/approved?approved=false`);

const approveUser = user =>
  trackPromise(
    postRequest(`${usersEndpoint}/approve`, { user, approval: true }),
    `approveUser-${user}`
  );

const revokeUser = user =>
  trackPromise(
    postRequest(`${usersEndpoint}/approve`, { user, approval: false }),
    `revokeUser-${user}`
  );

const deleteUser = user =>
  trackPromise(
    postRequest(`${usersEndpoint}/delete`, { user }),
    `deleteUser-${user}`
  );

const getSearchedTerms = searchTerm =>
  getRequest(`${searchTermsEndpoint}/${encodeURIComponent(searchTerm)}`);

export {
  postRecommendations,
  fetchFoods,
  getUserRecommendations,
  getRecommendationsByFood,
  getAllRecommendations,
  getUser,
  getAllUsers,
  getApprovedUsers,
  getNotApprovedUsers,
  getSearchedTerms,
  approveUser,
  revokeUser,
  deleteUser,
  getNutritionalData,
};
