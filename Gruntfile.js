/*
 * Necromancy Tools Gruntfile.js
 *
 * Author(s):  Jonathan "Yoni" Knoll
 * Version:    0.5.1
 * Date:       2016-11-15
 *
 */

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json')
  });

  grunt.loadTasks('tasks'); // custom tasks for necromancy

};
