import { testFoods, testRecommendations } from '../connect/queries'

const isLive = process.env.API === 'live'
const foodsEndpoint = '/api/v1/foods'
const recommendationsEndpoint = '/api/v1/recommendations'
const foodByIdEndpoint = '/api/v1/food/id'
const foodByNameEndpoint = '/api/v1/food/name'

const getString = string =>
  string
    .toString()
    .trim()
    .toLowerCase()

const fetchValues = endpoint => {
  fetch(endpoint)
    .then(response => response.json())
    .then(data => data.value)
}

const fetchFoods = () =>
  isLive ? fetchValues(foodsEndpoint) : Promise.resolve(testFoods.value)

const fetchFoodById = id =>
  isLive
    ? fetchValues(`${foodByIdEndpoint}/${id}`)
    : Promise.resolve(
        testFoods.value.filter(
          food => getString(food.id) === getString(id)
        )
      )

const fetchFoodByName = name =>
  isLive
    ? fetchValues(`${foodByNameEndpoint}/${name}`)
    : Promise.resolve(
        testFoods.value.filter(food =>
          getString(food.foodname).includes(getString(name))
        )
      )

const fetchRecommendations = () =>
  isLive
    ? fetchValues(recommendationsEndpoint)
    : Promise.resolve(testRecommendations.value)

module.exports.fetchFoods = fetchFoods
module.exports.fetchFoodById = fetchFoodById
module.exports.fetchFoodByName = fetchFoodByName
module.exports.fetchRecommendations = fetchRecommendations
