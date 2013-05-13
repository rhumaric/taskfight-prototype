/* global describe, it, expect, Taskfight, Backbone */
'use strict';

describe('Taskfight.Battles', function () {

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

  describe('#addBattles', function () {

    it('Should add a battle against each of the opponents', function () {

      var battles = new Taskfight.Battles();
      battles.addBattles(tasks[0], new Backbone.Collection(tasks));

      expect(battles.size()).to.equal(3);
    });
  });

  describe('#removeBattles', function () {

    it('Should remove battles where given task fights', function () {
      var battles = new Taskfight.Battles();
      battles.add(new Taskfight.Battle({
        task: tasks[0],
        opponent: tasks[2]
      }));
      battles.add(new Taskfight.Battle({
        task: tasks[1],
        opponent: tasks[0]
      }));
      battles.add(new Taskfight.Battle({
        task: tasks[1],
        opponent: tasks[2]
      }));
      battles.add(new Taskfight.Battle({
        task: tasks[2],
        opponent: tasks[3]
      }));

      battles.removeBattles(tasks[0]);
      expect(battles.size()).to.equal(2);
    });
  });
});
