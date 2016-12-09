/*
 * Provides build.js as Grunt task
 *
 * Author(s):  Jonathan "Yoni" Knoll
 * Version:    0.5.2
 * Date:       2016-12-09
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