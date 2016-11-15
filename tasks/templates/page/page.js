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

  var Page = brain.Page = Skeleton.create({
    name: '<%= title %> Page',

    onSkeletonReady: function() {
      var skel = this;

      skel._super('onSkeletonReady');

      /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */
      /* =-=-=-=-=-= Add Your JS Here  =-=-=-=-=-= */

      /* =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= */

    } // onSkeletonReady

  });

  brain.log(brain.Page.name, 'info');

  brain.Hippo.on('hippo:ready', function() {

    // Add the page's code to the page
    Page.$elem = brain.templates['<%= name %>'](Page);
    $body.append(Page.$elem);

    Page.init({});

  }).init('<%= project %>');

}); // requirejs
