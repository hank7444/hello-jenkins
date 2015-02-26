var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var filter = require('gulp-filter');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var map = require('map-stream'); //Install it on your own :)



// test
var es = require('event-stream');
var tap = require('gulp-tap'); // 取得檔案名稱
var rename = require("gulp-rename");
var path = require('path');
var fs = require('fs');

var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

var filefolder = {
    'js': './js/**/*.js',
    'test': './test_mocha/**/*.js',
    'html': 'html/**/*.html',
    'css': 'css/**/*.css',
    'sass': 'sass/**/*.{sass, scss}',
    'coffee': 'coffee/**/*.coffee',
};


/*
gulp.task('test', function (cb) {

    gulp.src([filefolder.js])
        .pipe(istanbul()) // Covering files
        .pipe(istanbul.hookRequire()) // Force `require` to return covered files
        .on('finish', function () {
            console.log(12341234);
            gulp.src(filefolder.test)
            .pipe(mocha({
                reporter: 'xunit-file'
            }))
            //.pipe(mocha());
            .pipe(istanbul.writeReports()) // Creating the reports after tests runned
            .on('end', cb);
        });
});*/

/*
gulp.task('test', function () {
    return gulp.src('js/apple.js')
      // Right there
      .pipe(istanbul({includeUntested: true}))
      .on('end', function () {
        gulp.src('test_mocha/apple1.js')
          
          .pipe(istanbul.writeReports({
            dir: './assets/unit-test-coverage',
            reporters: [ 'lcov' ],
            reportOpts: { dir: './assets/unit-test-coverage'}
          }))
          .pipe(mocha({reporter: 'spec'}));
      });
  });
*/
gulp.task('test', function (cb) {
  return gulp.src([filefolder.js])
      .pipe(istanbul({includeUntested: true}))
      .pipe(istanbul.hookRequire())
      .on('finish', function() {
          gulp.src([filefolder.test])
          .pipe(plumber())
          .pipe(mocha({
            reporter: 'xunit-file'
          }))
          .pipe(istanbul.writeReports({
            dir: './coverage',
            reportOpts: {
              dir: './coverage'
            },
          }));
      });
});


/*
gulp.task('js', ['js-beautify', 'js-hint']);
gulp.task('html', ['html-beautify', 'html-hint']);
gulp.task('css', ['css-beautify', 'css-hint']);
gulp.task('sass', ['compass']);
gulp.task('default', ['js', 'html', 'css', 'sass', 'coffee']);
gulp.task('livereload', ['browser-sync', 'default']);
gulp.task('test', ['browser-sync', 'test-js', 'test-html', 'default']);
*/