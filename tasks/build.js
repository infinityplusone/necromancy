/*
 * Provides build.js as Grunt task
 *
 * Author(s):  Jonathan "Yoni" Knoll
 * Version:    0.5.3
 * Date:       2017-03-21
 *
 */

module.exports = function( grunt ) {
  'use strict';

  grunt.registerTask('build', function() {
    if(grunt.task.exists('requirejs')) {
      grunt.task.run('requirejs');
    }
    grunt.file.write('VERSION', grunt.config('pkg').version);
  });

};