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
  { group: 'A', name: 'Cereals and cereal products', selected: true },
  { group: 'B', name: 'Milk and milk products', selected: true },
  { group: 'C', name: 'Eggs', selected: true },
  { group: 'D', name: 'Vegetables', selected: true },
  { group: 'F', name: 'Fruit', selected: true },
  { group: 'G', name: 'Nuts and seeds', selected: true },
  { group: 'H', name: 'Herbs and spices', selected: true },
  { group: 'J', name: 'Fish and fish products', selected: true },
  { group: 'M', name: 'Meat and meat products', selected: true },
  { group: 'O', name: 'Fats and oils', selected: true },
  { group: 'P', name: 'Beverages', selected: true },
  { group: 'Q', name: 'Alcoholic beverages', selected: true },
  { group: 'S', name: 'Sugars, preserves and snacks', selected: true },
  { group: 'W', name: 'Soups, sauces and miscellaneous foods', selected: true },
];

export { PROJECT_NAME, ROLES, INPUT_TRIGGER_TIME, MIN_WIDTH, EDAMAM_DB, CATEGORIES };
