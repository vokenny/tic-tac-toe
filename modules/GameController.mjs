import { GameBoard } from './GameBoard.mjs';

export const GameController = (function () {
  'use strict';

  /* 
    - GameController triggers GameBoard state changes
    - Manages presentation logic based on the GameBoard state changes
  */

  const game = document.querySelector('#game');
  const activePlayerReadout = document.querySelector('#active-player');
  const results = document.querySelector('#results');
  const getRestartButton = () => document.querySelector('#restart');
  const getGridUnits = () => document.querySelectorAll('.grid-unit');

  const RESTART_TEMPLATE = `<button id="restart">Restart</button>`;
  const DRAW_TEMPLATE = `<h1>IT'S A DRAW!</h1> ${RESTART_TEMPLATE}`;
  const WIN_TEMPLATE = (winner) => `<h1>${winner} wins!</h1> ${RESTART_TEMPLATE}`;

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

  const setUpGame = (activePlayer) => {
    activePlayerReadout.textContent = activePlayer.getValue() + "'s turn";
    displayBoard();
  }

  const displayBoard = () => game.append(...createGridUnits());
  const clearBoard = () => getGridUnits().forEach(unit => unit.innerHTML = '');

  const showResults = (playerValue) => {
    results.classList.remove('hidden');
    results.innerHTML = playerValue ? WIN_TEMPLATE(playerValue) : DRAW_TEMPLATE;

    getRestartButton().addEventListener('click', GameController.restart);
  }

  const hideResults = () => {
    results.classList.add('hidden');
    results.innerHTML = '';
  }

  const select = (gridUnit, playerValue, callback) => {
    // Only mark a unit if it's not already taken
    // .nodeName check is in case they click on the img on top of the div
    if (!gridUnit.innerHTML && gridUnit.nodeName === 'DIV') {
      const ITEMS = getItems();
      gridUnit.innerHTML = playerValue === ITEMS.SWORD.value ? ITEMS.SWORD.icon : ITEMS.SHIELD.icon;

      GameBoard.updateBoard(gridUnit, playerValue);

      if (!hasGameEnded(playerValue)) {
        activePlayerReadout.textContent = (playerValue === ITEMS.SWORD.value
          ? ITEMS.SHIELD.value
          : ITEMS.SWORD.value)
          + "'s turn";

        callback();
      }
    }
  }

  const hasGameEnded = (playerValue) => {
    if (GameBoard.getHasWinner()) {
      showResults(playerValue);
      return true;
    }

    if (GameBoard.getBoardIsFull()) {
      GameBoard.getHasWinner() ? showResults(playerValue) : showResults();
      return true;
    }

    return false;
  }

  const restart = () => {
    GameBoard.restart();
    clearBoard();
    hideResults();
  }

  return {
    getGridUnits,
    getItems,
    setUpGame,
    select,
    restart
  }
})();