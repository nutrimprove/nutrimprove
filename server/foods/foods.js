import connect from '../connect';
import { Schema } from 'mongoose';

const getFoodsConnection = () => connect('foods', new Schema(), 'cofid');

const getFoods = async name => {
  const FoodsConnection = await getFoodsConnection();
  const regex = new RegExp(`.*${decodeURIComponent(name)}.*`, 'i');
  return FoodsConnection.find({ foodName: { $regex: regex } });
};

const getFood = async id => {
  const FoodsConnection = await getFoodsConnection();
  return FoodsConnection.findOne({ code: id });
};

const getAllFoods = async () => {
  const FoodsConnection = await getFoodsConnection();
  return FoodsConnection.find({});
};

export { getFoods, getFood, getAllFoods };
