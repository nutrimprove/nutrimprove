module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 9,
  },
  env: {
    browser: true,
    node: true,
    'cypress/globals': true,
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
  plugins: ['jsx-a11y', 'import', 'cypress', 'chai-friendly', 'jest'],
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'plugin:jest/recommended',
    'eslint-config-prettier', // later plugins override earlier ones so keep this near the bottom
    'plugin:chai-friendly/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 0, // Not needed with Next.js
    'jsx-a11y/mouse-events-have-key-events': 0, // Using onMouseOver without the need for onFocus
    'jsx-a11y/no-autofocus': 0, // Auto-focusing inline elements on click
    'no-warning-comments': 2, // TODOs should be added as GitHub issues. Also helps you not forget things
    // Cypress rules
    // 'cypress/no-assigning-return-values': 'error',
    // 'cypress/no-unnecessary-waiting': 'error',
    // 'cypress/assertion-before-screenshot': 'warn',
    // 'cypress/no-force': 'warn',
    // 'cypress/no-async-tests': 'error',
    // 'no-unused-expressions': 0,
    // 'chai-friendly/no-unused-expressions': 2,

  },
  overrides: [{
    files: [
      '**/*_spec.js'
    ],
    rules: {
      'jest/valid-expect': 0,
    }
  }]
};
