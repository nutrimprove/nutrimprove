import axios from 'axios';

const foodApiEndpoint = 'https://api.edamam.com/api/food-database/parser';
const category = `&category=generic-foods`;
const apiAuthParams = `&app_key=8a2617ec655417bd43fd2b3df4b85a30&app_id=652bd7d5`;
const searchTermsEndpoint = '/api/v1/search';
const recommendationsEndpoint = '/api/v1/recommendations';

export const getString = string =>
  string
    .toString()
    .trim()
    .toLowerCase();

const getRequest = endpoint =>
  axios
    .get(endpoint)
    .then(res => res.data)
    .catch(error =>
      console.error(`ERROR connecting to '${endpoint}': ${error}`)
    );

const fetchFoods = name =>
  axios
    .get(`${foodApiEndpoint}?ingr=${name}${apiAuthParams}${category}`)
    .then(res => res.data.hints);

const fetchRecommendations = contributor =>
  axios
    .get(`${recommendationsEndpoint}?id=${contributor}`)
    .then(res => res.data.hints);

const getSearchedTerms = searchTerm =>
  getRequest(`${searchTermsEndpoint}/?term=${searchTerm}`);

const addRecommendation = payload =>
  axios.post(recommendationsEndpoint, payload).then(res => res.data);

export {
  addRecommendation,
  fetchFoods,
  fetchRecommendations,
  getSearchedTerms,
};
