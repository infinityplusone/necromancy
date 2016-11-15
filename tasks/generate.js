/*
 * Provides generate.js as Grunt task
 *
 * Author(s):  Jonathan "Yoni" Knoll
 * Version:    0.5.0
 * Date:       2016-11-15
 *
 */

module.exports = function( grunt ) {
  'use strict';

  var colors = require('colors');
  var path = require('path');

  var makeComponent = require('./libs/generators/component');
  var makePage = require('./libs/generators/page');
  var makeIndex = require('./libs/generators/index');
  var makeSchema = require('./libs/generators/schema');

  // grunt.file.expand([
  //   'tasks/libs/generators/*.js'
  // ]).forEach(function(f) {
  //   var thing = path.basename(f, '.js');
  //   console.log(thing);
  //   grunt.registerTask('generate:' + thing, require('./libs/generators/' + thing));
  //   grunt.config('generate.' + thing, {});
  // });

  // helper task to generate components (and some other stuff)
  // Usage: grunt generate:page --name="foo" (can be either the component name or the file name)
  grunt.registerMultiTask('generate', 'Generate a bone, component, or page.', function(thing) {

    if(!this.target) {
      grunt.fail.fatal('\nWhat are you making here?\n');
    }
    // if(!grunt.config('generate.' + this.target)) {
    //   grunt.config('generate.' + this.target, {});
    // }

    // require('./libs/generators/' + this.target)(grunt);

  //   console.log(thing);

    switch(this.target) {

      case 'bone':
        grunt.task.run('bones-generate:bone');
        break;

      case 'bone-less':
        grunt.task.run('bones-generate:bone-less');
        break;

      case 'component':
        makeComponent.call(this, grunt);
        // grunt.task.run('generate:shapes');
        break;

      case 'index':
        makeIndex.call(this, grunt);
        // grunt.task.run('generate:shapes');
        break;

      case 'page':
        makePage.call(this, grunt);
        break;

      case 'schema':
        makeSchema.call(this, grunt);
        break;

      case 'shapes':
        grunt.task.run('bones-generate:shapes');
        break;

      default:
        grunt.fail.fatal('\n\n\tI don\'t know how to generate a ' + colors.cyan.bold(this.target) + colors.red('!\n\n'));
        break;

    }

  }); // generate

  grunt.config('generate.component', {});
  grunt.config('generate.page', {});

  // inherited from bones
  grunt.config('generate.bone', {});
  grunt.config('generate.index', {});
  grunt.config('generate.schema', {});
  grunt.config('generate.shapes', {});
  grunt.config('generate.bone-less', {});

};
