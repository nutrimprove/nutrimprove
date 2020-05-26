import { EDAMAM_DB } from 'helpers/constants';
import { getNutritionalData } from './edamamFoods';
import { getFoodById } from './foods';

const getNutritionData = (name, context) => {
  const nutrition = EDAMAM_DB ? getNutritionalData : getFoodById;
  return nutrition(name, context);
};

export { getNutritionData };