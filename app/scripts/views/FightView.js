/* global Backbone, Taskfight, $, Handlebars */
'use strict';

Taskfight.FightView = Backbone.View.extend({

  templateName: 'fight-view',
  events: {
    // Can't use `submit` event as it doesn't allow to see which button was clicked
    'click .tf-chooseTask--task': 'chooseTask',
    'click .tf-previous': 'navigateToList',
    'click .tf-next': 'navigateToResults'
  },

  initialize: function () {

    this._loadTemplate();
    this.$form = this.$('.tf-chooseTask');
    this.$task1 = this.$('.tf-chooseTask--task1');
    this.$task2 = this.$('.tf-chooseTask--task2');
    this.$emptyMessage = this.$('.tf-noBattles');
    this.model.on('change:currentBattle', _.bind(this.render, this));
    this.render();
  },

  _loadTemplate: function () {

    var $script = $('[data-template-name="' + this.templateName + '"]');
    this.template = Handlebars.compile($script.html());
    this.$el.html(this.template());
  },

  navigateToList: function () {

    console.log('Navigating to List view');
    this.options.router.navigate(Taskfight.LIST_URL, {trigger: true});
  },

  navigateToResults: function () {

    console.log('Navigating to Results view');
    this.options.router.navigate(Taskfight.RESULTS_URL, {trigger: true});
  },

  chooseTask: function (event) {

    event.preventDefault();
    var task = $(event.target).data('tf-task');
    this.model.get('currentBattle').set('winner', task);
  },

  render: function () {
    var battle = this.model.get('currentBattle');

    if (battle) {
      
      this.$task1.html(battle.get('task').get('label')).data('tf-task', battle.get('task'));
      this.$task2.html(battle.get('opponent').get('label')).data('tf-task', battle.get('opponent'));
      this.$form.insertAfter(this.$('h1'));
      this.$emptyMessage.remove();
    } else {
      this.$form.remove();
      this.$emptyMessage.insertAfter(this.$('h1'));
    }
  }
});