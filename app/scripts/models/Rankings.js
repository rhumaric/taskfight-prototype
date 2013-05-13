/* global Taskfight, Backbone */
'use strict';

/**
 * @class Ranking
 * @namespace Taskfight
 */
Taskfight.Ranking = Backbone.Model.extend({
  defaults: {

    /**
     * The score of the task
     * @property score
     * @type {int}
     */
    score: 0
  }
});

/**
 * @class Rankings
 * @namespace Taskfight
 */
Taskfight.Rankings = Backbone.Collection.extend({

  model: Taskfight.Ranking,

  initialize: function () {

    this.on('change:score add remove', function() {
      this.sortBy('score');
    });
  },

  /**
   * Adds given task to the rankings
   * @method addTask
   * @param task {Backbone.Model} The task to add to the rankings
   */
  addTask: function (task) {

    this.add(new Taskfight.Ranking({
      task: task
    }));
  },

  /**
   * Gets the ranking of given task
   * @method getRanking
   * @param task {Backbone.Model}
   * @return {Taskfight.Ranking}
   */
  getRanking: function (task) {

    return this.find(function (ranking) {
      return ranking.get('task') === task;
    });
  },

  /**
   * Removes given task from the rankings
   * @method removeTask
   * @param task {Backbone.Model} The task to remove
   */
  removeTask: function (task) {
    var ranking = this.getRanking(task);
    this.remove(ranking);
  }
});