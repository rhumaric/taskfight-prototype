/* global describe, it, expect, Taskfight, Backbone */
'use strict';

describe('Taskfight.Rankings', function () {

  describe('#addTask()', function () {

    it('Should create a new ranking for the task', function () {

      var task = new Backbone.Model();
      var subject = new Taskfight.Rankings();
      subject.addTask(task);

      expect(subject.size()).to.equal(1);
      expect(subject.at(0).get('task')).to.equal(task);
      expect(subject.at(0).get('score')).to.equal(0);
    });
  });

  describe('#getRanking()', function () {

    it('Should return ranking corresponding to given task', function () {
      var task = new Backbone.Model();
      var subject = new Taskfight.Rankings([
        new Taskfight.Ranking(),
        new Taskfight.Ranking({task: task, score: 25}),
        new Taskfight.Ranking(),
        new Taskfight.Ranking()
      ]);

      var ranking = subject.getRanking(task);
      expect(ranking.get('task')).to.equal(task);
      expect(ranking.get('score')).to.equal(25);
    });
  });

  describe('#removeTask()', function () {

    it('Should remove ranking for given task', function () {

      var task = new Backbone.Model();
      var subject = new Taskfight.Rankings([
        new Taskfight.Ranking(),
        new Taskfight.Ranking({task: task, score: 25}),
        new Taskfight.Ranking(),
        new Taskfight.Ranking()
      ]);

      subject.removeTask(task);

      var ranking = subject.getRanking(task);
      expect(ranking).to.be.undefined;
      expect(subject.size()).to.equal(3);
    });
  });

  describe('Sorting', function () {

    beforeEach(function () {
      console.log('Before each');

      this.rankings = [
        new Taskfight.Ranking({score: 10}),
        new Taskfight.Ranking({score: 50}),
        new Taskfight.Ranking({score: 30}),
        new Taskfight.Ranking({score: 5})
      ];
    });

    it('Should sort the rankings when instanciated', function () {

      var subject = new Taskfight.Rankings(this.rankings);
      
      expect(subject.indexOf(this.rankings[0])).to.equal(1);
      expect(subject.indexOf(this.rankings[1])).to.equal(3);
      expect(subject.indexOf(this.rankings[2])).to.equal(2);
      expect(subject.indexOf(this.rankings[3])).to.equal(0);
    });

    it('Should sort the rankings when score changes', function () {

      var subject = new Taskfight.Rankings(this.rankings);
      this.rankings[2].set('score', 2);
      var rankings = this.rankings;
      subject.on('sort', function (){
        expect(subject.indexOf(this.rankings[0])).to.equal(2);
        expect(subject.indexOf(this.rankings[1])).to.equal(3);
        expect(subject.indexOf(this.rankings[2])).to.equal(0);
        expect(subject.indexOf(this.rankings[3])).to.equal(1);
      });
    });

    it('Should sort the rankings when a new ranking is added', function () {

      var subject= new Taskfight.Rankings(this.rankings);
      var extraRanking = new Taskfight.Ranking({score: 20});
      var rankings = this.rankings;
      subject.on('sort', function (){
        expect(subject.indexOf(rankings[0])).to.equal(1);
        expect(subject.indexOf(rankings[1])).to.equal(4);
        expect(subject.indexOf(rankings[2])).to.equal(3);
        expect(subject.indexOf(rankings[3])).to.equal(0);
        expect(subject.indexOf(extraRanking)).to.equal(2);
      });
    });

    it('Should sort the rankings when a ranking is removed', function () {

      var subject= new Taskfight.Rankings(this.rankings);
      subject.remove(this.rankings[2]);
      var rankings = this.rankings;
      subject.on('sort', function (){
        expect(subject.indexOf(rankings[0])).to.equal(1);
        expect(subject.indexOf(rankings[1])).to.equal(2);
        expect(subject.indexOf(rankings[2])).to.equal(-1);
        expect(subject.indexOf(rankings[3])).to.equal(0);
      });
    });
  });
});