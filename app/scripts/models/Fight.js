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

    // Set of tasks to prioritise
    this.tasks = new Backbone.Collection();

    // List of comparisons to do
    this.battles = new Taskfight.Battles();

    // The rankings
    this.rankings = new Taskfight.Rankings();

    this.tasks.on('add', _.bind(this._addBattles, this));
    this.tasks.on('add', _.bind(this.rankings.addTask, this.rankings));
    this.tasks.on('remove', _.bind(this._removeBattles, this));
    this.tasks.on('remove', _.bind(this.rankings.removeTask, this.rankings));

    this.battles.on('change:winner', _.bind(this._updateCurrentBattle, this));
    this.battles.on('change:winner', _.bind(this._updateRankings, this));
    this._updateCurrentBattle();
  },

  _updateRankings: function (battle, winner) {
    console.log(arguments);
    console.log('Updating ranking', winner);
    var ranking = this.rankings.getRanking(winner);
    if(ranking) {
      ranking.set('score', ranking.get('score') + 1);
    }
  },

  _updateCurrentBattle: function () {

    this.set('currentBattle', this.battles.find(function (battle) {
      return !battle.isComplete();
    }));
  },

  _addBattles: function (task) {
    this.battles.addBattles(task,this.tasks);
    this._updateCurrentBattle();
  },

  _removeBattles: function (task) {

    this.battles.removeBattles(task);
    this._updateCurrentBattle();
  }
});