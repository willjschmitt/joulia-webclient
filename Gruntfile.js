module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-karma-coveralls');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask(
    'default',
    `Cleans build directory, copies vendor files, runs build. Continues to watch
     to re-build.`,
    ['cleanbuild', 'watch:build']);
  grunt.registerTask(
    'liverefresh',
    `Cleans build directory, copies vendor files, runs build. Continues to watch
     to re-buildlite. Does not run tests except for on first build.`,
    ['cleanbuild', 'watch:refresh']);

  grunt.registerTask('release', ['build']);
  grunt.registerTask('cleanbuild', [
    'clean', 'build', 'copy:vendor']);
  grunt.registerTask('build', [
    'eslint', 'html2js', 'karma:release', 'concat', 'copy:assets']);
  grunt.registerTask('buildlite', [
    'eslint', 'html2js', 'concat', 'copy:assets']);

  grunt.registerTask('test', ['eslint', 'karma:travis', 'coveralls']);
  grunt.registerTask('travisbuild', [
    'html2js', 'concat', 'copy:assets', 'copy:vendor']);



  grunt.initConfig({
    distDir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    src: {
      js: [
        'src/joulia-webclient.js',
        // Need to load module definitions, first.
        'src/**/*.module.js',
        'src/**/!(*.module|*.spec|public).js',
      ],
      css: [
        'src/css/**/*.css',
      ],
      publicJs: [
        'src/public.js',
        // Need to load module definitions, first.
        'src/**/*.module.js',
        'src/**/!(*.module|*.spec|joulia-webclient).js',
      ],
      html2JsTemplates: ['<%= distDir %>/templates/**/*.js'],
      tpl: ['src/**/*.tpl.html'],
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
      target: ['<%= src.js %>', '<%= src.publicJs %>'],
    },
    html2js: {
      joulia: {
        options: {
          base: 'src'
        },
        src: ['<%= src.tpl %>'],
        dest: '<%= distDir %>/templates/joulia.js',
        module: 'app.templates',
      },
    },
    concat: {
      dist: {
        src: ['<%= src.html2JsTemplates %>', '<%= src.js %>'],
        dest: '<%= distDir %>/static/<%= pkg.name %>.js',
      },
      index: {
        src: ['src/index.html'],
        dest: '<%= distDir %>/static/index.html',
        options: {
          process: true,
        },
      },
      publicDist: {
        src: ['<%= src.html2JsTemplates %>', '<%= src.publicJs %>'],
        dest: '<%= distDir %>/static/public.js',
      },
      publicIndex: {
        src: ['src/public_index.html'],
        dest: '<%= distDir %>/static/public_index.html',
        options: {
          process: true,
        },
      },
    },
    copy: {
      assets: {
        files: [
          {
            dest: '<%= distDir %>/static',
            src: ['img/**', 'css/**'],
            cwd: 'src/',
            expand: true,
          },
        ],
      },
      vendor: {
        files: [
          {
            dest: '<%= distDir %>/static',
            src: ['vendor/**', 'bower_components/**'],
            expand: true,
          },
        ],
      },
    },
    watch: {
      build: {
        files: [
          '<%= src.publicJs %>',
          '<%= src.js %>',
          '<%= src.css %>',
          '<%= src.tests %>',
          '<%= src.tpl %>',
          'src/index.html',
          'src/public_index.html',
        ],
        tasks: ['build'],
        options: {
          spawn: false,
        },
      },
      refresh: {
        files: [
          '<%= src.publicJs %>',
          '<%= src.js %>',
          '<%= src.css %>',
          '<%= src.tests %>',
          '<%= src.tpl %>',
          'src/index.html',
          'src/public_index.html',
        ],
        tasks: ['buildlite'],
        options: {
          spawn: false,
        },
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
