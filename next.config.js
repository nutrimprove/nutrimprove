const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  target: 'serverless',
  webpack(config) {
    config.node = { fs: 'empty', tls: 'empty', net: 'empty' };
    config.resolve.alias['components'] = path.join(__dirname, 'components');
    config.plugins.push(new Dotenv());
    return config;
  },
};
