/* global Backbone, Taskfight, $, Handlebars */
'use strict';

Taskfight.FightView = Backbone.View.extend({

  templateName: 'fight-view',
  events: {
    'click .tf-previous': 'navigateToList',
    'click .tf-next': 'navigateToResults'
  },

  initialize: function () {

    this._loadTemplate();
    this.$task1 = this.$('.tf-chooseTask--task1');
    this.$task2 = this.$('.tf-chooseTask--task2');
    this.render();
  },

  _loadTemplate: function () {

    var $script = $('[data-template-name="' + this.templateName + '"]');
    this.template = Handlebars.compile($script.html());
    this.$el.html(this.template());
  },

  navigateToList: function () {

    this.options.router.navigate(Taskfight.LIST_URL, {trigger: true});
  },

  navigateToResults: function () {

    this.options.router.navigate(Taskfight.RESULTS_URL, {trigger: true});
  },

  render: function () {

  }
});