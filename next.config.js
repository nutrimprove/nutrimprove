module.exports = {
  target: 'serverless',
  webpack(config) {
    config.node = { fs: 'empty', tls: 'empty', net: 'empty' };
    return config;
  },
};
