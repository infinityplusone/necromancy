/*
 * Provides add-template.js as Grunt task
 *
 * Author(s):  Jonathan "Yoni" Knoll
 * Version:    0.1.0
 * Date:       2016-09-23
 *
 */

module.exports = function( grunt ) {
  'use strict';

  grunt.registerTask('add-template', 'Define your own template for generated files', function(template) {

    var colors = require('colors');
    var paths =  grunt.config('meta').dir;
    var location = grunt.option('location');
    var forced = grunt.option('force');

    if(!template || !location) {
      grunt.fail.fatal('\n\nYou need to specify a template and location!\n');
    }

    if(grunt.file.exists(location)) {
      if(!forced) {
        grunt.fail.warn('\n\tIt looks like this ' + colors.cyan(location) + colors.yellow(' already exists!\n\n'));
      }
      else {
        console.log(colors.yellow('\tIt looks like ') + colors.cyan(location) + colors.yellow(' already exists!'));
      }
    }
    if(forced) {
      console.log(colors.white.bold('\n Used --force, continuing.\n'));
    }
    grunt.file.copy(grunt.config('meta.dir.templates.' + template), location);
    console.log('\nAdd this line to your Gruntfile.js:\n\n\t' + colors.green.bold('daqstaq.useTemplate(\'' + template + '\', \'' + location + '\');'));
  });

};
