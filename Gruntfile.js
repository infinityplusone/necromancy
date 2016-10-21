/*
 * Necromancy Tools Gruntfile.js
 *
 * Author(s):  Jonathan "Yoni" Knoll
 * Version:    0.3.0
 * Date:       2016-10-21
 *
 */

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json')
  });

  grunt.loadTasks('tasks'); // custom tasks for necromancy

};
