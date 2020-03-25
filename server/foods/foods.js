import connect from '../connect';
import { Schema } from 'mongoose';

const getFoodsConnection = () => connect('foods', new Schema(), 'foods');

const getFoods = async name => {
  const FoodsConnection = await getFoodsConnection();
  return FoodsConnection.find({ foodName: name });
};

const getFood = async id => {
  const FoodsConnection = await getFoodsConnection();
  return FoodsConnection.findOne({ code: id });
};

export { getFoods, getFood };
