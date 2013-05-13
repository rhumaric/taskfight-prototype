/* global Taskfight, Backbone */
'use strict';

/**
 * A battle between to tasks
 *
 * @class Battle
 * @namespace Taskfight
 */
Taskfight.Battle = Backbone.Model.extend({

  /**
   * The task fighting this battle
   * @property task
   * @type {Backbone.Model}
   */

  /**
   * The opponent task fighting this battle
   * @property opponent
   * @type {Backbone.Model}
   */

  /**
   * @method involves
   * @param task {Backbone.Model}
   * @return {Boolean} true if given task takes part in this battle, false otherwise
   */
  involves: function (task) {

    return this.get('task') === task || this.get('opponent') === task;
  },

  isComplete: function () {

    return this.has('winner');
  }
});

/**
 * A collection of tasks battles
 * @class Battles
 * @namespace Taskfight
 */
Taskfight.Battles = Backbone.Collection.extend({

  model: Taskfight.Battle,

  /**
   * Adds battles for given task to fight against given tasks (except itself)
   * @method addBattles
   * @param task {Backbone.Model} The task to add the battle for
   * @param opponents {Backbone.Collection} The collection of task the task must fight against
   */
  addBattles: function (task, opponents) {

    var battles = this;
    opponents.each(function (opponent) {

      if(opponent !== task) {
        battles.add(new Taskfight.Battle({
          task: task,
          opponent: opponent
        }));
      }
    });
  },

  /**
   * Removes battles involving given task
   * @method removeBattles
   * @param task {Backbone.Model}
   */
  removeBattles: function (task) {

    var battlesToRemove = this.filter(function (battle) {
      return battle.involves(task);
    });
    this.remove(battlesToRemove);
  }
});