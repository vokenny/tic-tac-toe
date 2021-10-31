import { DisplayController } from './DisplayController.mjs';
import { GameBoard } from './GameBoard.mjs';

export const GameController = (function () {
  'use strict';

  /* 
    - Creates Players
    - Manages the game logic
    - Triggers presentation changes in Display Controller
    - Triggers state changes in GameBoard
  */

  const PlayerFactory = item => {
    const value = item;
    const getValue = () => item;
    const select = (evt, callback) => GameController.select(evt.target, value, callback);

    return {
      getValue,
      select
    }
  }

  const ITEMS = GameBoard.getItems();
  const SwordPlayer = PlayerFactory(ITEMS.SWORD.value);
  const ShieldPlayer = PlayerFactory(ITEMS.SHIELD.value);

  let activePlayer = SwordPlayer;

  const changeActivePlayer = () => activePlayer = activePlayer === SwordPlayer ? ShieldPlayer : SwordPlayer;

  const setUpGame = () => {
    DisplayController.updateActivePlayerReadout(activePlayer);
    DisplayController.createBoard();
    DisplayController.getGridUnits().forEach(unit => unit.addEventListener('click', select));
  }

  const select = (evt) => {
    const gridUnit = evt.target;
    const playerValue = activePlayer.getValue();

    // Only mark a unit if it's not already taken
    // .nodeName check is in case they click on the img on top of the div
    if (!gridUnit.innerHTML && gridUnit.nodeName === 'DIV') {
      gridUnit.innerHTML = playerValue === ITEMS.SWORD.value ? ITEMS.SWORD.icon : ITEMS.SHIELD.icon;

      GameBoard.updateBoard(gridUnit, activePlayer);

      if (!hasGameEnded(activePlayer)) {
        changeActivePlayer();
        DisplayController.updateActivePlayerReadout(activePlayer);
      }
    }
  }

  const hasGameEnded = (player) => {
    if (GameBoard.getHasWinner()) {
      DisplayController.showResults(player);
      DisplayController.getRestartButton().addEventListener('click', restart);
      return true;
    }

    if (GameBoard.getBoardIsFull()) {
      GameBoard.getHasWinner() ? DisplayController.showResults(player) : DisplayController.showResults();
      DisplayController.getRestartButton().addEventListener('click', restart);
      return true;
    }

    return false;
  }

  const restart = () => {
    GameBoard.restart();
    DisplayController.clearBoard();
    DisplayController.hideResults();
  }

  setUpGame(); // Runs immediately inside IIFE

  return {
    select,
    restart
  }
})();