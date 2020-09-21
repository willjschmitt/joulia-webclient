'use strict';

const
    gulp       = require('gulp'),
    ts         = require('gulp-typescript'),
    tslint     = require('gulp-tslint'),
    del        = require('del'),
    karma      = require('karma'),
    gulpHtml2js = require('gulp-html2js'),
    browserify = require("browserify"),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    gulpCoveralls  = require('gulp-coveralls');

const { series, parallel } = require('gulp');

const tsProject = ts.createProject({
    // allowSyntheticDefaultImports: true,
    // sourceMap: true,
    // declaration: false,
    module: "commonjs",
    moduleResolution: "node",
    // emitDecoratorMetadata: true,
    // experimentalDecorators: true,
    target: "es2015",
    // typeRoots: [
    //     "node_modules/@types"
    // ],
    // lib: [
    //     "es2015",
    //     "dom",
    //     "esnext.asynciterable"
    // ],
    // sourceType: "module"
});


const srcDir = './src/';
const tmpDir = './temp/';
const distDir = './dist/';
const staticDir = './dist/static/';

const srcGlob = srcDir + '**/**.ts';
const htmlGlob = srcDir + '*.html';
const cssGlob = srcDir + '**/**.css';
const imgGlob = srcDir + 'img/**/*.*';

// Removes temp and dist directories.
function clean(cb) {
  del([tmpDir], function(){
    del([distDir], cb);
  });
}
exports.clean = clean;

// Runs tslint on the original source TypeScript files.
function lint () {
  return gulp.src(srcGlob)
             .pipe(tslint({
                 formatter: "verbose"
             }))
             .pipe(tslint.report());
}
exports.lint = lint;

// Builds HTML template files into a joulia.templates Angular module at
// temp/joulia.js.
function html2js() {
  return gulp.src('src/**/**.tpl.html')
             .pipe(gulpHtml2js('templates.js', {
                 adapter: 'angular',
                 base: 'src',
                 name: 'app.templates'
             }))
             .pipe(gulp.dest(tmpDir));
}

// Compiles TypeScript source files in src/ to temp/js directory.
function tsc() {
  return gulp.src(srcGlob)
             .pipe(tsProject())
             .js.pipe(gulp.dest(tmpDir));
}

function bundleInternalCss() {
  return  browserify({
        debug: true,
        transform: ['browserify-css'],
        entries: ['./src/css/joulia.js'],
    })
    .bundle()
    .pipe(source('joulia.css.js'))
    .pipe(buffer())
    .pipe(gulp.dest(staticDir));
}

function bundlePublicCss() {
  return  browserify({
        debug: true,
        transform: ['browserify-css'],
        entries: ['./src/css/public.js'],
    })
    .bundle()
    .pipe(source('public.css.js'))
    .pipe(buffer())
    .pipe(gulp.dest(staticDir));
}
exports.bundlePublicCss = bundlePublicCss;

// Build task compiles TypeScript and HTML templates into JS in the temp/js
// directory.
const build = parallel(tsc, html2js);
exports.build = build;

// Browersifies TypeScript compiled files and HTML templates into a single JS
// bundle.js file.
const bundleInternal = series(
    parallel(build, bundleInternalCss),
    function bundleInternal() {
        return browserify({
            debug: true,
            entries: ['./temp/joulia-webclient.js'],
        })
            .bundle()
            .pipe(source('joulia-webclient.js'))
            .pipe(buffer())
            .pipe(gulp.dest(staticDir));
    }
);

const bundlePublic = series(
    parallel(build, bundlePublicCss),
    function bundlePublic() {
        return browserify({
            debug: true,
            entries: ['./temp/public.js'],
        })
            .bundle()
            .pipe(source('public.js'))
            .pipe(buffer())
            .pipe(gulp.dest(staticDir));
    }
);
exports.bundlePublic = bundlePublic;

function copyHtml() {
  return gulp.src(htmlGlob)
             .pipe(gulp.dest(staticDir));
}

function copyCss() {
  return gulp.src(cssGlob)
             .pipe(gulp.dest(staticDir));
}

function copyImg() {
  return gulp.src(imgGlob)
             .pipe(gulp.dest(staticDir + 'img/'));
}

const copyApp = parallel(copyHtml, copyCss, copyImg);

const bundle = series(bundleInternal, bundlePublic, copyApp);
exports.bundle = bundle;

// Builds intermediate JS source and passes it to Karma for unit testing.
const test = series(
    build,
    function test(cb) {
      new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
      }, cb).start();
    });
exports.test = test;

const coveralls = series(
    test, function coveralls() {
      gulp.src('coverage/**/lcov.info')
          .pipe(gulpCoveralls());
    });

const ci = parallel(test, coveralls);
exports.ci = ci;

exports.default = parallel(test, bundle);

exports.watch = series(
    exports.default,
    function watch() {
      gulp.watch(srcDir + '**/*.*', ['test', 'bundle']);
      gulp.watch('./karma.conf.js', ['test', 'bundle']);
    });
