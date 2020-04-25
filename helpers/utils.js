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

// Function to generate applicable groups and subgroups to use for CoFID foods search
const getFoodGroups = groups => {
  if (!groups) return;

  const subgroups = [];
  groups.forEach(group => {
    subgroups.push(group);
    subgroups.push(new RegExp(`^${group}(.*)`));
  });

  return subgroups;
};

const splitList = list => {
  if (!list || list.length === 0) return;
  const result = [];
  if (list.length > 6) {
    const total = list.length;
    const slicePosition = (total % 2) % 2 === 0 ? total / 2 : total / 2 + 1;
    const secondHalf = list.splice(slicePosition, list.length);
    result.push(list, secondHalf);
    console.log('=== utils.js #63 === ( result ) =======>', result);
    return result;
  }
};

export { getTime, emptyFood, fullTrim, lowerCaseCompare, mapSearchResults, getFoodGroups, splitList };
