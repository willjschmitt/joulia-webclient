module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-karma-coveralls');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default',
      ['eslint', 'build', 'karma:unit']);
  grunt.registerTask('build', ['clean']);
  grunt.registerTask('release', [
    'clean', 'eslint', 'html2js', 'karma:release', 'concat', 'copy:assets',
    'copy:vendor',
  ]);

  grunt.registerTask('test', ['karma:travis', 'coveralls'])

  grunt.initConfig({
    distDir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    src: {
      js: [
        'src/joulia-webclient.js',
        // Need to load module definitions, first.
        'src/**/*.module.js',
        'src/**/!(*.module|*.spec).js',
      ],
      html2JsTemplates: ['<%= distDir %>/templates/**/*.js'],
      tpl: ['src/**/*.tpl.html'],
      bowerJs: [
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
      ],
      vendorJs: [
        'vendor/materialRipple/jquery.materialRipple.js',
        'vendor/snackbar/jquery.snackbar.js',
        'vendor/toasts/jquery.toasts.js',
        'vendor/subheader/jquery.subheader.js',
        'vendor/linearProgress/jquery.linearProgress.js',
        'vendor/circularProgress/jquery.circularProgress.js',
        'vendor/speedDial/jquery.speedDial.js',
        'vendor/simplePieChart/jquery.simplePieChart.js',
        'vendor/peity/jquery.peity.min.js',
      ],
      vendorCss: [
        'vendor/bemat-admin/css/bootstrap.css',
        'vendor/bemat-admin/css/themes/theme-default/bemat-admin.css',
        'vendor/bemat-admin/vendor/google-code-prettify/prettify-tomorrow.css',
        'vendor/bemat-admin/vendor/nvd3/nv.d3.css',
      ],
      tests: ['src/**/*.spec.js']
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['<%= src.js %>'],
        dest: 'build/<%= pkg.name %>.min.js',
      }
    },
    clean: ['<%= distDir %>/*'],
    karma: {
      unit: {
        configFile: 'karma.conf.js',
      },
      release: {
        configFile: 'karma.conf.js',
        singleRun: true,
      },
      travis: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS2'],
      },
    },
    eslint: {
      target: ['<%= src.js %>'],
    },
    html2js: {
      joulia: {
        options: {
          base: 'src'
        },
        src: ['<%= src.tpl %>'],
        dest: '<%= distDir %>/templates/joulia.js',
        module: 'joulia.templates',
      },
    },
    concat: {
      dist: {
        src: ['<%= src.html2JsTemplates %>', '<%= src.js %>'],
        dest: '<%= distDir %>/<%= pkg.name %>.js',
      },
      vendor: {
        src: ['<%= src.bowerJs %>', '<%= src.vendorJs %>'],
        dest: '<%= distDir %>/vendor.js',
      },
      vendorCss: {
        src: ['<%= src.vendorCss %>'],
        dest: '<%= distDir %>/vendor.css',
      },
      index: {
        src: ['src/index.html'],
        dest: '<%= distDir %>/index.html',
        options: {
          process: true,
        },
      },
    },
    copy: {
      assets: {
        files: [
          {
            dest: '<%= distDir %>',
            src: ['img/**'],
            cwd: 'src/',
            expand: true,
          },
        ],
      },
      vendor: {
        files: [
          {
            dest: '<%= distDir %>',
            src: ['vendor/**/*.png', 'bower_components/**/*.png'],
            expand: true,
          },
        ],
      },
    },
    coveralls: {
      options: {
        debug: true,
        coverageDir: 'coverage',
        force: true,
        recursive: true
      }
    }
  });

};
