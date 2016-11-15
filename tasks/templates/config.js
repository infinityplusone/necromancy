/*
 * Name: config.js
 * Description: RequireJS configuration for <%=name%>
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
      'handlebars':           'bower_components/handlebars/handlebars',
      'jquery':               'bower_components/jquery/dist/jquery',
      'jquery-bindable':      'bower_components/jquery-enable/dist/jquery.bindable',
      'json2':                'bower_components/json2',
      'lodash':               'bower_components/lodash/dist/lodash.min',
      'lodash-inflection':    'bower_components/lodash-inflection/lib/lodash-inflection',
      'lz-string':            'bower_components/lz-string/libs/lz-string.min',
      'moment':               'bower_components/moment/moment',
      'text':                 'bower_components/requirejs-text/text', // this is needed because we *always* bring in templates or JSON

      
      'brain':                'bower_components/brain',
      'brainybars':           'bower_components/brainybars',
      'hippo':                'bower_components/hippo/hippo.min',
      'bones':                'bower_components/bones'
    },
    packages: [
      {
        name: 'brain',
        main: 'brain'
      },
      {
        name: 'brainybars',
        main: 'brainybars'
      }
    ],
    shim: {
      'jquery-bindable':      { deps: [ 'jquery' ] },
      'lodash-inflection':    { deps: [ 'lodash' ] },
      'bones': {
        deps: [ 'brain', 'bone', 'jquery' ],
        exports: 'bones'
      },
      'brain': {
        deps: [ 'brainybars', 'jquery', 'jquery-bindable', 'lodash', 'lodash-inflection', 'moment', 'text' ],
        exports: 'brain'
      }
    },
    deps: [
      'hippo',
      'brain',
      'app/common'
    ],
    callback: function(Hippo, brain) {
      window.Hippo = Hippo;

      brain.Hippo = Hippo;
      
      // Hippo.on('hippo:ready', function() {
      //   // This is right place to enhance/tweak the data in Hippo
      // });
    }

  };
})();