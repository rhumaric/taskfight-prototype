/* global Backbone */
'use strict';

window.Taskfight = Backbone.Router.extend({

  initialize: function () {

    console.log('Launching Taskfight application');
  },

  routes: {

    '!/list': 'list',
    '!/fight': 'fight',
    '!/results': 'results'
  },

  list: function () {
    console.log('Displaying list page');
  },

  fight: function () {
    console.log('Displaying fight page');
  },

  results: function () {
    console.log('Displaying results page');
  }
});