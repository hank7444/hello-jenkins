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
var mochaPhantomJS = require('gulp-mocha-phantomjs');

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


// 測試nodejs模組與測試coverage
/*
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
*/




// 測試是否web頁面與nodejs測試可以同時測試, 不用分兩種寫法
/* 範例
gulp.task('test', function () {
  return gulp.src('./tests/jquery.modal.html')
  .pipe(plumber())
  .pipe(mochaPhantomJS({ 
    webSecurityEnabled: false, 
    outputEncoding: 'utf8', 
    localToRemoteUrlAccessEnabled: true,
    reporter: 'xunit', 
    dump:'test.xml'
  }))
  .pipe(notify({ message: 'tests finished'}))
  .on('error', handleError);
});
*/


function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}


// 一般網頁用的js模組 + 有DOM模組 testing
// 遇到問題, 產生的xunit.xml會一直被覆蓋
gulp.task('test', function() {
    return gulp.src('./test_mocha_html/**/*.html')
        .pipe(plumber())
        .pipe(mochaPhantomJS({
            webSecurityEnabled: false,
            outputEncoding: 'utf8',
            localToRemoteUrlAccessEnabled: true,
            reporter: 'xunit',
            dump: 'xunitDOM.xml'
        }))
    //.pipe(notify({ message: 'tests finished'}))
    .on('error', handleError);
});


// nodejs或是純js, 無DOM testing + coverage
gulp.task('test-pure', function(cb) {
    return gulp.src('./js/**/*.js')
        .pipe(istanbul({
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire())
        .on('finish', function() {
            //process.env.XUNIT_FILE = 'aaaxunit.xml';
            gulp.src('./test_mocha/**/*.js')
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

// 一般網頁用的js模組 + 有DOM模組 testing + coverage
/*
    混在一起寫的缺點, 因為有判斷是node環境或其他環境的code, 這部分測試沒寫到所以coverage不會100%
    另外如果有用到node的原生函式, 也不能用photomJS來跑, 會直接壞掉, 所以還是非DOM與DOM的測試拆開來測?
*/
gulp.task('coverage', function() {

    return gulp.src('./js/**/*.js')
        .pipe(istanbul({
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire())
        .on('finish', function() {

            // 用PhantomJS做測試

            gulp.src('./test_mocha_html/**/*.html')
                .pipe(plumber())
                .pipe(mochaPhantomJS({
                    webSecurityEnabled: false,
                    outputEncoding: 'utf8',
                    localToRemoteUrlAccessEnabled: true,
                    //reporter: 'xunit', 
                    //dump:'xunit.xml'
                }))
                .on('error', handleError);

            // 計算coverage
            gulp.src('./test_mocha_html/script/**/*.js')
                .pipe(plumber())
                .pipe(mocha())
                .pipe(istanbul.writeReports({
                    dir: './coverage',
                    reportOpts: {
                        dir: './coverage'
                    },
                }));
        });
});


gulp.task('test-all', ['test', 'test-pure']);

/*
gulp.task('js', ['js-beautify', 'js-hint']);
gulp.task('html', ['html-beautify', 'html-hint']);
gulp.task('css', ['css-beautify', 'css-hint']);
gulp.task('sass', ['compass']);
gulp.task('default', ['js', 'html', 'css', 'sass', 'coffee']);
gulp.task('livereload', ['browser-sync', 'default']);
gulp.task('test', ['browser-sync', 'test-js', 'test-html', 'default']);
*/
