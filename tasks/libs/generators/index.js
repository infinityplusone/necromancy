/*
 * Provides generate:index to generate Grunt Task
 *
 * Author(s):  Jonathan "Yoni" Knoll
 * Version:    0.5.2
 * Date:       2016-12-09
 *
 */

module.exports = function(grunt) {
  'use strict';

  var colors = require('colors');
  var _ = require('lodash');
  var path = require('path');
  var fs = require('fs');

  var helpers = require('../common/helpers')(grunt);
  var paths = grunt.config('meta').dir;
  var dest = grunt.option('file') ? grunt.option('file') : './index.html';

  var data = {
    title: grunt.config('pkg').title,
    pages: []
  };

  if(grunt.option('start')) {
    data.refresh = '<meta http-equiv="refresh" content="0;url=app/' + grunt.option('start') + '" />';
  }

  grunt.file.expand([
    paths.app + '/**/index.html'
  ]).forEach(function(f) {
    var name = path.dirname(f);
    var title = path.basename(name).replace(/\W+/gim, ' ');
    data.pages.push('        <li>\n          <a href="' + f + '">' + title + '</a> <small>(' + name + ')</small>\n          <time>Last modified: ' + grunt.template.date(fs.statSync(f).mtime, 'mediumDate') + ' @ ' + grunt.template.date(fs.statSync(f).mtime, 'mediumTime') + '</time>\n        </li>');
  });

  data.pages = data.pages.join('\n');
  helpers.processTemplate(paths.templates.index, dest, data);

};