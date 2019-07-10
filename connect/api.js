const foodApiEndpoint = 'https://api.edamam.com/api/food-database/parser';
const category = `&category=generic-foods`;
const apiAuthParams = `&app_key=8a2617ec655417bd43fd2b3df4b85a30&app_id=652bd7d5`;
const searchTermsEndpoint = '/api/v1/search';

export const getString = string =>
  string
    .toString()
    .trim()
    .toLowerCase();

const fetchFoods = name =>
  fetch(`${foodApiEndpoint}?ingr=${name}${apiAuthParams}${category}`).then(
    res => res.json().then(value => value.hints)
  );

const fetchSearchedTerms = term => {
  const endpoint = term
    ? `${searchTermsEndpoint}?term=${term}`
    : searchTermsEndpoint;

  return fetch(endpoint).then(res =>
    res.json().then(value => value.documents)
  );
};

export { fetchFoods, fetchSearchedTerms };
