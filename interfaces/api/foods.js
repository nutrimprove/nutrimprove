import { trackPromise } from 'react-promise-tracker';
import { getRequest, postRequest } from './requests';

const edamamFoodApiEndpoint =
  'https://api.edamam.com/api/food-database/parser';
const edamamNutritionApiEndpoint =
  'https://api.edamam.com/api/food-database/nutrients';
const edamamCategory = `generic-foods`;
const edamamApiAuthParams = `app_key=8a2617ec655417bd43fd2b3df4b85a30&app_id=652bd7d5`;
const foodApiEndpoint = '/api/foods';

const fetchEdamamFoods = name =>
  getRequest(
    `${edamamFoodApiEndpoint}?ingr=${encodeURIComponent(
      name
    )}&${edamamApiAuthParams}&category=${edamamCategory}`
  ).then(res => res.hints);

const getFoods = name =>
  trackPromise(
    getRequest(`${foodApiEndpoint}/name/${encodeURIComponent(name)}`),
    'getFoods'
  );

const getNutritionalData = foodId =>
  trackPromise(
    postRequest(`${edamamNutritionApiEndpoint}?${edamamApiAuthParams}`, {
      ingredients: [
        {
          foodId,
          quantity: 100, // Currently hard coding 100 grams as measurement
          measureURI:
            'http://www.edamam.com/ontologies/edamam.owl#Measure_gram',
        },
      ],
    }),
    'getNutritionalData'
  );

export { fetchEdamamFoods, getFoods, getNutritionalData };
