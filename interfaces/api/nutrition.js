import { EDAMAM_DB } from '../../helpers/constants';
import { getNutritionalData } from './edamamFoods';
import { getFood } from './foods';

const getNutritionData = (name, context) => {
  const nutrition = EDAMAM_DB ? getNutritionalData : getFood;
  return nutrition(name, context);
};

export { getNutritionData };