import axios from 'axios';

const foodApiEndpoint = 'https://api.edamam.com/api/food-database/parser';
const category = `&category=generic-foods`;
const apiAuthParams = `&app_key=8a2617ec655417bd43fd2b3df4b85a30&app_id=652bd7d5`;
const searchTermsEndpoint = '/api/v1/search';

export const getString = string =>
  string
    .toString()
    .trim()
    .toLowerCase();

const getRequest = endpoint =>
  axios
    .get(endpoint)
    .then(response => response.data.result)
    .catch(error =>
      console.error(`ERROR connecting to: ${endpoint}. ${error}`)
    );

const fetchFoods = name =>
  fetch(`${foodApiEndpoint}?ingr=${name}${apiAuthParams}${category}`).then(
    res => res.json().then(value => value.hints)
  );

const getSearchedTerms = searchTerm =>
  getRequest(`${searchTermsEndpoint}/?term=${searchTerm}`);

const postSearchTerm = searchTerm => {
  axios
    .post(searchTermsEndpoint, searchTerm)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(`ERROR connecting to: ${searchTermsEndpoint}. ${error}`);
    });
};

export { fetchFoods, postSearchTerm, getSearchedTerms };
