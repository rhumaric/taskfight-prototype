/* global Taskfight, Backbone */
'use strict';

/**
 * A battle between to tasks
 *
 * @class Battle
 * @namespace Taskfight
 */
Taskfight.Battle = Backbone.Model.extend({

  isComplete: function () {

    return this.has('winner');
  }
}); 