/* global describe, it, expect, Taskfight, Backbone */
'use strict';

describe('Taskfight.Rankings', function () {

  describe('#addTask()', function () {

    it('Should create a new ranking for the task', function () {

      var task = new Backbone.Model();
      var rankings = new Taskfight.Rankings();
      rankings.addTask(task);

      expect(rankings.size()).to.equal(1);
      expect(rankings.at(0).get('task')).to.equal(task);
      expect(rankings.at(0).get('score')).to.equal(0);
    });
  });

  describe('#getRanking()', function () {

    it('Should return ranking corresponding to given task', function () {
      var task = new Backbone.Model();
      var rankings = new Taskfight.Rankings([
        new Taskfight.Ranking(),
        new Taskfight.Ranking({task: task, score: 25}),
        new Taskfight.Ranking(),
        new Taskfight.Ranking()
      ]);

      var ranking = rankings.getRanking(task);
      expect(ranking.get('task')).to.equal(task);
      expect(ranking.get('score')).to.equal(25);
    });
  });

  describe('#removeTask()', function () {

    it('Should remove ranking for given task', function () {

      var task = new Backbone.Model();
      var rankings = new Taskfight.Rankings([
        new Taskfight.Ranking(),
        new Taskfight.Ranking({task: task, score: 25}),
        new Taskfight.Ranking(),
        new Taskfight.Ranking()
      ]);

      rankings.removeTask(task);

      var ranking = rankings.getRanking(task);
      expect(ranking).to.be.undefined;
      expect(rankings.size()).to.equal(3);
    });
  });
});