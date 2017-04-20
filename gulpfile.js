'use strict';

const gulp = require('gulp');

const examples = () => {
  const connect = require('gulp-connect');
  const cors = require('cors');
  const path = require('path');

  connect.server({
    root: ['examples', 'dist'],
    port: 8888,
    livereload: false,
    open: false,
    middleware: (connect, opt) => [cors()],
  });
}

gulp.task('examples', examples);
