// Karma configuration
// Generated on Sat Mar 25 2017 11:30:11 GMT-0700 (Pacific Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // Third-party libraries loaded by bower.
      'node_modules/jquery/dist/jquery.js',
      'node_modules/jquery-ui-dist/jquery-ui.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
      'node_modules/ui-select/dist/select.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-resource/angular-resource.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      'node_modules/@uirouter/angularjs/release/angular-ui-router.js',
      'node_modules/angular-websocket/dist/angular-websocket.js',
      'node_modules/angular-websocket/dist/angular-websocket-mock.js',
      'node_modules/perfect-scrollbar/dist/perfect-scrollbar.js',
      'node_modules/ui-select/dist/select.js',
      'node_modules/d3/d3.js',
      'node_modules/nvd3/build/nv.d3.js',
      'node_modules/underscore/underscore.js',
      'node_modules/moment/moment.js',
      'node_modules/screenfull/dist/screenfull.js',
      'node_modules/flexslider/jquery.flexslider-min.js',
      'node_modules/owl.carousel/dist/owl.carousel.js',

      // Bower components.
      // TODO(willjschmitt): Remove these as soon as posible moving to a
      // browserified bundle.
      'bower_components/Modernizr/modernizr.custom.js',
      'bower_components/iCheck/icheck.js',

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
      'temp/js/test/input-checkers.js',

      // Need to manually load the modules for now to make sure they are
      // available for when adding the controllers, etc., to them.
      // TODO(will): Figure out a better way to not have to manually include
      // the module definitions.
      'temp/js/joulia-webclient.js',
      'temp/js/common/common.module.js',
      'temp/js/public/public.module.js',
      'temp/js/dashboard/dashboard.module.js',
      'temp/js/recipes/recipes.module.js',
      'temp/js/brewhouse/brewhouse.module.js',
      'temp/js/profile/profile.module.js',

      // The main source files.
      'temp/**/*.js',
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // preprocessors: {
    //   'dist/**/*.js': ['coverage'],
    // },

    preprocessors: {
      'temp/**/*.js': [ 'browserify' ]
    },

    browserify: {
      debug: true,
      //transform: [ 'brfs' ]
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
    autoWatch: false,


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
