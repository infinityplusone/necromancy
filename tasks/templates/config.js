/*
 * Name: config.js
 * Description: RequireJS configuration for <%= name %>
 * 
 * Author(s):  infinityplusone
 * Version:    0.1.4
 * Date:       2016-08-18
 *
 * Notes: 
 *
 *
 */

(function() {
  window.require = {
    baseUrl: location.pathname.replace(/\/app\/.*/, '/'),
    urlArgs: 'bust=' + (new Date()).getTime(),
    waitSeconds: 20,

    paths: {
      'bootstrap':            'bower_components/bootstrap/js',
      'jquery':               'bower_components/jquery/dist/jquery',

      'bones':                'bower_components/bones',
      'brain':                'bower_components/brain/brain',
      'hippo':                'bower_components/hippo/hippo'
    },
    shim: {
      'bones': {
        deps: [ 'brain', 'bone', 'jquery' ],
        exports: 'bones'
      },
      'brain': {
        deps: [ 'brainybars', 'jquery', 'jquery-bindable', 'lodash', 'lodash-inflection', 'moment', 'text' ],
        exports: 'brain'
      },
      'hippo': {
        deps: [ 'jquery', 'jquery-bindable', 'json2', 'lodash', 'lodash-inflection', 'brain' ]
      }
    },
    deps: [
      'hippo',
      'brain',
      'app/common'
    ],
    callback: function(Hippo, brain) {
      brain.Hippo = Hippo;
    }
  };
})();