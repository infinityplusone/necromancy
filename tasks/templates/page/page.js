/* -----------------------------------
 *
 * Name: <%= name %>/<%= name %>.js
 * Description: <%= meta.description %>
 * Author(s): <%= meta.author %>
 * Dependencies: infinityplusone, bones

 * Version:    0.7.0
 * Last Modified: <%= meta.created_at %>
 *
 * Notes: 
 *
 */

requirejs([
  'bones/manager/main',
  'text!app/<%= dest %>/<%= name %>.hbs',
  // 'skeleton/component-name/component-name', // using a component?
  // 'lib-name', // using a new component/library?
  'skeleton/panels/panels',
  'infinityplusone'
], function(Manager, tmpl) {

  infinityplusone.handlebars.addTemplates(tmpl);

  var $body = $('body');

  // Add the page's code to the page
  $body.append(infinityplusone.templates['<%= name %>']());

  var PageManager = Manager.create({
    name: '<%= title %> Page',

    onManagerReady: function() {
      var mgr = this;

      mgr._super('onManagerReady');

      /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
      /* =-=-=-=-=-= Add Your JS Here  =-=-=-=-=-= */
      

      /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

    } // onManagerReady

  }); // (Page)Manager

  infinityplusone.log(PageManager.name, 'info');

  infinityplusone.Qore.on('qore:ready', function() {
    PageManager.init({
      // ...
    }); // PageManager.config
  }).init('<%= project %>');

}); // requirejs
