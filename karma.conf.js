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
      // TODO(willjschmitt): Remove these when figuring out how to import them
      // correctly.
      'node_modules/jquery/dist/jquery.js',
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

      // The main source files.
      'temp/**/*.js',
    ],


    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'temp/**/*.js': [ 'browserify', 'coverage' ]
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
    browsers: ['PhantomJS2'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
