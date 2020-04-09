const PROJECT_NAME = 'NutrImprove';
const ROLES = {
  OWNER: 0,
  ADMIN: 5,
  CONTRIBUTOR: 100,
};
const INPUT_TRIGGER_TIME = 700;
const MIN_WIDTH = 960;
const EDAMAM_DB = false;

const CATEGORIES = [
  { code: 'A', name: 'Cereals and cereal products', selected: true },
  { code: 'B', name: 'Milk and milk products', selected: true },
  { code: 'C', name: 'Eggs', selected: true },
  { code: 'D', name: 'Vegetables', selected: true },
  { code: 'F', name: 'Fruit', selected: true },
  { code: 'G', name: 'Nuts and seeds', selected: true },
  { code: 'H', name: 'Herbs and spices', selected: true },
  { code: 'J', name: 'Fish and fish products', selected: true },
  { code: 'M', name: 'Meat and meat products', selected: true },
  { code: 'O', name: 'Fats and oils', selected: true },
  { code: 'P', name: 'Beverages', selected: true },
  { code: 'Q', name: 'Alcoholic beverages', selected: true },
  { code: 'S', name: 'Sugars, preserves and snacks', selected: true },
  { code: 'W', name: 'Soups, sauces and miscellaneous foods', selected: true },
];

export { PROJECT_NAME, ROLES, INPUT_TRIGGER_TIME, MIN_WIDTH, EDAMAM_DB, CATEGORIES };
