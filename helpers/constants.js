const PROJECT_NAME = 'Nutrimprove';
const ROLES = {
  OWNER: 0,
  ADMIN: 5,
  CONTRIBUTOR: 100,
  DEMO_USER: 200,
};
const MIN_WIDTH = 1100;
const INPUT_TRIGGER_TIME = 300;
const CATEGORIES = {
  all: [
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
  ],
  // Will be set when filtering categories
  selectedGroups: [],
};
const DEFAULT_CARD_NUTRIENTS = [
  { name: 'energy', label: 'Energy' },
  { name: 'carbohydrate', label: 'Carbohydrate' },
  { name: 'fat', label: 'Fat' },
  { name: 'protein', label: 'Protein' },
  { name: 'totalSugars', label: 'Total Sugar' },
  { name: 'fibre', label: 'Fibre' },
  { name: 'SFA', label: 'Saturated Fat' },
  { name: 'omega3', label: 'Omega 3' },
  { name: 'Cholesterol', label: 'Cholesterol' },
];
const NUTRIENT_GROUPS = ['proximates', 'vitamins', 'inorganics'];

const GA_TRACKING_ID = 'UA-168058659-2';

const IS_PRODUCTION = process.env.NODE_ENV === 'production' && process.env.PRODUCTION === 'true';

export {
  PROJECT_NAME,
  ROLES,
  INPUT_TRIGGER_TIME,
  MIN_WIDTH,
  CATEGORIES,
  DEFAULT_CARD_NUTRIENTS,
  NUTRIENT_GROUPS,
  GA_TRACKING_ID,
  IS_PRODUCTION,
};
