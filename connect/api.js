const foodApiEndpoint = `https://api.edamam.com/api/food-database/parser`;
const category = `&category=generic-foods`;
const apiAuthParams = `&app_key=8a2617ec655417bd43fd2b3df4b85a30&app_id=652bd7d5`;
const recommendationsEndpoint = '/api/v1/recommendations';

export const getString = string =>
  string
    .toString()
    .trim()
    .toLowerCase();

const fetchValue = async endpoint => {
  const res = await fetch(endpoint);
  const { value } = await res.json();
  return value;
};

const fetchFood = name =>
  fetchValue(`${foodApiEndpoint}?ingr=${name}${apiAuthParams}${category}`);

const fetchRecommendations = () => fetchValue(recommendationsEndpoint);

export { fetchFood, fetchRecommendations };
