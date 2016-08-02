var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch');

var vendor = 'assets/scripts/vendor/';

function setFile( path, file ) {
  return path + file;
}

gulp.task('clean', () => {
  return gulp.src('dist/')
  .pipe( clean() );
});

gulp.task('jshint', () => {
  return gulp.src('assets/scripts/*.js', '!assets/scripts/vendor/*.js')
  .pipe( jshint() )
  .pipe( jshint.reporter('default') );
});

gulp.task('uglify', () => {
  gulp.src([
    'assets/scripts/vendor/jquery.js',
    'assets/scripts/vendor/tweetMax',
    'assets/scripts/vendor/scroll.min.js',
    'assets/scripts/vendor/prims',
    'assets/scripts/vendor/anchor'
  ])
  .pipe( uglify() )
  .pipe( concat('vendor.min.js') )
  .pipe( gulp.dest('assets/dist/scripts/') )
});

gulp.task('sass', () => {
  return gulp.src('_sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/dist/styles'));
});

gulp.task('watch', () => {
  gulp.watch('assets/scripts/**/*.js', ['uglify']);
  gulp.watch('_sass/**/*.scss', ['sass']);
});
