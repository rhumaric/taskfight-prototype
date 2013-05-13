/* global describe, it, expect, Taskfight, Backbone */
'use strict';

(function () {
  // *** Helpers ***

  var tasks = [
    new Backbone.Model({
      label: 'Have a tea'
    }),
    new Backbone.Model({
      label: 'Take a nap'
    }),
    new Backbone.Model({
      label: 'Read a book'
    }),
    new Backbone.Model({
      label: 'Bake a cake'
    })
  ];

  function getFight() {

    var result = new Taskfight.Fight();
    result.tasks.add(tasks[0]);
    result.tasks.add(tasks[1]);
    result.tasks.add(tasks[2]);

    return result;
  }

  // *** Tests ***

  describe('Tasfkight.Fight', function () {

    describe('#battles', function () {

      it('Should list the available combinations of fights', function () {

        var subject = getFight();

        expect(subject.battles.size()).to.equal(3);
      });

      it("Should remove a task's battles when it is remove from the tasks", function () {

        var subject = getFight();
        subject.tasks.add(tasks[3]);

        expect(subject.battles.size()).not.to.equal(3);

        subject.tasks.remove(tasks[2]);

        expect(subject.battles.size()).to.equal(3);
      });
    });

    describe('#rankings', function () {

      it('Should contain the ranking for a task after it has beed added', function () {

        var subject = getFight();

        expect(subject.rankings.size()).to.equal(3);

        expect(subject.rankings.getRanking(tasks[0])).not.to.be.undefined;
        expect(subject.rankings.getRanking(tasks[1])).not.to.be.undefined;
        expect(subject.rankings.getRanking(tasks[2])).not.to.be.undefined;
      });

      it('Should no longer contain the ranking for a task after it has been removed', function () {

        var subject = getFight();
        subject.tasks.remove(tasks[1]);

        expect(subject.rankings.size()).to.equal(2);
        expect(subject.rankings.getRanking(tasks[1])).to.be.undefined;
      });
    });

    describe('@currentBattle', function () {

      it('Should return the first battle if no battle has been fought yet', function () {

        var subject = getFight();
        expect(subject.get('currentBattle')).to.equal(subject.battles.at(0));
      });

      it('Should retutn the next battle after a battle has been fought', function () {

        var subject = getFight();
        var currentBattle = subject.get('currentBattle');
        var nextBattleIndex = subject.battles.indexOf(currentBattle) + 1;
        currentBattle.set('winner', currentBattle.get('tasks')[0]);

        expect(subject.get('currentBattle')).to.equal(subject.battles.at(nextBattleIndex));
      });

      it('Should return `undefined` if all battle have been fought', function () {

        var subject = getFight();
        var currentBattle = null;
        while (currentBattle = subject.get('currentBattle')) {
          currentBattle.set('winner', currentBattle.get('tasks')[0]);
        }

        expect(subject.get('currentBattle')).to.be.undefined;
      });
    });
  });
}());