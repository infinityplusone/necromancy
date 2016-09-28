/*
 * Loads tasks from other modules for use by Necromancy
 *
 * Author(s):  Jonathan "Yoni" Knoll
 * Version:    0.1.0
 * Date:       2016-09-23
 *
 */

module.exports = function(grunt, dir) {
  'use strict';

  var path = require('path');
  var colors = require('colors');

  grunt.config('collect', ['find-tables', 'copy-assets', 'less']);

  // Project configuration
  grunt.config('meta', {
    dir: {
      tasks: path.relative(dir, __dirname),
      app: './app',
      assets: './assets',
      bones: './bower_components/bones/src',
      common: './common',
      templates: {
        index: '<%=meta.dir.tasks%>/tasks/templates/index.html',
        commonJs: '<%=meta.dir.tasks%>/tasks/templates/common.js',
        configJs: '<%=meta.dir.tasks%>/tasks/templates/config.js',
        component: {
          hbs:        '<%=meta.dir.tasks%>/tasks/templates/component/component.hbs',
          js:         '<%=meta.dir.tasks%>/tasks/templates/component/component-no-template.js',
          jsTmpl:     '<%=meta.dir.tasks%>/tasks/templates/component/component-with-template.js',
          less:       '<%=meta.dir.tasks%>/tasks/templates/component/component.less',
          // component docs
          json:       '<%=meta.dir.tasks%>/tasks/templates/component/docs/pattern.json',
          markup:     '<%=meta.dir.tasks%>/tasks/templates/component/docs/component.html',
          script:     '<%=meta.dir.tasks%>/tasks/templates/component/docs/component.js'
        },
        page: {
          hbs:        '<%=meta.dir.tasks%>/tasks/templates/page/page.hbs',
          html:       '<%=meta.dir.tasks%>/tasks/templates/page/page.html',
          js:         '<%=meta.dir.tasks%>/tasks/templates/page/page.js',
          json:       '<%=meta.dir.tasks%>/tasks/templates/page/page.json',
          less:       '<%=meta.dir.tasks%>/tasks/templates/page/page.less'
        }
      }
    },
    name: grunt.config('pkg').name
  }); // meta

  grunt.config('clean', {
    bower: [
      "./bower_components/"
    ],
    generated: [
      "<%=meta.dir.assets%>/", // assets
      "<%=meta.dir.common%>/{bones.less,shapes.json}" // generated files
    ]
  }); // clean

  //Copy to copy the _resources dir (css, js, img...) over to build
  grunt.config('copy', {
    options: {
      verbose: true
    },
    assets: {
      files: [{
        expand: true,
        src: [
          '<%=meta.dir.app%>/**/*.{bmp,gif,jpg,png,svg}',
          '<%=meta.dir.bones%>/**/*.{bmp,gif,jpg,png,svg}',
          '<%=meta.dir.common%>/**/*.{bmp,gif,jpg,png,svg}',
          '!**/docs/**',
          '!**/fonts/**'
        ],
        filter: function(filepath) { // ignore documentation assets
          return !/(docs\/img|\/fonts\/)/g.test(filepath);
        },
        rename: function(dest, src) {
          dest = src.indexOf('images')>0 ? dest + '/images/' : dest + '/';
          return src.replace(/\/images\//, '/').replace(/^.*(app|common|bones|src)\//, dest);
        }, // rename
        dest: '<%=meta.dir.assets%>'
      }]
    }
  }); // copy

  grunt.config('less', {
    options: {
      paths: ['./bower_components', './common', './bower_components/bones/src'],
      modifyVars: {
        'fontPath': "'./fonts/'",
        'accentFontPath': "''",
        'iconFontPath': "''",
        'blockIconFontPath': "''",
        'outlineIconFontPath': "''",
        'imagePath': "'./images'"
      },
      plugins: [
        new (require('less-plugin-autoprefix'))({browsers: ["last 5 versions"]})
      ],
      compress: false,
      livereload: true,
      spawn: false
    },
    default: {
      expand: true,
      flatten: true,
      src: [
        '<%=meta.dir.app%>/**/*.less',
        '!<%=meta.dir.app%>/**/_*.less'
      ],
      dest: '<%=meta.dir.assets%>',
      ext: '.css'
    } // inLess
  }); // less

  // watch to run some of the above automatically on file changes
  grunt.config('watch', {
    data: {
      files: [
        '<%=meta.dir.common%>/**/*.json',
        '<%=meta.dir.common%>/**/data/**'
      ],
      tasks: ['find-tables']
    },
    less: {
      files: [
        '<%=meta.dir.app%>/**/*.less',
        '<%=meta.dir.common%>/**/*.less'
      ],
      tasks: ['less']
    } // less

  }); // watch


  // Load the necessary node modules. 
  // This is probably a bad way to do it, but I do not know a better one (yet)
  var npmTasks = ['grunt-contrib-clean', 'grunt-contrib-copy', 'grunt-contrib-less', 'grunt-simple-watch', 'bones', 'hippo'];

  npmTasks.forEach(function(task) {
    if(grunt.file.exists('./node_modules/necromancy/node_modules/' + task)) {
      grunt.loadNpmTasks('necromancy/node_modules/' + task);
    }
    else if(grunt.file.exists('./node_modules/' + task)) {
      grunt.loadNpmTasks(task);
    }
    else {
      grunt.fail.warn('\nUnable to find node_module: `' + task + '`!\n\nRun `npm install` and try again.\n\n');
    }
  });

  // for now, just running what we need to get things working
  grunt.registerTask('copy-assets', ['copy:fonts', 'copy:assets']);

  grunt.registerTask('collect', grunt.config('collect'));

  grunt.registerTask('refresh', ['clean:bower']);

  // Register Default task(s).
  grunt.registerTask('default', ['collect', 'simple-watch']);


  return require('necromancy/tasks/libs/common/helpers')(grunt);
};