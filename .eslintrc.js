module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 9,
  },
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      { name: 'Link', linkAttribute: 'to' },
    ],
  },
  plugins: ['jsx-a11y', 'import', 'jest'],
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'plugin:jest/recommended',
    'eslint-config-prettier', // later plugins override earlier ones so keep this near the bottom
  ],
  rules: {
    'react/react-in-jsx-scope': 0, // Not needed with Next.js
    'no-warning-comments': 2, // TODOs should be added as GitHub issues. Also helps you not forget things
  },
};
