const foodApiEndpoint = `https://api.edamam.com/api/food-database/parser`;
const category = `&category=generic-foods`;
const apiAuthParams = `&app_key=8a2617ec655417bd43fd2b3df4b85a30&app_id=652bd7d5`;
const recommendationsEndpoint = '/api/v1/recommendations';

export const getString = string =>
  string
    .toString()
    .trim()
    .toLowerCase();

const fetchValues = endpoint =>
  fetch(endpoint).then(res => res.json().then(value => value.hints));

const fetchFood = name =>
  fetchValues(
    `${foodApiEndpoint}?ingr=${name}${apiAuthParams}${category}`
  );

const fetchRecommendations = () => fetchValues(recommendationsEndpoint);

export { fetchFood, fetchRecommendations };
