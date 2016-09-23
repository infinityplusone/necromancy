/*
 * Name: <%= name %>.js
 * Description: <%= meta.description %>
 * Dependencies: brain
 * 
 * Author(s): <%= meta.author %>
 * Version:    0.1.4
 * Date:       2016-08-18
 *
 * Notes: 
 *
 *
 */
define([
  'text!./<%= name %>.hbs',
  'brain'
], function(tmpl) {

	brain.handlebars.addTemplates(tmpl);

}); // define
