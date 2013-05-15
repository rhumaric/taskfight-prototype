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

    // Inits the models
    this.fight = new Taskfight.Fight();
    this.fight.tasks.add(new Backbone.Model({label: 'Have a tea'}));
    this.fight.tasks.add(new Backbone.Model({label: 'Take a nap'}));
    this.fight.tasks.add(new Backbone.Model({label: 'Read a book'}));

    // Init the navigation
    // Idealy, this would use the router's `route` parameter...
    var routes = new Backbone.Collection([
      new Backbone.Model({
        title: 'List',
        route: 'list'
      }),
      new Backbone.Model({
        title: 'Fight',
        route: 'fight'
      }),
      new Backbone.Model({
        title: 'Results',
        route: 'results'
      })
    ]);

    this.navigation = new Taskfight.NavigationView({
      router: this,
      model: routes
    });
    this.$el.append(this.navigation.el);

    // Inits the views
    this.views = {

      list: new Taskfight.ListView({
        model: this.fight.tasks,
        router: this
      }),
      fight: new Taskfight.FightView({
        model: this.fight,
        router: this
      }),
      results: new Taskfight.ResultsView({
        model: this.fight,
        router: this
      })
    };
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

    this.views.fight.remove();
    this.views.results.remove();
    this.$el.prepend(this.views.list.el);
    this.views.list.delegateEvents();
  },

  fight: function () {
  
    // Prevent navigation if there is not enough tasks to sort
    if (this.fight.tasks.size() < 2) {
      this.navigate(Taskfight.LIST_URL, {trigger: true});
      return;
    }

    this.views.list.remove();
    this.views.results.remove();
    this.$el.prepend(this.views.fight.el);
    this.views.fight.delegateEvents();
  },

  results: function () {
    console.log('Displaying results page');

    // Prevent navigation if there is not enough tasks to sort
    if (this.fight.tasks.size() < 2) {
      this.navigate(Taskfight.LIST_URL, {trigger: true});
      return;
    }

    this.views.list.$el.remove();
    this.views.fight.$el.remove();
    this.$el.prepend(this.views.results.el);
    this.views.results.delegateEvents();
  }
});

Taskfight.LIST_URL = '!/list';
Taskfight.FIGHT_URL = '!/fight';
Taskfight.RESULTS_URL = '!/results';