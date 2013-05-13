'use strict';
var casper = require('casper').create();

casper.start('http://localhost:9000');

// As a user I first want to list the tasks I must prioritize
casper.waitFor(function () {
  return this.getCurrentUrl() === 'http://localhost:9000/#!/list';
});

var numberOfItems = 0;

casper.then(function () {

  this.capture('state.png');
  numberOfItems = this.evaluate(function () {
    return document.querySelector('.tf-tasks').children.length;
  });
});

// As a user I want to add a new task to the list
casper.then(function () {
  this.sendKeys('.tf-addTask--label', 'A new task');
  casper.click('.tf-addTask--add');
});

casper.waitFor(function () {
  return numberOfItems !==  this.evaluate(function () {
    return document.querySelector('.tf-tasks').children.length;
  });
});

casper.then(function () {
  this.test.assertMatch(this.fetchText('.tf-task:last-child'), /A new task/, 'Task list contains new task');
});

// As a user I want to edit an existing task
casper.then(function () {

  casper.click('.tf-task:first-child span');
});

casper.then(function () {

  var editorValue = this.evaluate(function () {
    return document.querySelector('.tf-taskEditor [name="taskLabel"]').value;
  });
  this.test.assertMatch(editorValue, /Have a tea/, 'Editor is pre-filed with current task label');
  casper.sendKeys('.tf-taskEditor [name="taskLabel"]', 'Renamed task');
  casper.click('.tf-taskEditor--save');
});

casper.waitForSelector('.tf-task:first-child span');

casper.then(function () {
  this.test.assertMatch(this.fetchText('.tf-task:first-child span'), /Renamed task/, 'Task label has been updated');
});

// As a user I want to cancel the edition of a task
casper.then(function () {

  casper.click('.tf-task:first-child span');
});

casper.then(function () {

  var editorValue = this.evaluate(function () {
    return document.querySelector('.tf-taskEditor [name="taskLabel"]').value;
  });
  this.test.assertMatch(editorValue, /Renamed task/, 'Editor is pre-filed with current task label');
  casper.click('.tf-taskEditor--cancel');
});

casper.then(function () {

  this.test.assertMatch(this.fetchText('.tf-task:first-child span'), /Renamed task/, 'Task label has not been updated');
});

// As a user I want to delete a task
var numberOfItems = 0;

casper.then(function () {

  numberOfItems = this.evaluate(function () {
    return document.querySelector('.tf-tasks').children.length;
  });
});

casper.then(function () {

  casper.click('.tf-task:first-child .tf-task--delete');
});

casper.waitFor(function () {
  return numberOfItems - 1 ===  this.evaluate(function () {
    return document.querySelector('.tf-tasks').children.length;
  });
});

casper.run();