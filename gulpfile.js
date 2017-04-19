'use strict';

const gulp = require('gulp');

const examples = () => {
  const connect = require('gulp-connect');
  const cors = require('cors');
  const path = require('path');

  connect.server({
    root: path.resolve(__dirname, 'examples'),
    port: 8001,
    livereload: false,
    open: false,
    middleware: (connect, opt) => [cors()],
  });
}

gulp.task('examples', examples);
