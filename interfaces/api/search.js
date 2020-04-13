import { EDAMAM_DB } from '../../helpers/constants';
import { getSearchedTerms } from './edamamFoods';
import { getFoods } from './foods';

const searchFoods = (name, context, categories) => {
  return EDAMAM_DB
    ? getSearchedTerms(name, context)
    : getFoods(name, context, categories);
};

export default searchFoods;