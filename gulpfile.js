const { src, dest, watch, series, parallel } = require('gulp');
const concat = require('gulp-concat');

const files = { 
    css: './app/**/*.css',
    js: './app/**/*.js'
}

function js(){
  return src([files.js])
    .pipe(concat('app.js'))
    .pipe(dest('minified'));
}

function css(){
  return src(files.css)
    .pipe(concat('styles.css'))
    .pipe(dest('minified'))
}

function watcher(){
  watch([files.css, files.js], null, series(parallel(css, js)));
}

exports.default = series( parallel(css, js), watcher );