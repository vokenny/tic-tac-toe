import { GameBoard } from './GameBoard.mjs';

export const GameController = (function () {
  'use strict';

  /* 
    - GameController handles the events
    - Manages presentation logic
    - Talks to GameBoard for logic and state
  */

  /* DOCUMENT SELECTORS */
  const game = document.querySelector('#game');

  function createGridUnits() {
    function createGridUnit() {
      const gridUnit = document.createElement('div');
      gridUnit.classList.add('grid-unit');

      return gridUnit;
    }

    const gridUnits = GameBoard
      .getBoard()
      .flatMap(row => row.map(unit => createGridUnit()));

    return gridUnits;
  }

  const displayBoard = function () {
    game.append(...createGridUnits());
  }

  return {
    displayBoard
  }
})();