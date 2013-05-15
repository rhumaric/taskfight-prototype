/* global Taskfight, Backbone, $ */
'use strict';

/**
 * Displays navigation between the main views of the application
 * @class NavigationView
 * @namespace Taskfight
 */
Taskfight.NavigationView = Backbone.View.extend({

  tagName: 'ul',
  className: 'tf-nav',

  events: {

    'click .tf-nav--view': 'navigate'
  },

  initialize: function () {

    this.options.router.on('route', _.bind(this.updateCurrentRoute, this));
    this.render();
  },

  updateCurrentRoute: function (route) {

    this.$('.tf-nav--view-current').removeClass('tf-nav--view-current');
    this.$('[data-route="' + route + '"]').addClass('tf-nav--view-current');
  },

  navigate: function (event) {

    var route = $(event.target).data('route');
    this.options.router.navigate('!/' + route, {trigger: true});
  },

  render: function () {

    var availableViews = [];
    var availableView;
    this.model.each(function (view) {

      availableView = $('<li class="tf-nav--view">').html(view.get('title'))
                                                    .attr('data-route', view.get('route'));
      availableViews.push(availableView);
    });

    this.$el.append(availableViews);
  }
});