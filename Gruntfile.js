module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-karma-coveralls');
  grunt.loadNpmTasks('grunt-html2js');

  grunt.registerTask('default',
      ['eslint', 'build', 'karma:unit']);
  grunt.registerTask('build', ['clean']);
  grunt.registerTask('release',
      ['clean', 'eslint', 'html2js', 'karma:release']);

  grunt.registerTask('test', ['karma:travis', 'coveralls'])

  grunt.initConfig({
    distDir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    src: {
      js: ['src/**/*.js'],
      tpl: {
        brewhouse: ['src/brewhouse/**/*.tpl.html'],
        common: ['src/common/**/*.tpl.html'],
        dashboard: ['src/dashboard/**/*.tpl.html'],
        recipes: ['src/recipes/**/*.tpl.html']
      },
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
      brewhouse: {
        options: {
          base: 'src/brewhouse'
        },
        src: ['<%= src.tpl.brewhouse %>'],
        dest: '<%= distDir %>/templates/brewhouse.js',
        module: 'templates.brewhouse',
      },
      common: {
        options: {
          base: 'src/common'
        },
        src: ['<%= src.tpl.common %>'],
        dest: '<%= distDir %>/templates/common.js',
        module: 'templates.common',
      },
      dashboard: {
        options: {
          base: 'src/dashboard'
        },
        src: ['<%= src.tpl.dashboard %>'],
        dest: '<%= distDir %>/templates/dashboard.js',
        module: 'templates.dashboard',
      },
      recipes: {
        options: {
          base: 'src/recipes'
        },
        src: ['<%= src.tpl.recipes %>'],
        dest: '<%= distDir %>/templates/recipes.js',
        module: 'templates.recipes',
      }
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
