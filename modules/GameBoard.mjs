export const GameBoard = (function () {
  'use strict';

  /* GameBoard manages the logic and state of the game */

  const ITEMS = {
    SWORD: {
      value: "sword",
      icon: '<img src="./assets/swords.png" alt="Sword icon" class="player-icon">'
    },
    SHIELD: {
      value: "shield",
      icon: '<img src="./assets/shield.png" alt="Shield icon" class="player-icon">'
    }
  }

  let board = [...Array(9)];

  const getItems = () => ITEMS;

  const getBoard = () => board;

  const updateBoard = (gridUnit, playerValue) => board[gridUnit.dataset.id] = playerValue;

  return {
    getItems,
    getBoard,
    updateBoard
  };
})();