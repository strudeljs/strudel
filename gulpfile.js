/* eslint-disable */

'use strict';

const gulp = require('gulp');

const examples = () => {
  const connect = require('gulp-connect');
  const open = require('gulp-open');
  const cors = require('cors');
  const path = require('path');
  const options = {
    uri: 'http://localhost:8080/examples',
    app: 'Google Chrome'
  };

  connect.server({
    root: '.',
    port: 8080,
    livereload: false,
    middleware: (connect, opt) => [cors()],
  })

  return gulp.src('./examples/').pipe(open(options));
}

gulp.task('examples', examples);
