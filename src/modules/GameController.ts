import Item from '../interfaces/item';
import Player from '../interfaces/player';
import DisplayController from './DisplayController';
import GameBoard from './GameBoard';

const gameBoard = GameBoard();
const displayCtrl = DisplayController();

export default function GameController() {
  'use strict';

  /*
    - Creates Players
    - Manages the game logic
    - Triggers presentation changes in DisplayController
    - Triggers state changes in GameBoard
  */

  function PlayerFactory(itemName: string): Player {
    const marker: Item = ITEMS.find((item) => item.name === itemName);

    return { marker };
  }

  const ITEMS: Item[] = gameBoard.getItems();
  const SwordPlayer: Player = PlayerFactory('SWORD');
  const ShieldPlayer: Player = PlayerFactory('SHIELD');

  let activePlayer: Player = SwordPlayer;

  const changeActivePlayer = (): void => {
    activePlayer = activePlayer === SwordPlayer ? ShieldPlayer : SwordPlayer;
  };

  const setUpGame = (): void => {
    displayCtrl.insertHeader();
    displayCtrl.updateActivePlayerReadout(activePlayer);
    displayCtrl.createBoard();
    displayCtrl
      .getGridUnits()
      .forEach((unit) => unit.addEventListener('click', select));
  };

  const select = (evt: { target: any }): void => {
    const gridUnit = evt.target;

    // Only mark a unit if it's not already taken
    // .nodeName check is in case they click on the img on top of the div
    if (!gridUnit.innerHTML && gridUnit.nodeName === 'DIV') {
      displayCtrl.insertMarker(activePlayer, gridUnit);
      gameBoard.updateBoard(gridUnit, activePlayer);

      if (!hasGameEnded(activePlayer)) {
        changeActivePlayer();
        displayCtrl.updateActivePlayerReadout(activePlayer);
      }
    }
  };

  const hasGameEnded = (player: Player): boolean => {
    if (gameBoard.getHasWinner()) {
      displayCtrl.showResults(player);
      displayCtrl.getRestartButton().addEventListener('click', restart);
      return gameBoard.getHasWinner();
    }

    if (gameBoard.getBoardIsFull()) {
      gameBoard.getHasWinner()
        ? displayCtrl.showResults(player)
        : displayCtrl.showResults();
      displayCtrl.getRestartButton().addEventListener('click', restart);
      return gameBoard.getBoardIsFull();
    }

    return gameBoard.getHasWinner() || gameBoard.getBoardIsFull();
  };

  const restart = (): void => {
    gameBoard.restart();
    displayCtrl.clearBoard();
    displayCtrl.hideResults();
    activePlayer = SwordPlayer;
  };

  setUpGame(); // Runs as soon as it is called
}
