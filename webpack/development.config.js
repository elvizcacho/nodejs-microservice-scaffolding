const { merge } = require('webpack-merge')
const baseConfig = require('./base.config.js')
const { HotModuleReplacementPlugin } = require('webpack')

module.exports = (env) => {
  return merge(baseConfig, {
    // replace only modules that have changed (makes servers restarts faster)
    plugins: [new HotModuleReplacementPlugin()],
  })
}
