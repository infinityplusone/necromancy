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

  brain.Page = Skeleton.create({
    name: '<%= title %> Page',

    onSkeletonReady: function() {
      var mgr = this;

      mgr._super('onSkeletonReady');

      /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
      /* =-=-=-=-=-= Add Your JS Here  =-=-=-=-=-= */

      /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

    } // onSkeletonReady

  });

  brain.log(brain.Page.name, 'info');

  brain.Hippo.on('hippo:ready', function() {

    // Add the page's code to the page
    $body.append(brain.templates['<%= name %>']());

    brain.Page.init({
      // ...
    });

  }).init('<%= project %>');

}); // requirejs
