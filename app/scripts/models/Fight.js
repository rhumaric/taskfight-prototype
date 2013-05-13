/* global Taskfight, Backbone, _ */
'use strict';

/**
 * Centralizes the information about a Taskfight: which tasks are involved,
 * the list of the battles and which battles have been done yet  
 *
 * @class Fight
 * @namespace Taskfight
 */
Taskfight.Fight = Backbone.Model.extend({

  initialize: function () {

    this.tasks = new Backbone.Collection();
    this.battles = new Backbone.Collection();

    this.tasks.on('add', _.bind(this._addBattles, this));
    this.tasks.on('remove', _.bind(this._removeBattles, this));
  },

  // *** Public API ***
  getCurrentBattle: function () {

    return this.battles.find(function (battle) {
      return !battle.isComplete();
    });
  },

  // *** Internals ***

  _addBattles: function (task) {
    var battles = this.battles;
    this.tasks.each(function (otherTask) {

      if (otherTask !== task) {
        battles.add(new Taskfight.Battle({
          tasks: [task, otherTask]
        }));
      }
    });
  },

  _removeBattles: function (task) {

    var tasksBattles = this.battles.filter(function (battle) {

      var tasks = battle.get('tasks');
      return (tasks.indexOf(task) !== -1);
    });

    this.battles.remove(tasksBattles);
  }
});