import { NUTRIENT_GROUPS } from 'helpers/constants';
import { getFoodById } from 'interfaces/api/foods';
import { cloneDeep, uniqueId } from 'lodash';
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

const lowerCaseIncludes = (a, b) => fullTrim(a.toLowerCase()).includes(fullTrim(b.toLowerCase()));

const mapSearchResults = results =>
  results.map(item => ({
    food_id: item.foodCode,
    food_name: item.foodName,
    food_group: item.group,
  }));

const capitalise = string => string.charAt(0).toUpperCase() + string.slice(1);

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
      const nutrientObject = { nutrient: capitalise(label), quantity: valueWithUnit };
      if (addKey) {
        nutrientObject.key = key;
      }
      nutrientsObj.push(nutrientObject);
    }
  });
  return nutrientsObj;
};

const parseFoodDetails = ({ food: { foodName, proximates, vitamins, inorganics }, filterEmptyValues = true }) => ({
  foodName,
  nutrients: [
    ...parseNutrients({ nutrients: proximates, filterEmptyValues }),
    ...parseNutrients({ nutrients: vitamins, filterEmptyValues }),
    ...parseNutrients({ nutrients: inorganics, filterEmptyValues }),
  ],
});

const getCardNutrients = (foodObj, cardNutrients = DEFAULT_CARD_NUTRIENTS) => {
  if (!foodObj) return;

  const allNutrients = NUTRIENT_GROUPS.reduce((merged, group) => {
    return { ...merged, ...foodObj[group] };
  }, {});

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

const sumNutrients = (foods, nutrientGroups = NUTRIENT_GROUPS) => {
  if (foods && foods.length > 0) {
    return foods.reduce((merged, food, index) => {
      const current = cloneDeep(food);
      if (index === 0) {
        nutrientGroups.forEach(group => {
          Object.keys(current[group]).forEach(nutrient => {
            isNaN(current[group][nutrient].quantity)
              ? current[group][nutrient].quantity = 0
              : current[group][nutrient].quantity = +current[group][nutrient].quantity * (+current.quantity / 100);
          });
        });
        return current;
      }

      nutrientGroups.forEach(group => {
        Object.keys(merged[group]).forEach(nutrient => {
          const isNotValid = isNaN(current[group][nutrient].quantity);
          // Sets nutrient quantity (baseline is per 100g) based on food quantity
          const calculatedQuantity = +current[group][nutrient].quantity * (+current.quantity / 100);
          const quantity = isNotValid ? 0 : calculatedQuantity;
          merged[group][nutrient].quantity = +merged[group][nutrient].quantity + +quantity;
        });
      });
      return merged;
    }, {});
  }
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
  lowerCaseIncludes,
  mapSearchResults,
  getFoodsFromRecommendation,
  getFoodGroups,
  parseNutrients,
  parseFoodDetails,
  sumNutrients,
  getCardNutrients,
  filterFoodNames,
};
