const { merge } = require('webpack-merge');
const baseConfig = require('./base.config.js');
const path = require('path');

module.exports = (env) => {
  return merge(baseConfig, {
    mode: 'production',
    output: {
      path: path.join(__dirname, '../dist'),
      filename: 'main.js',
    },
  });
};
