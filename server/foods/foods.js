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
    query = { foodName: { $regex: regex }, group: { $in : categories } };
  }
  return FoodsConnection.find(query);
};

const getFood = async id => {
  const FoodsConnection = await getFoodsConnection();
  return FoodsConnection.findOne({ foodCode: id });
};

const getAllFoods = async () => {
  const FoodsConnection = await getFoodsConnection();
  return FoodsConnection.find({});
};

export { getFoods, getFood, getAllFoods };