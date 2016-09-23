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

  grunt.registerTask('rename', function() {
    grunt.file.expand([
      '**/bone**'
    ]).forEach(function(f) {
      if(grunt.file.isFile(f)) {
        grunt.file.write(f.replace(/bone([^\/]+)$/, 'bone$1'), grunt.file.read(f));
        grunt.file.delete(f);
      }
    });
  });


  grunt.registerTask('rebrand', function() {
    grunt.file.expand([
      '*.json',
      'qore/**',
      'tasks/**'
    ]).forEach(function(f) {
      if(grunt.file.isFile(f)) {
        var contents = grunt.file.read(f);
        if(f.indexOf('.json')>=0) {
          contents = contents
            .replace(/prodaq/gim, 'infinityplusone')
            .replace('Nasdaq Product Design', 'Jonathan \"Yoni\" Knoll');
        }
        else {
          contents = contents.replace(/prodaq/gim, 'brain');
        }
        contents = contents
                    .replace(/([bB])loq/gm, '$1one')
                    .replace(/manager/gm, 'skeleton')
                    .replace(/Manager/gm, 'Skeleton')
                    .replace(/mgr/gm, 'skel')
                    .replace(/BoneManager/gm, 'Skeleton')
                    .replace(/Qore/gm, 'Hippo')
                    .replace(/qore(-data)?/gm, 'hippo');
        
        grunt.file.write(f.replace(/bone([^\/]+)$/, 'bone$1'), contents);
        // grunt.file.delete(f);
      }
    });
  });


};
