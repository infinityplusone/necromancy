/*
 * Provides destroy.js as Grunt task
 *
 * Author(s):  Jonathan "Yoni" Knoll
 * Version:    0.5.3
 * Date:       2017-03-21
 *
 */

module.exports = function( grunt ) {
  'use strict';

  var colors = require('colors');
  var destroyComponent = require('./libs/destroyers/component');
  var destroyPage = require('./libs/destroyers/page');

  // helper task to destroy generated objects
  // Usage: grunt destroy:page --name="foo" (can be either the page name or the file name)

  grunt.registerMultiTask('destroy', 'Destroy a bone, component, or page.', function() {

    if(!this.target) {
      grunt.fail.fatal('\nWhat are you trying to destroy?\n');
    }

    switch(this.target) {

      case 'bone':
      case 'component':
        destroyComponent.call(this, grunt);
        grunt.task.run('generate:shapes');
        break;

      case 'page':
        destroyPage.call(this, grunt);
        break;

      default:
        grunt.fail.fatal('\n\n\tI don\'t know how to destroy a `' + colors.cyan.bold(this.target) + '`!\n\n');
        break;

    }

  }); // destroy

  grunt.config('destroy.bone', {});
  grunt.config('destroy.component', {});
  grunt.config('destroy.page', {});

};
