// Karma configuration
// Generated on Sat Mar 25 2017 11:30:11 GMT-0700 (Pacific Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'es6-shim'],


    // list of files / patterns to load in the browser
    files: [
      // Third-party libraries loaded by bower.
      'bower_components/jquery/dist/jquery.js',
      'bower_components/jquery-ui/jquery-ui.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-websocket/dist/angular-websocket.js',
      'bower_components/angular-websocket/dist/angular-websocket-mock.js',
      'bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.js',
      'bower_components/iCheck/icheck.js',
      'bower_components/bootstrap-select/dist/js/bootstrap-select.js',
      'bower_components/d3/d3.js',
      'bower_components/nvd3/build/nv.d3.js',
      'bower_components/underscore/underscore.js',
      'bower_components/Modernizr/modernizr.custom.js',
      'bower_components/moment/moment.js',
      'bower_components/screenfull/dist/screenfull.min.js',
      'bower_components/flexslider/jquery.flexslider-min.js',
      'bower_components/owl.carousel/dist/owl.carousel.js',

      // Third-party open-source licensed libaries.
      'vendor/materialRipple/jquery.materialRipple.js',
      'vendor/snackbar/jquery.snackbar.js',
      'vendor/toasts/jquery.toasts.js',
      'vendor/subheader/jquery.subheader.js',
      'vendor/linearProgress/jquery.linearProgress.js',
      'vendor/circularProgress/jquery.circularProgress.js',
      'vendor/speedDial/jquery.speedDial.js',
      'vendor/simplePieChart/jquery.simplePieChart.js',
      'vendor/peity/jquery.peity.min.js',

      // Third-party proprietary licensed libaries.
      //'vendor/bemat-admin/js/bemat-admin-common.js',

      // Load in test helper functions.
      'src/test/input-checkers.js',

      // Need to manually load the modules for now to make sure they are
      // available for when adding the controllers, etc., to them.
      // TODO(will): Figure out a better way to not have to manually include
      // the module definitions.
      'src/joulia-webclient.js',
      'src/common/common.module.js',
      'src/public/public.module.js',
      'src/dashboard/dashboard.module.js',
      'src/recipes/recipes.module.js',
      'src/brewhouse/brewhouse.module.js',
      'src/profile/profile.module.js',

      // The main source files.
      'src/**/*.js',

      // Template files.
      'src/**/*.html',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['coverage', 'babel'],
      'src/**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      moduleName: 'joulia.templates',
      stripPrefix: 'src/',
    },

    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: "lcov",
      dir: "coverage/"
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
