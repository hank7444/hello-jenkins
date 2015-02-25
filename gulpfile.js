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

var filefolder = {
    'js': 'js/**/*.js',
    'test': 'test_mocha/**/*.js',
    'html': 'html/**/*.html',
    'css': 'css/**/*.css',
    'sass': 'sass/**/*.{sass, scss}',
    'coffee': 'coffee/**/*.coffee',
};



gulp.task('test', function() {
    gulp.src(filefolder.test, {read: false})
        .pipe(mocha({
            reporter: 'xunit-file'
        }));
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