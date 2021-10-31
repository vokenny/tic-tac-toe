import { GameBoard } from "./GameBoard.mjs";

export const DisplayController = (function () {
  'use strict';

  /* 
    - DisplayController is triggered by GameController
    - Manages presentation logic
  */

  const game = document.querySelector('#game');
  const activePlayerReadout = document.querySelector('#active-player');
  const results = document.querySelector('#results');
  const getRestartButton = () => document.querySelector('#restart');
  const getGridUnits = () => document.querySelectorAll('.grid-unit');

  const RESTART_TEMPLATE = `<button id="restart">Restart</button>`;
  const DRAW_TEMPLATE = `<h1>IT'S A DRAW!</h1> ${RESTART_TEMPLATE}`;
  const WIN_TEMPLATE = (winner) => `<h1>${winner} wins!</h1> ${RESTART_TEMPLATE}`;

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

  const updateActivePlayerReadout = (activePlayer) => activePlayerReadout.textContent = activePlayer.getValue() + "'s turn";

  const createBoard = () => game.append(...createGridUnits());

  const clearBoard = () => getGridUnits().forEach(unit => unit.innerHTML = '');

  const showResults = (player) => {
    const playerValue = player?.getValue();
    results.classList.remove('hidden');
    results.innerHTML = playerValue ? WIN_TEMPLATE(playerValue) : DRAW_TEMPLATE;
  }

  const hideResults = () => {
    results.classList.add('hidden');
    results.innerHTML = '';
  }

  return {
    getRestartButton,
    getGridUnits,
    updateActivePlayerReadout,
    createBoard,
    clearBoard,
    showResults,
    hideResults
  }
})();