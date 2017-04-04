module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default',
      ['eslint', 'build', 'karma:unit']);
  grunt.registerTask('build', ['clean']);
  grunt.registerTask('release',
      ['clean', 'uglify', 'eslint', 'karma:unit']);

  grunt.registerTask('test', ['karma:travis'])

  grunt.initConfig({
    distDir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    src: {
      js: ['src/**/*.js'],
      tests: ['src/**/*.spec.js'],
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
      travis: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS2'],
      },
    },
    eslint: {
      target: ['<%= src.js %>'],
    }
  });

};
