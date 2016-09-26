/*
 * Necromancy Tools Gruntfile.js
 *
 * Author(s):  Jonathan "Yoni" Knoll
 * Version:    0.1.0
 * Date:       2016-09-23
 *
 */

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json')
  });

  grunt.loadTasks('tasks'); // custom tasks for necromancy

};
