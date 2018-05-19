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
    buffer     = require('vinyl-buffer'),
    tsify      = require("tsify"),
    coveralls  = require('gulp-coveralls');

var tsProject = ts.createProject({
    removeComments : true,
    //noImplicitAny : true,
    target : 'es5',
    module : 'commonjs',
});


const srcDir = './src/';
const tmpDir = './temp/';
const distDir = './dist/';
const staticDir = './dist/static/';

const tmpJsDir = tmpDir + 'js/';

const tmpJsGlob = tmpDir + '**/**.js';
const tmpTestGlob = tmpDir + '**/**.spec.js';

const srcGlob = srcDir + '**/**.ts';
const htmlGlob = srcDir + '*.html';
const cssGlob = srcDir + '**/**.css';
const imgGlob = srcDir + 'img/**/*.*';
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
             .pipe(html2js('templates.js', {
                 adapter: 'angular',
                 base: 'src',
                 name: 'app.templates'
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
gulp.task('bundle-internal', ['build'], function () {
  return browserify({
        debug: true,
        entries: ['./temp/js/joulia-webclient.js'],
    })
    .bundle()
    .pipe(source('joulia-webclient.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(staticDir));
});

gulp.task('bundle-public', ['build'], function () {
  return browserify({
        debug: true,
        entries: ['./temp/js/public.js'],
    })
    .bundle()
    .pipe(source('public.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(staticDir));
});

gulp.task('bundle', ['bundle-internal', 'bundle-public', 'copy-app']);

gulp.task('copy-html', function () {
  return gulp.src(htmlGlob)
             .pipe(gulp.dest(staticDir));
})

gulp.task('copy-css', function () {
  return gulp.src(cssGlob)
             .pipe(gulp.dest(staticDir));
})

gulp.task('copy-img', function () {
  return gulp.src(imgGlob)
             .pipe(gulp.dest(staticDir + 'img/'));
})

gulp.task('copy-node-modules', function () {
  const nodeGlob = './node_modules/**/**';
  return gulp.src(nodeGlob)
             .pipe(gulp.dest(staticDir + 'node_modules/'));
})

gulp.task('copy-bower-components', function () {
  const bowerGlob = './bower_components/**/**';
  return gulp.src(bowerGlob)
             .pipe(gulp.dest(staticDir + 'bower_components/'));
})

gulp.task('copy-vendor', function () {
  const vendorGlob = './vendor/**/**';
  return gulp.src(vendorGlob)
             .pipe(gulp.dest(staticDir + 'vendor/'));
})

gulp.task('copy-app',
  ['copy-html', 'copy-css', 'copy-img']);

gulp.task('copy-third-party',
  ['copy-node-modules', 'copy-bower-components', 'copy-vendor']);

// Builds intermediate JS source and passes it to Karma for unit testing.
gulp.task('test', ['build'], function(cb) {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, cb).start();
});

gulp.task('coveralls', ['test'], function() {
  gulp.src('coverage/**/lcov.info')
      .pipe(coveralls());
});

gulp.task('travis', ['test', 'coveralls']);

gulp.task('default', ['test', 'bundle', 'copy-third-party']);

gulp.task('watch', ['default'], function() {
  gulp.watch(srcDir + '**/*.*', ['test', 'bundle'])
});
