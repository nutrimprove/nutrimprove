import { uniqueId } from 'lodash';

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

const parseNutrients = ({nutrients, filterEmptyValues = true, addKey = false}) => {
  const nutrientsObj = [];
  const keys = Object.keys(nutrients);
  keys.map(key => {
    const nutrient = nutrients[key];
    const { quantity, label, unit } = nutrient;
    const filter = filterEmptyValues ? !isNaN(quantity) && quantity > 0 : true;
    if (filter) {
      const value = !quantity || isNaN(quantity) ? 0 : Number.parseFloat(quantity).toFixed(2);
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

export { getTime, emptyFood, fullTrim, lowerCaseCompare, mapSearchResults, getFoodGroups, parseNutrients };
