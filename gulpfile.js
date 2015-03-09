"use strict";

var gulp = require('gulp-help')(require('gulp'));

gulp.task('jshint', 'JsHint check for source files.', function () {
    var jshint = require('gulp-jshint');
    return gulp.src('src/**/*.js')
        .pipe(jshint({
            lookup : true
        }))
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('cleanup', 'Remove dist folder and its content.', function (callback) {
    var del = require('del');
    del('dist', callback);
});

gulp.task('build:script', 'Concatenate script files into one file and prepend the banner.', function () {
    var replace = require('gulp-replace'),
        concat = require('gulp-concat'),
        wrap = require('gulp-wrap'),
        header = require('gulp-header'),
        pkg = require('./package.json'),
        fs = require('fs'),
        banner = fs.readFileSync('banner.txt', 'utf8');
    return gulp.src([
        'src/setup.js',
        'src/init.js',
        'src/data-trim.js',
        'src/attr-disabled.js',
        'src/attr-required.js',
        'src/type-pattern.js',
        'src/attr-pattern.js',
        'src/attr-length.js',
        'src/type-quantity.js',
        'src/type-file.js',
        'src/module.js'
    ])
        .pipe(replace(/\s*\/\*global\s.*?\*\//ig, ''))
        .pipe(replace(/\s*(["'])use strict\1;/ig, ''))
        .pipe(concat(pkg.name + '-' + pkg.version + '.js'))
        .pipe(wrap({src : 'src/capsule.txt'}))
        .pipe(header(banner, {pkg : pkg}))
        .pipe(gulp.dest('dist'));
});

gulp.task('build:compress', 'Compress script files.', function () {
    var sourcemaps = require('gulp-sourcemaps'),
        uglify = require('gulp-uglify'),
        rename = require('gulp-rename');
    return gulp.src('dist/**/*.js')
        .pipe(rename({
            suffix : '.min'
        }))
        .pipe(sourcemaps.init())
        .pipe(uglify({
            output : {
                comments : /@preserve|@license|@cc_on/i
            }
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', 'Build distribution content', function (callback) {
    var runSequence = require('run-sequence');
    runSequence(
        ['jshint', 'cleanup'],
        ['build:script'],
        ['build:compress'],
        callback
    );
});

gulp.task('update:node', 'Update npm modules.', function (callback) {
    var exec = require('child_process').exec;
    exec('npm update', callback);
});

gulp.task('update:bower', 'Update bower components.', function (callback) {
    var exec = require('child_process').exec;
    exec('bower update', callback);
});

gulp.task('update', 'Update npm and bower dependencies.', [
    'update:node',
    'update:bower'
]);

gulp.task('version', 'Latest project version', function () {
    var bower = require('./bower.json');
    console.log('Version:', bower.version);
});