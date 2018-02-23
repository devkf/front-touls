// Gulpfile
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	gutil = require('gulp-util'),
	uglify = require('gulp-uglify'),
	connect = require('gulp-connect'),
    concat = require('gulp-concat');

// GLOBAL PARAM
var PUBLIC_FOLDER = './public';
var SRC_FOLDER = './src';



// SASS TO CSS
gulp.task('compile-sass', function() {
  gulp.src(SRC_FOLDER + '/sass/*.scss')
  .pipe(sass({style: 'expanded'}))
	.on('error', gutil.log)
  .pipe(gulp.dest(PUBLIC_FOLDER + '/css/'))
});

// CONCAT + UGLIFY
gulp.task('concat-js', function() {
  gulp.src(SRC_FOLDER + '/js/*.js')
  .pipe(uglify())
  .pipe(concat('main.js'))
  .pipe(gulp.dest(PUBLIC_FOLDER + '/js/'))
});

// MOVE STATIC FILE TO PUBLIC FOLDER
// gulp.task('copy-static-files', function() {
//   gulp.src(SRC_FOLDER + '/**/*.html')
//   .pipe(gulp.dest(PUBLIC_FOLDER))
// });


// CONNECT == LIVERELOAD
gulp.task('connect', function() {
  connect.server({
    root: PUBLIC_FOLDER,
    livereload: true
  })
});


gulp.task('html', function() {
  gulp.src(PUBLIC_FOLDER + '/*.html')
  .pipe(connect.reload())
});



gulp.task('default', ['html', 'compile-sass', 'concat-js', 'connect', 'watch']);


gulp.task('watch', function() {
  gulp.watch('src/sass/**/*.scss', ['compile-sass']);
  gulp.watch('src/**/*.js', ['concat-js']);
  gulp.watch(PUBLIC_FOLDER + '/*.html', ['html']);
});