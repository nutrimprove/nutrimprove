module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 9,
  },
  env: {
    browser: true,
    node: true,
  },
  plugins: ['jsx-a11y', 'import'],
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'eslint-config-prettier', // later plugins override earlier ones so keep this near the bottom
  ],
  rules: {
    'react/react-in-jsx-scope': 0, // Not needed with Next.js
  },
}
