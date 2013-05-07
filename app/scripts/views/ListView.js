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
  },

  initialize: function () {

    this.model.on('add', _.bind(this.render, this));
    this.model.on('remove', _.bind(this.render, this));
    this._loadTemplate();
    this.$form = this.$('form');
    this.$list = this.$('.tf-tasks');
    this.$empty = this.$('.tf-tasks-empty');
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

    this.$form.focus();
  }
});

Taskfight.ListView.TaskView = Backbone.View.extend({

  tagName: 'li',
  className: 'tf-task',

  events: {
    'click .tf-task--label': 'editTask'
  },

  initialize: function () {

    this.$el.data('backbone-view', this);
    this.render();
  },

  editTask: function () {
    console.log('Editing task');
  },

  render: function () {
    this.$span = $('<span class="tf-task--label">').html(this.model.get('label'));
    this.$delete = $('<a class="tf-task--delete" href="">Delete</a>');
    this.$el.append(this.$span, this.$delete);
  }
});