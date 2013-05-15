/* global Backbone, $, _ */
'use strict';

/**
 * Main class of the Taskfight application. Bootstraps the application when
 * instanciated. Act as a namespace to store the other classes
 */
var Taskfight = window.Taskfight = Backbone.Router.extend({

  routes: {
    '': 'index',
    '!/list': 'list',
    '!/fight': 'fight',
    '!/results': 'results'
  },

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
    this.routesForNavigation = new Backbone.Collection([
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
      model: this.routesForNavigation
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

    _.each(_.values(this.views), _.bind(function (view) {
      this.$el.prepend(view.el);
    }, this));

    this.fight.tasks.on('add remove', _.bind(this._updateEnabledRoutes, this));
    this._updateEnabledRoutes();
  },

  _updateEnabledRoutes: function () {

    var routes = this.routesForNavigation.filter(function (route) {

      return route.get('route') !== 'list';
    });

    var disabled = true;
    if (this.fight.hasEnoughTasks()) {
      disabled = false;
    }

    _.each(routes, function (route) {
      route.set('disabled', disabled);
    });
  },

  index: function () {

    this.navigate(Taskfight.LIST_URL, {trigger: true});
  },

  list: function () {

    this.views.fight.$el.hide();
    this.views.results.$el.hide();
    this.views.list.$el.show();
  },

  fight: function () {
  
    // Prevent navigation if there is not enough tasks to sort
    if (this.fight.tasks.size() < 2) {
      this.navigate(Taskfight.LIST_URL, {trigger: true});
      return;
    }

    this.views.list.$el.hide();
    this.views.results.$el.hide();
    this.views.fight.$el.show();
  },

  results: function () {
    console.log('Displaying results page');

    // Prevent navigation if there is not enough tasks to sort
    if (this.fight.tasks.size() < 2) {
      this.navigate(Taskfight.LIST_URL, {trigger: true});
      return;
    }

    this.views.list.$el.hide();
    this.views.fight.$el.hide();
    this.views.results.$el.show();
  }
});

Taskfight.LIST_URL = '!/list';
Taskfight.FIGHT_URL = '!/fight';
Taskfight.RESULTS_URL = '!/results';