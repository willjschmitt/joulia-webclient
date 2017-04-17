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

  grunt.registerTask('default', ['cleanbuild', 'watch']);
  grunt.registerTask('release', ['build']);
  grunt.registerTask('cleanbuild', [
    'clean', 'build', 'copy:assets', 'copy:vendor']);
  grunt.registerTask('build', [
    'eslint', 'html2js', 'karma:release', 'concat']);

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
            dest: '<%= distDir %>/static',
            src: ['vendor/**', 'bower_components/**'],
            expand: true,
          },
        ],
      },
    },
    watch: {
      scripts: {
        files: ['<%= src.js %>', '<%= src.tpl %>', 'src/index.html'],
        tasks: ['build'],
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
