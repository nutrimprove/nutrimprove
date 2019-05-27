const queries = {
  foods: 'SELECT * FROM eatwell_fooddata;',
  statusCheck:
    'SELECT val FROM eatwell.status WHERE status.key = "status";',
  foodById: id => `SELECT * FROM eatwell_fooddata WHERE id = "${id}";`,
  foodByName: name =>
    `SELECT * FROM eatwell_fooddata WHERE foodname LIKE "%${name}%";`,
  recommendations: `SELECT rec.id, fd.foodname, fd2.foodname as "recommendation", cont.name FROM eatwell_recommendations rec, eatwell_fooddata fd, eatwell_fooddata fd2, eatwell_contributors cont WHERE rec.food_id = fd.id AND rec.foodrec_id=fd2.id AND rec.contributor_id=cont.id;`,
};

const testFoods = {
  timestamp: '2019-05-10T18:21:35.403Z',
  statusCode: 200,
  message: 'Request successful',
  value: [
    {
      id: 1,
      foodname: 'Crisps',
      portion_grams: 30,
      portion_hand: 1,
      carbs: 25,
      fat: 25,
      protein: 25,
      sugar: 5,
      salt: 2,
      fibre: 4,
    },
    {
      id: 2,
      foodname: 'Apple',
      portion_grams: 45,
      portion_hand: 1,
      carbs: 15,
      fat: 15,
      protein: 15,
      sugar: 3,
      salt: 1,
      fibre: 2,
    },
    {
      id: 3,
      foodname: 'Yogurt',
      portion_grams: 12,
      portion_hand: 1,
      carbs: 3,
      fat: 4,
      protein: 5,
      sugar: 2,
      salt: 0.3,
      fibre: 1,
    },
    {
      id: 4,
      foodname: 'Icecream',
      portion_grams: 12,
      portion_hand: 1,
      carbs: 12,
      fat: 12,
      protein: 12,
      sugar: 3,
      salt: 1.1,
      fibre: 1,
    },
    {
      id: 5,
      foodname: 'Biscuit',
      portion_grams: 12,
      portion_hand: 1,
      carbs: 12,
      fat: 12,
      protein: 12,
      sugar: 1,
      salt: 1,
      fibre: 1,
    },
    {
      id: 6,
      foodname: 'Banana',
      portion_grams: 12,
      portion_hand: 1,
      carbs: 12,
      fat: 12,
      protein: 12,
      sugar: 3,
      salt: 3,
      fibre: 1,
    },
  ],
};

const testRecommendations = {
  timestamp: '2019-05-10T19:27:54.310Z',
  statusCode: 200,
  message: 'Request successful',
  value: [
    {
      id: 1,
      foodname: 'Crisps',
      recommendation: 'Apple',
      name: 'Joao Jesus',
    },
    {
      id: 2,
      foodname: 'Crisps',
      recommendation: 'Banana',
      name: 'Peter Santos',
    },
    {
      id: 3,
      foodname: 'Icecream',
      recommendation: 'Yogurt',
      name: 'Kim Lucifer',
    },
    {
      id: 4,
      foodname: 'Biscuit',
      recommendation: 'Apple',
      name: 'Peter Santos',
    },
    {
      id: 5,
      foodname: 'Biscuit',
      recommendation: 'Banana',
      name: 'Joao Jesus',
    },
  ],
};

module.exports.queries = queries;
module.exports.testFoods = testFoods;
module.exports.testRecommendations = testRecommendations;