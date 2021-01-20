> This repository is now [hosted on Gitlab](https://gitlab.com/romaricpascal/taskfight-prototype). Please head there if you wish to contribute. Thanks 🙂

Taskfight
=========

Your tasks are already fighting for your attention. This app takes it quite litterally and helps you prioritise
them by having them "fight" against one another:

  1. Enter your list of tasks
  2. Compare them two by two
  3. See which one should get your attention

## Todo

 - Add more automated UI tests
 - Remove points from battles that get removed after a task is removed
 - Prevent navigation to fights and results if there is less than 2 active tasks (redirect to list)
 - Add feedback about which task was chosen in the previous fight
 - Add a Skip button ?
 - Redirect to results when all battles are completed
 - Design a logo
 - Design the application style
 - Add support for French language
 - Have an history of the fights you have
 - Add new tasks afterwards
 - Edit results afterwards
 - Live rankings as the fight goes (hidden by default) 
 - Fights are sorted randomly to remain impartial
 - Offline mode
 - Import from/export to popular todo apps

## Refactoring

 - Encapsulate the logic for switching between view in a separate class. 
   Maybe store all available view in an Array and have some kind of 
  `set('active', ...)` or `show()` method to set which one is displayed.

## Done

 - Add tasks
 - Remove tasks
 - Edit tasks
 - Navigate between views
 - Compare tasks
 - Display results
 - Style compare tasks and display results views
