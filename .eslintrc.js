module.exports = {
  plugins: ['jsx-a11y', 'import'],
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'eslint-config-prettier', // later plugins override earlier ones so keep this near the bottom
  ],
}
