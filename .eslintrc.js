module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: true, // Set to false if not using a babel config file
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
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
  plugins: ['jsx-a11y', 'chai-friendly', 'jest', 'import'],
  extends: [
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:jest/recommended',
    'eslint-config-prettier', // later plugins override earlier ones so keep this near the bottom
    'plugin:chai-friendly/recommended',
  ],
  rules: {
    'jsx-a11y/mouse-events-have-key-events': 0, // Using onMouseOver without the need for onFocus
    'jsx-a11y/no-autofocus': 0, // Auto-focusing inline elements on click
    'no-warning-comments': 2, // TODOs should be added as GitHub issues. Also helps you not forget things

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
