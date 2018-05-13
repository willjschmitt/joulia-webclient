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
    //transform   = require('vinyl-transform'),
    tsify      = require("tsify");

var tsProject = ts.createProject({
    removeComments : true,
    //noImplicitAny : true,
    target : 'es5',
    module : 'commonjs',
    declarationFiles : true
});


const srcDir = './src/';
const tmpDir = './temp/';
const distDir = './dist/';

const tmpJsDir = tmpDir + 'js/',
      distJsDir = distDir +'js/';

const tmpJsGlob = tmpDir + '**/**.js';
const tmpTestGlob = tmpDir + '**/**.spec.js';
const distTestGlob = distDir + '**/**.spec.js';

const srcGlob = srcDir + '**/**.ts';
const srcTestGlob = srcDir + '**/**.spec.ts';

// {
//     "compilerOptions": {
//         "module": "CommonJS",
//         //"noImplicitAny": true,
//         //"removeComments": true,
//         //"preserveConstEnums": true,
//         //"outDir": "ts_compiled",
//         //"sourceMap": true
//     },
//     "include": [
//         "src/**/*.ts"
//     ],
//     "exclude": [
//         "node_modules",
//         //"**/*.spec.ts"
//     ]
// }

gulp.task('clean', function (cb) {
  del([tmpDir], function(){
    del([distDir], cb);
  });
});

gulp.task('lint', function() {
  return gulp.src(srcGlob)
             .pipe(tslint({
                 formatter: "verbose"
             }))
             .pipe(tslint.report());
});

gulp.task('html2js', function () {
  return gulp.src('src/**/**.tpl.html')
             .pipe(html2js('joulia.js', {
                 adapter: 'angular',
                 base: 'src',
                 name: 'joulia.templates'
             }))
             .pipe(gulp.dest(tmpJsDir));
});

gulp.task('tsc', ['lint'], function () {
  return gulp.src(srcGlob)
             .pipe(tsProject())
             .js.pipe(gulp.dest(tmpJsDir));
})

gulp.task('build', ['tsc', 'html2js'], function() {});

gulp.task('bundle', ['build'], function () {
  // return gulp.src(tmpJsDir + '**/**.js')
  //            .pipe(browserify({
  //               insertGlobals : true,
  //               debug: true,
  //             }))
  //            //.pipe(sourcemaps.init({ loadMaps: true }))
  //            //.pipe(uglify())
  //            //.pipe(sourcemaps.write('./'))
  //            .pipe(gulp.dest(distJsDir));

  return browserify({
        debug: true,
        entries: ['./temp/js/common/rtd-form.directive.spec.js'],
    })
    //.plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(distJsDir));

  // transform regular node stream to gulp (buffered vinyl) stream
  // var browserified = transform(function(filename) {
  //     var b = browserify({ entries: filename, debug: true });
  //     return b.bundle();
  // });

  // return gulp.src('./temp/**/**.spec.js')
  //            .pipe(browserified)
  //            .pipe(gulp.dest('./dist/js'));
});

gulp.task('test', ['build'], function(cb) {
  new karma.Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, cb).start();

  // gulp.src(distTestGlob)
  //     .pipe(karma({
  //        configFile: 'karma.conf.js',
  //        action: 'run'
  //      }))
  //      .on('end', cb)
  //      .on('error', function(err) {
  //        // Make sure failed tests cause gulp to exit non-zero
  //        throw err;
  //      });
});

gulp.task('default', ['test']);