module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['./public/js/**/*.js'],
      options: {
        esversion: 6
      }
    },
    sass: {
      dist: {
        files: {
          './public/styles/main.css': 'public/sass/main.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['./public/js/**/*.js'],
        tasks: ['jshint']
      },
      sassy: {
        files: ['./public/sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'watch']);
};
