import { GameBoard } from './GameBoard.mjs';

export const GameController = (function () {
  'use strict';

  /* GameController handles the events and talks to GameBoard for state */

  const getBoard = () => GameBoard.getBoard();

  return {
    getBoard
  };
})();