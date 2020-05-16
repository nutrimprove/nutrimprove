import { trackPromise } from 'react-promise-tracker';
import { getRequest, postRequest } from './requests';

const recommendationsEndpoint = '/api/recommendations';

const getUserRecommendations = user =>
  trackPromise(
    getRequest(
      `${recommendationsEndpoint}/user/${encodeURIComponent(user)}`,
    ),
    'getUserRecommendations',
  );

const getRecommendationsByFood = food =>
  trackPromise(
    getRequest(
      `${recommendationsEndpoint}/food/${encodeURIComponent(food)}`,
    ),
    'getRecommendationsByFood',
  );

const getAllRecommendations = () =>
  trackPromise(
    getRequest(`${recommendationsEndpoint}/all`),
    'getAllRecommendations',
  );

const postRecommendations = payload =>
  trackPromise(
    postRequest(recommendationsEndpoint, payload),
    'postRecommendations',
  );

const applyRecommendationRating = (id, rating, context = 'applyRating') =>
  trackPromise(
    postRequest(`${recommendationsEndpoint}/applyRating`, { id, rating }),
    context,
  );

export {
  postRecommendations,
  getUserRecommendations,
  getRecommendationsByFood,
  getAllRecommendations,
  applyRecommendationRating,
};
