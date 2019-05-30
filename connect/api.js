const apiBase = '/api/v1';

export const getString = string =>
  string
    .toString()
    .trim()
    .toLowerCase();

const fetchValue = async endpoint => {
  const res = await fetch(endpoint);
  const data = await res.json();
  return data;
};

const fetchFoods = () => fetchValue(`${apiBase}/foods`);

const fetchFoodsByName = name =>
  fetchValue(`${apiBase}/foods?name=${name}`);

const fetchFood = id => fetchValue(`${apiBase}/foods/${id}`);

const fetchRecommendations = () =>
  fetchValue(`${apiBase}/recommendationsEndpoint`);

export { fetchFoods, fetchFoodsByName, fetchFood, fetchRecommendations };
