'use strict';

var gulp       = require('gulp'),
    uglify     = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    ts         = require('gulp-typescript'),
    tslint     = require('gulp-tslint'),
    del        = require('del'),
    karma      = require('karma'),
    html2js    = require('gulp-html2js'),
    browserify = require("browserify"),
    source     = require('vinyl-source-stream'),
    tsify      = require("tsify");

var tsProject = ts.createProject({
    removeComments : true,
    //noImplicitAny : true,
    target : 'es5',
    module : 'commonjs',
});


const srcDir = './src/';
const tmpDir = './temp/';
const distDir = './dist/';

const tmpJsDir = tmpDir + 'js/',
      distJsDir = distDir +'js/';

const tmpJsGlob = tmpDir + '**/**.js';
const tmpTestGlob = tmpDir + '**/**.spec.js';

const srcGlob = srcDir + '**/**.ts';
const srcTestGlob = srcDir + '**/**.spec.ts';

// Removes temp and dist directories.
gulp.task('clean', function (cb) {
  del([tmpDir], function(){
    del([distDir], cb);
  });
});

// Runs tslint on the original source TypeScript files.
gulp.task('lint', function() {
  return gulp.src(srcGlob)
             .pipe(tslint({
                 formatter: "verbose"
             }))
             .pipe(tslint.report());
});

// Builds HTML template files into a joulia.templates Angular module at
// temp/joulia.js.
gulp.task('html2js', function () {
  return gulp.src('src/**/**.tpl.html')
             .pipe(html2js('joulia.js', {
                 adapter: 'angular',
                 base: 'src',
                 name: 'joulia.templates'
             }))
             .pipe(gulp.dest(tmpJsDir));
});

// Compiles TypeScript source files in src/ to temp/js directory.
gulp.task('tsc', ['lint'], function () {
  return gulp.src(srcGlob)
             .pipe(tsProject())
             .js.pipe(gulp.dest(tmpJsDir));
})

// Build task compiles TypeScript and HTML templates into JS in the temp/js
// directory.
gulp.task('build', ['tsc', 'html2js'], function() {});

// Browersifies TypeScript compiled files and HTML templates into a single JS
// bundle.js file.
gulp.task('bundle', ['build'], function () {
  return browserify({
        debug: true,
        entries: ['./temp/js/joulia-webclient.js'],
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(distJsDir));
});

// Builds intermediate JS source and passes it to Karma for unit testing.
gulp.task('test', ['build'], function(cb) {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, cb).start();
});

gulp.task('default', ['test', 'bundle']);