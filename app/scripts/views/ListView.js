/* global Taskfight, Backbone, $, _, Handlebars */
'use strict';

/**
 * View displaying the list of the tasks to prioritize
 * @class ListView
 */
Taskfight.ListView = Backbone.View.extend({

  templateName: 'list-view',

  events: {
    'submit .addTask': 'addTask',
    'click .tf-task--delete': 'deleteTask',
    'click .tf-next': 'navigateToFight'
  },

  initialize: function () {

    this.model.on('add', _.bind(this.render, this));
    this.model.on('remove', _.bind(this.render, this));
    this._loadTemplate();
    this.$form = this.$('form');
    this.$list = this.$('.tf-tasks');
    this.$empty = this.$('.tf-tasks-empty');
    this.$next = this.$('.tf-next');
    this.render();
  },

  _loadTemplate: function () {

    var $script = $('[data-template-name="' + this.templateName + '"]');
    this.template = Handlebars.compile($script.html());
    this.$el.html(this.template());
  },

  addTask: function (event) {
    event.preventDefault();
    var task = new Backbone.Model({
      label: event.target.taskLabel.value
    });
    this.model.add(task);
    this.$form[0].reset();
  },

  deleteTask: function (event) {
    console.log('Deleting item');
    event.preventDefault();
    var model = $(event.target.parentElement).data('backbone-view').model;
    this.model.remove(model);
  },

  navigateToFight: function () {

    // Navigate to the fight page :)
  },

  render: function () {
    console.log('Rendering view');
    if (this.model && !this.model.isEmpty()) {

      this.$empty.remove();
      this.$list.empty();
      this.model.each(_.bind(function (task) {
        var view = new Taskfight.ListView.TaskView({
          model: task
        });
        this.$list.append(view.el);
      }, this));
      this.$list.insertAfter(this.$form);
    } else {

      this.$list.remove();
      this.$empty.insertAfter(this.$form);
    }

    this.$form[0].taskLabel.focus();

    this.$next.attr('disabled', this.model.size() < 2);
  }
});

Taskfight.ListView.TaskView = Backbone.View.extend({

  tagName: 'li',
  className: 'tf-task',
  templateName: 'list-view--task-view',

  events: {
    'click .tf-task--label': 'editTask',
    'submit .tf-taskEditor': 'updateTask',
    'reset .tf-taskEditor': 'cancelEdition'
  },

  initialize: function () {

    this.$el.data('backbone-view', this);
    this._loadTemplate();
    this.$label = this.$('.tf-task--label');
    this.$delete = this.$('.tf-task--delete');
    this.$editor = this.$('form');
    $(this.$editor[0].taskLabel).on('blur', _.bind(this.cancelEdition, this));
    this.render();
  },

  _loadTemplate: function () {

    var $script = $('[data-template-name="' + this.templateName + '"]');
    this.template = Handlebars.compile($script.html());
    this.$el.html(this.template());
  },

  editTask: function () {
    console.log('Editing task');
    this.isEditing = true;
    this.render();
  },

  updateTask: function (event) {
    event.preventDefault();
    this.model.set('label', event.target.taskLabel.value);
    this.cancelEdition();
  },

  cancelEdition: function () {

    this.isEditing = false;
    this.render();
  },

  render: function () {

    if (!this.isEditing) {
      this.$label.html(this.model.get('label'));
      this.$el.append(this.$label, this.$delete);
      this.$el.removeClass('tf-task-editing');
      this.$editor.remove();
    } else {
      this.$label.remove();
      this.$delete.remove();
      this.$editor[0].taskLabel.value = this.model.get('label');
      this.$el.addClass('tf-task-editing');
      this.$el.append(this.$editor);
      this.$editor[0].taskLabel.focus();
    }
  }
});