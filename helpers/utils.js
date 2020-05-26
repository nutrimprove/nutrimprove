import { getFoodById } from 'interfaces/api/foods';
import { uniqueId } from 'lodash';
import { DEFAULT_CARD_NUTRIENTS } from './constants';

const getTime = () => {
  const today = new Date();
  const hours = today.getHours();
  let minutes = today.getMinutes();
  minutes = minutes <= 9 ? '0' + minutes : minutes;
  let seconds = today.getSeconds();
  seconds = seconds <= 9 ? '0' + seconds : seconds;

  return `${hours}:${minutes}:${seconds}`;
};

const emptyFood = (key = uniqueId()) => ({
  key,
  id: null,
  name: '',
  suggestions: [],
});

const fullTrim = str => str.trim().replace(/\s{2,}/g, '');

const lowerCaseCompare = (a, b) => fullTrim(a.toLowerCase()) === fullTrim(b.toLowerCase());

const mapSearchResults = results => {
  if (!results) return null;

  // if it contains a matches field it's assumed Edamam is being used with a caching collection
  if (results.matches) {
    return results.matches.map(match => ({
      food_id: match.food_id,
      food_name: match.food_name,
    }));
  }
  return results.map(item => ({
    food_id: item.foodCode,
    food_name: item.foodName,
    food_group: item.group,
  }));
};

const parseNutrients = ({ nutrients, filterEmptyValues = true, addKey = false }) => {
  const nutrientsObj = [];
  const keys = Object.keys(nutrients);
  keys.map(key => {
    const nutrient = nutrients[key];
    const { quantity, label, unit } = nutrient;
    const filter = filterEmptyValues ? !isNaN(quantity) && quantity > 0 : true;
    if (filter) {
      const decimalPlaces = label === 'kcal' ? 0 : 2;
      const value = !quantity || isNaN(quantity) ? 0 : Number.parseFloat(quantity).toFixed(decimalPlaces);
      const valueWithUnit = quantity && quantity === 'Tr' ? 'traces' : `${value} ${unit}`;
      const nutrientObject = { nutrient: label, quantity: valueWithUnit };
      if (addKey) {
        nutrientObject.key = key;
      }
      nutrientsObj.push(nutrientObject);
    }
  });
  return nutrientsObj;
};

const getCardNutrients = (foodObj, cardNutrients = DEFAULT_CARD_NUTRIENTS) => {
  if (!foodObj) return;
  const { proximates, vitamins, inorganics } = foodObj;
  const allNutrients = { ...proximates, ...vitamins, ...inorganics };

  // Get only essential nutrients to display in the card
  const nutrients = {};
  Object.keys(allNutrients).map(key => {
    const exists = cardNutrients.some(nutrient => nutrient.name === key);
    if (exists) {
      nutrients[key] = allNutrients[key];
    }
  });

  const parsedNutrients = parseNutrients({ nutrients, filterEmptyValues: false, addKey: true });
  return cardNutrients.map((nutrient, index) => {
    const parsedNutrient = parsedNutrients.find(parsedNutrient => parsedNutrient.key === nutrient.name);
    const newNutrient = {
      label: nutrient.label,
      name: nutrient.name,
      quantity: parsedNutrient.quantity,
    };
    if (nutrient.name !== DEFAULT_CARD_NUTRIENTS[index].name) {
      newNutrient.changed = true;
    }
    return newNutrient;
  });
};

const getFoodsFromRecommendation = async recommendation => {
  if (!recommendation) return null;

  let food;
  let recommendedFood;
  await Promise.all([
    (async () => {
      food = await getFoodById(recommendation.food.id);
    })(),
    (async () => {
      recommendedFood = await getFoodById(recommendation.recommendation.id);
    })(),
  ]);
  return [food, recommendedFood];
};

// Function to generate regex for applicable groups and subgroups to use in CoFID foods search
const getFoodGroups = groups => {
  if (!groups) return;

  const subgroups = [];
  groups.forEach(group => {
    subgroups.push(group);
    subgroups.push(new RegExp(`^${group}(.*)`));
  });

  return subgroups;
};

const filterFoodNames = (foodNames, filters) => {
  if (!foodNames) return;

  return filters.length > 0
    ? foodNames.filter(({ group }) => filters.find(filter => group.match(`^(${filter})(.*)`)))
    : foodNames;
};

export {
  getTime,
  emptyFood,
  fullTrim,
  lowerCaseCompare,
  mapSearchResults,
  getFoodsFromRecommendation,
  getFoodGroups,
  parseNutrients,
  getCardNutrients,
  filterFoodNames,
};
