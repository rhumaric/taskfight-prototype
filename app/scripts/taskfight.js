/* global Backbone */
'use strict';

/**
 * Main class of the Taskfight application. Bootstraps the application when
 * instanciated. Act as a namespace to store the other classes
 */
var Taskfight = window.Taskfight = Backbone.Router.extend({

  initialize: function (options) {

    options = options || {};

    console.log('Launching Taskfight application');
    this.el = options.el || document.body;
    this.tasks = new Backbone.Collection();
  },

  routes: {

    '!/list': 'list',
    '!/fight': 'fight',
    '!/results': 'results'
  },

  list: function () {
    console.log('Displaying list page');
    this.listView = new Taskfight.ListView({
      model: this.tasks
    });
    this.listView.$el.appendTo(this.el);
  },

  fight: function () {
    console.log('Displaying fight page');
  },

  results: function () {
    console.log('Displaying results page');
  }
});