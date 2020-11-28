const gulp = require('gulp');
const developmentConfig = require('./webpack/development.config');
const prodConfig = require('./webpack/prod.config');
const webpack = require('webpack');
const nodemon = require('nodemon');
const path = require('path');
const { ESLint } = require('eslint');

function onBuild(done) {
  return function (err, stats) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }
    done();
  };
}

gulp.task('build-backend', function (done) {
  webpack(developmentConfig()).run(onBuild(done));
});

gulp.task('build-backend-prod', function (done) {
  webpack(prodConfig()).run(onBuild(done));
});

gulp.task('backend-watch', function (done) {
  webpack(developmentConfig()).watch(
    {
      aggregateTimeout: 100,
      poll: true,
      ignored: /node_modules/,
    },
    function (err, stats) {
      onBuild(done)(err, stats);
      // restarts server, once ts code is recompiled by webpack
      nodemon.restart();
    },
  );
});

gulp.task(
  'watch-ts',
  gulp.series('backend-watch', function (done) {
    // nodemon is used to restart programmatically the server. Watch options are disabled.
    nodemon({
      execMap: {
        js: 'node',
      },
      script: path.join(__dirname, 'build/main'),
      ignore: ['*'], // all paths are ignored.
      watch: ['foo/'], // non-existing path is watched.
      ext: 'noop', // non-existing extention file is watched.
    }).on('restart', function () {
      console.log(`${'\033[0;32m'}${'Restarting server ...'}${'\033[0m'}`);
    });
    done();
  }),
);

async function lintCode() {
  try {
    const eslint = new ESLint();
    const results = await eslint.lintFiles(['./src/**/*.{mjs,js,ts,tsx}']);
    const formatter = await eslint.loadFormatter('stylish');
    const resultText = formatter.format(results);
    if (resultText) {
      console.log(resultText);
    } else {
      console.log(`${'\033[0;32m'}${'No linting errors'}${'\033[0m'}`);
    }
  } catch (e) {
    console.error(e);
  }
}

gulp.task('watch-lint', function (done) {
  gulp.watch(['./src/**/*.ts'], { usePolling: true }).on('change', lintCode).on('add', lintCode);
});
