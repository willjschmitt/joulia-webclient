module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['jshint','build','karma:unit']);
  grunt.registerTask('build', ['clean']);
  grunt.registerTask('release', ['clean','uglify','jshint','karma:unit']);

  grunt.initConfig({
    distDir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    src: {
      js: ['src/**/*.js']
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['<%= src.js %>'],
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      files: ['Gruntfile.js', '<%= src.js %>'],
      options: {
        curly: true,
      }
    }
  });

};
