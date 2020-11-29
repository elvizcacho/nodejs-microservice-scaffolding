const path = require('path');
const fs = require('fs');
const gracefulFs = require('graceful-fs');
gracefulFs.gracefulify(fs);
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { BannerPlugin } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs2 ' + mod;
  });

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: path.join(__dirname, '../src/main.ts'),
  target: 'node',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'main.js',
  },
  externals: nodeModules, // avoid building node_modules
  module: {
    rules: [
      {
        // loader needed for the YAML swagger documentation
        test: /\.yaml$/,
        type: 'json',
        use: 'yaml-loader',
      },
      {
        loader: 'ts-loader',
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true,
        },
        test: /\.ts$/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      // This plugin is generating aliases from the tsconfig paths.
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    ],
  },
  plugins: [
    // runs type checker in a parallel process to speed up ts compilation.
    new ForkTsCheckerWebpackPlugin(),
    // add source map support so stack traces point to TS code.
    new BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],
};
