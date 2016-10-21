/*
 * Provides init.js as Grunt task
 *
 * Author(s):  Jonathan "Yoni" Knoll
 * Version:    0.3.0
 * Date:       2016-10-21
 *
 */

module.exports = function( grunt ) {
  'use strict';

  grunt.registerTask('init', 'Initialize a new Daqstaq project', function(appName) {

    var colors = require('colors');
    var paths =  grunt.config('meta').dir;

    if(!appName) {
      grunt.fail.fatal('\n\nYou need to specify a valid application name!\n');
    }

    grunt.file.expand([
      'bower.json',
      'package.json'
    ]).forEach(function(f) {
      var json = grunt.file.readJSON(f);
      json.name = appName;
      json.description = appName;
      json.version = '0.1.0';
      json.repository.url = json.repository.url.replace(/daqstaq/g, appName);
      if(typeof json.homepage!=='undefined') {
        json.homepage = json.homepage.replace(/daqstaq/g, appName);
      }
      grunt.file.write(f, JSON.stringify(json, null, 2));
    });

    grunt.file.copy(paths.templates.commonJs, paths.app + '/common.js', {
      process: function(tmpl) {
        return grunt.template.process(tmpl, {data: {
          name: appName,
          date: grunt.template.today('yyyy-mm-dd'),
        }});
      }
    });

    grunt.file.copy(paths.templates.configJs, paths.app + '/config.js', {
      process: function(tmpl) {
        return grunt.template.process(tmpl, {data: {
          name: appName,
          date: grunt.template.today('yyyy-mm-dd'),
        }});
      }
    });

    var readMe = grunt.file.read('README.md');
    grunt.file.write('README.md', readMe.replace(/(# Necromancy v).*/, '$1' +  '0.1.0'));

  });

};
