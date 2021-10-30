import { GameBoard } from './GameBoard.mjs';

export const GameController = (function () {
  'use strict';

  /* 
    - Manages presentation logic
    - GameController triggers GameBoard logic and state changes
  */

  const game = document.querySelector('#game');
  const results = document.querySelector('#results');

  const getItems = () => GameBoard.getItems();

  function createGridUnits() {
    function createGridUnit(idx) {
      const gridUnit = document.createElement('div');
      gridUnit.classList.add('grid-unit');
      gridUnit.dataset.id = idx;

      return gridUnit;
    }

    const gridUnits = GameBoard.getBoard().map((_, idx) => createGridUnit(idx));

    return gridUnits;
  }

  const displayBoard = () => game.append(...createGridUnits());

  const showResults = (playerValue) => {
    results.classList.remove('hidden');
    results.innerHTML = `<h1>${playerValue} wins!</h1>`;
  }

  const select = (gridUnit, playerValue, callback) => {
    // Only mark a unit if it's not already taken
    // .nodeName check is in case they click on the img on top of the div
    if (!gridUnit.innerHTML && gridUnit.nodeName === 'DIV') {
      const ITEMS = getItems();
      gridUnit.innerHTML = playerValue === ITEMS.SWORD.value ? ITEMS.SWORD.icon : ITEMS.SHIELD.icon;

      GameBoard.updateBoard(gridUnit, playerValue);

      GameBoard.getHasWinner() ? showResults(playerValue) : callback();
    }
  }

  return {
    getItems,
    displayBoard,
    select
  }
})();