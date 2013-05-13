/* global Taskfight, Backbone, Handlebars, $ */
'use strict';

Taskfight.ResultsView = Backbone.View.extend({

  templateName: 'results-view',

  events: {
    'click .tf-previous': 'navigateToFight'
  },

  initialize: function () {

    this._loadTemplate();
    this.$rankings = this.$('.tf-rankings');
    this.model.rankings.on('sort', _.bind(this.render, this));
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
    
    var elements = [];
    this.model.rankings.each(function (ranking) {

      var $li = $('<li class="tf-task">').html(ranking.get('task').get('label'));
      elements.push($li);
    });

    this.$rankings.empty().append(elements);
  }
});