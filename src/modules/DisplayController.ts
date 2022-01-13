import Player from '../interfaces/player';
import GameBoard from './GameBoard';

const gameBoard = GameBoard();

export default function DisplayController() {
  'use strict';

  /*
    - DisplayController is triggered by GameController
    - Manages presentation logic
  */

  const game: HTMLElement = document.querySelector('#game');
  const header: HTMLElement = document.querySelector('#header');
  const activePlayerReadout: HTMLElement =
    document.querySelector('#active-player');
  const results: HTMLElement = document.querySelector('#results');
  const getRestartButton = (): HTMLElement =>
    document.querySelector('#restart');
  const getGridUnits = (): NodeListOf<HTMLElement> =>
    document.querySelectorAll('.grid-unit');

  const RESTART_TEMPLATE: string = `<button id="restart">Restart</button>`;
  const DRAW_TEMPLATE: string = `<h1 class="result-heading">IT'S A DRAW!</h1> ${RESTART_TEMPLATE}`;
  const WIN_TEMPLATE = (winner: string): string =>
    `<h1 class="result-heading">${winner} wins!</h1> ${RESTART_TEMPLATE}`;

  function createGridUnits(): HTMLElement[] {
    function createGridUnit(idx: number): HTMLElement {
      const gridUnit: HTMLElement = document.createElement('div');
      gridUnit.classList.add('grid-unit');
      gridUnit.dataset.id = idx.toString();

      return gridUnit;
    }

    const gridUnits: HTMLElement[] = gameBoard
      .getBoard()
      .map((_: string, idx: number): HTMLElement => createGridUnit(idx));
    return gridUnits;
  }

  const items = gameBoard.getItems();

  const insertHeader = (): void => {
    const swordElem: HTMLImageElement = new Image();
    swordElem.src = items.find((item) => item.name === 'SWORD').iconSrc;
    swordElem.classList.add('player-icon', 'header');

    const titleElem = document.createElement('span');
    titleElem.textContent = 'TIC TAC TOE';

    const shieldElem: HTMLImageElement = new Image();
    shieldElem.src = items.find((item) => item.name === 'SHIELD').iconSrc;
    shieldElem.classList.add('player-icon', 'header');

    header.append(swordElem, titleElem, shieldElem);
  };

  const updateActivePlayerReadout = (activePlayer: Player): void => {
    activePlayerReadout.textContent = activePlayer.marker.name + "'s turn";
  };

  const createBoard = (): void => game.append(...createGridUnits());

  const clearBoard = (): void =>
    getGridUnits().forEach((unit) => (unit.innerHTML = ''));

  const insertMarker = (player: Player, gridUnit: HTMLElement): void => {
    const imgElem: HTMLImageElement = new Image();
    imgElem.src = player.marker.iconSrc;
    imgElem.classList.add('player-icon');

    gridUnit.append(imgElem);
  };

  const showResults = (player?: Player) => {
    const playerValue: string | undefined = player?.marker?.name;
    results.classList.remove('hidden');
    results.innerHTML = playerValue ? WIN_TEMPLATE(playerValue) : DRAW_TEMPLATE;
  };

  const hideResults = () => {
    results.classList.add('hidden');
    results.innerHTML = '';
  };

  return {
    getRestartButton,
    getGridUnits,
    insertHeader,
    updateActivePlayerReadout,
    createBoard,
    clearBoard,
    insertMarker,
    showResults,
    hideResults,
  };
}
