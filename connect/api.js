import axios from 'axios';

const foodApiEndpoint = 'https://api.edamam.com/api/food-database/parser';
const category = ``;
const apiAuthParams = `&app_key=8a2617ec655417bd43fd2b3df4b85a30&app_id=652bd7d5`;
const searchTermsEndpoint = '/api/v1/search';
const recommendationsEndpoint = '/api/v1/recommendations';
const usersEndpoint = '/api/v1/users';

const getRequest = endpoint =>
  axios
    .get(endpoint)
    .then(res => res.data)
    .catch(error =>
      console.error(`ERROR connecting to '${endpoint}': ${error}`)
    );

const postRequest = (endpoint, payload) => {
  axios
    .post(endpoint, payload)
    .then(res => res.data)
    .catch(error =>
      console.error(`ERROR connecting to '${endpoint}': ${error}`)
    );
};

const fetchFoods = name =>
  getRequest(
    `${foodApiEndpoint}?ingr=${name}${apiAuthParams}${category}`
  ).then(res => res.hints);

const fetchRecommendations = user =>
  getRequest(`${recommendationsEndpoint}/?user=${user}`);

const getUser = user => getRequest(`${usersEndpoint}/?user=${user}`);

const getUsers = () => getRequest(usersEndpoint);

const addUser = user => postRequest(usersEndpoint, user);

const getSearchedTerms = searchTerm =>
  getRequest(`${searchTermsEndpoint}/?term=${searchTerm}`);

const postSearchTerm = searchTerm =>
  postRequest(searchTermsEndpoint, searchTerm);

const postRecommendations = recommendations =>
  postRequest(recommendationsEndpoint, recommendations);

export {
  postRecommendations,
  postSearchTerm,
  addUser,
  fetchFoods,
  fetchRecommendations,
  getUser,
  getUsers,
  getSearchedTerms,
};
