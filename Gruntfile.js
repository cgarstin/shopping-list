module.exports = function(grunt) {

  grunt.initConfig({
    browserSync: {
      dev: {
        bsFiles: {
          src : [ 'css/styles.css',
          '*.html',
          '**/*.html',
          'js/*.js',
          'js/**/*.js'
          ]
        },
        options: {
          server: './'
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('default', ['browserSync']);

};
