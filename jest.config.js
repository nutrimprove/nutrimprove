module.exports = {
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    '^@[/](.+)': '<rootDir>/src/$1',
    '^components[/](.+)': '<rootDir>/components/$1',
    '^helpers[/](.+)': '<rootDir>/helpers/$1',
    '^store[/](.+)': '<rootDir>/store/$1',
  },
};
