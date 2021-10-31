export const GameBoard = (function () {
  'use strict';

  /* GameBoard manages the state of the board */

  const ITEMS = {
    SWORD: {
      value: 'SWORD',
      icon: '<img src="./assets/swords.png" alt="Sword icon" class="player-icon">'
    },
    SHIELD: {
      value: 'SHIELD',
      icon: '<img src="./assets/shield.png" alt="Shield icon" class="player-icon">'
    }
  }

  const winCombinations = [
    [0, 1, 2], // Horiz
    [3, 4, 5], // Horiz
    [6, 7, 8], // Horiz
    [0, 3, 6], // Vert
    [1, 4, 7], // Vert
    [2, 5, 8], // Vert
    [0, 4, 8], // Diag
    [2, 4, 6]  // Diag
  ]

  let board = [...Array(9)];
  let hasWinner = false;
  let boardIsFull = false;

  const getItems = () => ITEMS;
  const getBoard = () => board;
  const getBoardIsFull = () => boardIsFull;

  const updateBoard = (gridUnit, player) => {
    const playerValue = player.getValue();
    board[gridUnit.dataset.id] = playerValue;
    checkWinner(player);
    checkBoardIsFull();
  }

  const checkWinner = (player) => {
    const playerValue = player.getValue();
    const hasThreeInARow = winCombinations.some(positions => {
      return positions.every(position => board[position] === playerValue);
    });

    hasWinner = hasThreeInARow;
  }

  const checkBoardIsFull = () => boardIsFull = board.every(position => position);

  const getHasWinner = () => hasWinner;

  const restart = () => {
    board = [...Array(9)];
    hasWinner = false;
  }

  return {
    getItems,
    getBoard,
    getBoardIsFull,
    updateBoard,
    getHasWinner,
    restart
  };
})();