import { EDAMAM_DB } from '../../helpers/constants';
import { getSearchedTerms } from './edamamFoods';
import { getFoods } from './foods';

const searchFoods = (name, context) => {
  const search = EDAMAM_DB ? getSearchedTerms : getFoods;
  return search(name, context);
};

export default searchFoods;