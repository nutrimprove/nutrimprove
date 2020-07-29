import { getFoodsByIds } from 'interfaces/api/foods';

export const listsWithFullFoodDetails = async lists => {
  // Get unique food codes from all foods from all lists
  const foodCodes = lists.reduce((codes, list) => {
    const foodCodes = list.foods.map(food => food.foodCode);
    const newFoodCodes = foodCodes.filter(food => !codes.includes(food.foodCode));
    return [...codes, ...newFoodCodes];
  }, []);
  const foods = await getFoodsByIds(foodCodes);
  // Returns list of lists with combined food details (from list and fetched full food details)
  return lists.map(list => ({
    ...list,
    foods: list.foods.map(listFood => ({ ...listFood, ...foods.find(food => food.foodCode === listFood.foodCode) })),
  }));
};

export const formatListToSave = list => ({
  ...list,
  foods: list.foods.map(food => ({
    quantity: food.quantity,
    foodCode: food.foodCode,
    foodName: food.foodName,
  })),
});