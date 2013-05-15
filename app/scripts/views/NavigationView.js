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
    this.model.each(function (route) {

      availableView = new Taskfight.NavigationViewItem({
        model: route
      });
      availableViews.push(availableView.el);
    });

    this.$el.append(availableViews);
  }
});

Taskfight.NavigationViewItem = Backbone.View.extend({

  tagName: 'li',
  className: 'tf-nav--view',

  initialize: function () {


    this.model.on('change:disabled', _.bind(this.render, this));
    this.render();
  },

  render: function () {
    this.$el.html(this.model.get('title'))
            .attr('data-route', this.model.get('route'));

    if (this.model.get('disabled')) {
      this.$el.addClass('tf-nav--view-disabled');
    } else {
      this.$el.removeClass('tf-nav--view-disabled');
    }
  }
});