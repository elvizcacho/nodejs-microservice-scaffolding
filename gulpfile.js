const gulp = require('gulp');
const developmentConfig = require('./webpack/development.config');
const prodConfig = require('./webpack/prod.config');
const webpack = require('webpack');
const nodemon = require('nodemon');
const path = require('path');
const { ESLint } = require('eslint');
const exec = require('child_process').exec;

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

gulp.task('build-documentation', function (cb) {
  exec(
    `node ref-merger.js --file src/documentation/openapi.yaml --out src/documentation/merged-openapi.yaml && 
      swagger-cli bundle src/documentation/merged-openapi.yaml --outfile src/documentation/build/openapi.yaml --type yaml && 
      rm src/documentation/merged-openapi.yaml &&
      echo "\
###############################################\n\
# THIS FILE IS GENERATED AUTOMATICALLY USING  #\n\
# build-documentation GULP TASK.              #\n\
# DO NOT MODIFY THIS FILE.                    #\n\
###############################################\n\
" | cat - src/documentation/build/openapi.yaml > temp && 
      mv temp src/documentation/build/openapi.yaml
      `,
    function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    },
  );
});

gulp.task(
  'build-backend',
  gulp.series('build-documentation', function (done) {
    webpack(developmentConfig()).run(onBuild(done));
  }),
);

gulp.task(
  'build-backend-prod',
  gulp.series('build-documentation', function (done) {
    webpack(prodConfig()).run(onBuild(done));
  }),
);

gulp.task(
  'backend-watch',
  gulp.series('build-documentation', function (done) {
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
  }),
);

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
  gulp
    .watch(['./src/**/*.ts'], { usePolling: true })
    .on('change', lintCode)
    .on('add', lintCode);
});
