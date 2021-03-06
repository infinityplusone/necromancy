/*
 * Provides prep-build.js as Grunt task
 *
 * Author(s):  Jonathan "Yoni" Knoll
 * Version:    0.5.3
 * Date:       2017-03-21
 *
 */
module.exports = function( grunt ) {
  'use strict';

  grunt.registerTask('prep-build', 'Removes dynamic cache-busting from requireJS config files.', function() {
    var d = (new Date()).getTime();
    var f = 'app/config.js';
    grunt.file.write(f, grunt.file.read(f).replace(/urlArgs: 'bust='.*/g, 'urlArgs: \'bust=' + d + '\','));
  });

};