export const GameBoard = (function () {
  'use strict';

  /* GameBoard manages the logic and state of the game */

  let board = [...Array(9)];

  const getBoard = () => board;

  const updateBoard = (gridUnit, playerValue) => board[gridUnit.dataset.id] = playerValue;

  return {
    getBoard,
    updateBoard
  };
})();