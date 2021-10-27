export const GameBoard = (function () {
  'use strict';

  /* GameBoard manages the logic and state of the game */

  let board = [...Array(3)].map(row => Array(3).fill('1'));

  const getBoard = () => board;

  return {
    getBoard
  };
})();