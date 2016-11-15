/*
 * Provides generate:page to generate Grunt Task
 *
 * Author(s):  Jonathan "Yoni" Knoll
 * Version:    0.5.0
 * Date:       2016-11-15
 *
 */

module.exports = function(grunt) {
  'use strict';

  var colors = require('colors');
  var _ = require('lodash');
  var helpers = require('../common/helpers')(grunt);
  var paths = grunt.config('meta').dir;

  var f, files, dest, title, name, hasData;
  
  dest = grunt.option('name').replace(/^\/*|\/*$/g, '');

  title = helpers.checkName({
    name: dest.replace(/.*\//, ''),
    scaffold: 'page',
    duplicates: true
  });

  name = _.kebabCase(title);
  hasData = this.flags['with-data'] || this.flags['with-data'] || this.flags['data'];

  // this allows for overriding of templates using options
  Object.keys(paths.templates.page).forEach(function(t) {
    if(grunt.option(t) && grunt.file.exists(grunt.option(t))) {
      paths.templates.page[t] = grunt.option(t);
    }
  });

  // This is the data that will ultimately get converted into the component's pattern.json
  var pageData = {
    project: grunt.config('pkg').name,
    title: title,
    name: name,
    safeName: _.camelCase(name),
    dest: dest,
    relPath: _.repeat('../', dest.replace(/[^\/*]/g, '').length),
    meta: {
      author: helpers.getGitName(),
      description: [
        grunt.option('description') ? grunt.option('description') : 'Please provide a description for your page.'
      ],
      displayName: title,
      created_at: grunt.template.today('yyyy-mm-dd')
    },
    files: {
      less: name + '.less'
    }
  };

  // these two files will always get generated
  files = {
    html: {
      src: paths.templates.page.html,
      dest: [paths.app, dest, 'index.html'].join('/')
    },
    less: {
      src: paths.templates.page.less,
      dest: [paths.app, dest, name + '.less'].join('/')
    }
  };

  files['hbs'] = {
    src: paths.templates.page.hbs,
    dest: [paths.app, dest, name + '.hbs'].join('/')
  };

  // add a script file & add it to the page data
  files['js'] = {
    src: paths.templates.page.js,
    dest: [paths.app, dest, name + '.js'].join('/')
  };

  grunt.file.mkdir([paths.app, dest].join('/'));

  // generate the files
  helpers.generateFiles({
    scaffold: 'page',
    files: files,
    data: pageData,
    isForced: grunt.option('force')
  });

};
