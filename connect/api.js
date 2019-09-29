import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

const foodApiEndpoint = 'https://api.edamam.com/api/food-database/parser';
const category = ``;
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
  trackPromise(
    axios
      .get(`${foodApiEndpoint}?ingr=${name}${apiAuthParams}${category}`)
      .then(res => res.data.hints),
    'fetchFoods'
  );

const fetchRecommendations = contributor =>
  trackPromise(
    getRequest(`${recommendationsEndpoint}/?cid=${contributor}`),
    'fetchRecommendations'
  );

const getSearchedTerms = searchTerm =>
  getRequest(`${searchTermsEndpoint}/?term=${searchTerm}`);

const postSearchTerm = searchTerm => {
  trackPromise(
    axios
      .post(searchTermsEndpoint, searchTerm)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(
          `ERROR connecting to '${searchTermsEndpoint}': ${error}`
        );
      }),
    'saveSearchTerm'
  );
};

const postRecommendations = payload =>
  trackPromise(
    axios.post(recommendationsEndpoint, payload).then(res => res.data),
    'postRecommendations'
  );

export {
  postRecommendations,
  postSearchTerm,
  fetchFoods,
  fetchRecommendations,
  getSearchedTerms,
};
