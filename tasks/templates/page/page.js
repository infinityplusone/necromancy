/* -----------------------------------
 *
 * Name: <%= name %>/<%= name %>.js
 * Description: <%= meta.description %>
 * Author(s): <%= meta.author %>
 * Dependencies: brain, bones

 * Version:    0.7.0
 * Last Modified: <%= meta.created_at %>
 *
 * Notes: 
 *
 */

requirejs([
  'bones/skeleton',
  'text!app/<%= dest %>/<%= name %>.hbs',
  'brain'
], function(Skeleton, tmpl) {

  brain.handlebars.addTemplates(tmpl);

  var $body = $('body');

  // Add the page's code to the page
  $body.append(brain.templates['<%= name %>']());

  var PageManager = Skeleton.create({
    name: '<%= title %> Page',

    onManagerReady: function() {
      var mgr = this;

      mgr._super('onManagerReady');

      /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
      /* =-=-=-=-=-= Add Your JS Here  =-=-=-=-=-= */
      

      /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

    } // onManagerReady

  }); // (Page)Manager

  brain.log(Skeleton.name, 'info');

  brain.Hippo.on('hippo:ready', function() {
    Skeleton.init({
      // ...
    }); // Skeleton.config
  }).init('<%= project %>');

}); // requirejs
