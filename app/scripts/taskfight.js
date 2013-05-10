/* global Backbone, $ */
'use strict';

/**
 * Main class of the Taskfight application. Bootstraps the application when
 * instanciated. Act as a namespace to store the other classes
 */
var Taskfight = window.Taskfight = Backbone.Router.extend({

  initialize: function (options) {

    options = options || {};

    console.log('Launching Taskfight application');
    this.$el = $(options.el || document.body);
    this.tasks = new Backbone.Collection();
    this.tasks.add([new Backbone.Model({label: 'Task #1'}), new Backbone.Model({label: 'Task #2'}), new Backbone.Model({label: 'Task #3'})]);
  },

  routes: {
    '': 'index',
    '!/list': 'list',
    '!/fight': 'fight',
    '!/results': 'results'
  },

  index: function () {

    this.navigate(Taskfight.LIST_URL, {trigger: true});
  },

  list: function () {
    console.log('Displaying list page');
    this.listView = new Taskfight.ListView({
      model: this.tasks,
      router: this
    });
    if (this.fightView) {
      this.fightView.remove();
    }
    if (this.resultsView) {
      this.resultsView.remove();
    }
    this.$el.append(this.listView.el);
  },

  fight: function () {
    console.log('Displaying fight page');
    this.fightView = new Taskfight.FightView({
      router: this
    });
    if (this.listView) {
      this.listView.remove();
    }
    if (this.resultsView) {
      this.resultsView.remove();
    }
    this.$el.append(this.fightView.el);
  },

  results: function () {
    console.log('Displaying results page');
    this.resultsView = new Taskfight.ResultsView({
      router: this
    });
    if (this.listView) {
      this.listView.remove();
    }
    if (this.fightView) {
      this.fightView.remove();
    }
    this.$el.append(this.resultsView.el);
  }
});

Taskfight.LIST_URL = '!/list';
Taskfight.FIGHT_URL = '!/fight';
Taskfight.RESULTS_URL = '!/results';