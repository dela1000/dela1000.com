const gulp = require('gulp')
const concat = require('gulp-concat')

// concat js files
gulp.task('js', () => {
  return gulp.src('./app/**/*.js')
  .pipe(concat('app.js'))
  .pipe(gulp.dest('minified'))
})

// concat css files
gulp.task('css', () => {
  return gulp.src('./app/**/*.css')
  .pipe(concat('styles.css'))
  .pipe(gulp.dest('minified'))
})

// watch files for changes (run command `gulp watch`)
gulp.task('watch', ['js', 'css'], () => {
  gulp.watch('./app/**/*.js', ['js'])
  gulp.watch('./app/**/*.css', ['css'])
})

gulp.task('default', function() {
  gulp.run('styles')
  gulp.run('js')
})
