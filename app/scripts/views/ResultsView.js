/* global Taskfight, Backbone, Handlebars, $ */
'use strict';

Taskfight.ResultsView = Backbone.View.extend({

  templateName: 'results-view',

  events: {
    'click .tf-previous': 'navigateToFight'
  },

  initialize: function () {

    this._loadTemplate();
    this.render();
  },

  navigateToFight: function () {

    this.options.router.navigate(Taskfight.FIGHT_URL,{trigger: true});
  },

  _loadTemplate: function () {

    var $script = $('[data-template-name="' + this.templateName + '"]');
    this.template = Handlebars.compile($script.html());
    this.$el.html(this.template());
  },

  render: function () {
    
  }
});