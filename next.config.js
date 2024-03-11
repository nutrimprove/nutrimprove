const Dotenv = require('dotenv-webpack');

module.exports = {
  // target: 'serverless',
  webpack(config) {
    config.plugins.push(new Dotenv({ silent: true }));
    return config;
  },
  env: {
    // AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    // AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    MONGODB_URI: process.env.MONGODB_URI,
  },
};
