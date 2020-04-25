import connect from '../connect';
import { Schema } from 'mongoose';
import { getFoodGroups } from '../../helpers/utils';

const getFoodsConnection = () => connect('foods', new Schema(), 'cofid');

const getFoods = async (food) => {
  const name = food.shift();
  const regex = new RegExp(`.*${decodeURIComponent(name)}.*`, 'i');
  const categories = getFoodGroups(food);
  const FoodsConnection = await getFoodsConnection();

  let query = { foodName: { $regex: regex } };
  if (food.length > 0) {
    query = { foodName: { $regex: regex }, group: { $in: categories } };
  }
  return FoodsConnection.find(query);
};

const getFood = async id => {
  const FoodsConnection = await getFoodsConnection();
  return FoodsConnection.findOne({ foodCode: id });
};

const getAllFoodNames = async () => {
  const FoodsConnection = await getFoodsConnection();
  return FoodsConnection.find({}, { foodCode: 1, foodName: 1, group: 1, _id: 0 });
};

const getNutrients = async (nutrientGroups) => {
  const FoodsConnection = await getFoodsConnection();
  const projection = { _id: 0 };

  // Add only required nutrient types to projection
  nutrientGroups.forEach(type => {
    projection[type] = 1;
  });

  const result = await FoodsConnection.findOne({}, projection);
  const document = result._doc;
  const nutrientsList = [];

  // Removing nutrients that are listed per 100g of Fatty Acids as these are not relevant
  const nutrientsToExclude = 'Per100gFA';

  nutrientGroups.map(group => {
    const list = Object.keys(document[group])
      .filter(nutrient => !nutrient.includes(nutrientsToExclude))
      .map(nutrient => ({
        group,
        name: nutrient,
        label: document[group][nutrient].label,
      }));
    nutrientsList.push(...list);
  });
  return nutrientsList;
};

const getFoodsByNutrient = async (nutrient, limit) => {
  const numberOfRecords = limit && Number(limit) ? Number(limit) : 100;
  const FoodsConnection = await getFoodsConnection();
  const query = {};
  query[`${nutrient}.quantity`] = { $gt: 0 };
  const sort = {};
  sort[nutrient] = -1;
  const projection = { _id: 0, foodName: 1, group: 1 };
  projection[nutrient] = 1;
  return FoodsConnection.find(query, projection).sort(sort).limit(numberOfRecords);
};

export { getFoods, getFood, getAllFoodNames, getNutrients, getFoodsByNutrient };
