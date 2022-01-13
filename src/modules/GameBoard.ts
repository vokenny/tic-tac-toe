import Item from '../interfaces/item';
import Player from '../interfaces/player';

export default function GameBoard() {
  'use strict';

  /* GameBoard manages the state of the board */

  const swordIcon = require('../assets/images/swords.png');
  const shieldIcon = require('../assets/images/shield.png');

  const ITEMS: Item[] = [
    {
      name: 'SWORD',
      iconSrc: swordIcon,
    },
    {
      name: 'SHIELD',
      iconSrc: shieldIcon,
    },
  ];

  const winCombinations: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diag
    [2, 4, 6], // Diag
  ];

  let board: string[] = [...Array(9)];
  let hasWinner: boolean = false;
  let boardIsFull: boolean = false;

  const getItems = (): Item[] => ITEMS;
  const getBoard = (): string[] => board;
  const getBoardIsFull = (): boolean => boardIsFull;

  const updateBoard = (gridUnit: HTMLElement, player: Player): void => {
    const playerMarker: string = player.marker.name;
    const boardPosition: number = parseInt(gridUnit.dataset.id);
    board[boardPosition] = playerMarker;

    checkWinner(player);
    checkBoardIsFull();
  };

  const checkWinner = (player: Player): void => {
    const playerMarker = player.marker.name;
    const hasThreeInARow = winCombinations.some((positions) => {
      return positions.every((position) => board[position] === playerMarker);
    });

    hasWinner = hasThreeInARow;
  };

  const checkBoardIsFull = (): boolean =>
    (boardIsFull = board.every((position) => position));

  const getHasWinner = (): boolean => hasWinner;

  const restart = (): void => {
    board = [...Array(9)];
    hasWinner = false;
    boardIsFull = false;
  };

  return {
    getItems,
    getBoard,
    getBoardIsFull,
    updateBoard,
    getHasWinner,
    restart,
  };
}
