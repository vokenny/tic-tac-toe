import { GameBoard } from './GameBoard.mjs';

export const GameController = (function () {
  'use strict';

  /* 
    - Manages presentation logic
    - GameController triggers GameBoard logic and state changes
  */

  /* Sword and Shield icons */
  const SWORD_ICON = '<img src="./assets/swords.png" alt="Sword icon" class="player-icon">';
  const SHIELD_ICON = '<img src="./assets/shield.png" alt="Shield icon" class="player-icon">';

  /* DOCUMENT SELECTORS */
  const game = document.querySelector('#game');

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

  const displayBoard = () => game.append(...createGridUnits());

  const select = (gridUnit, playerValue, callback) => {
    // Only mark a unit if it's not already taken
    // .nodeName check is in case they click on the img on top of the div
    if (!gridUnit.innerHTML && gridUnit.nodeName === 'DIV') {
      gridUnit.innerHTML = playerValue === 'Sword' ? SWORD_ICON : SHIELD_ICON;
      GameBoard.updateBoard(gridUnit, playerValue);
      callback();
    }
  }

  return {
    displayBoard,
    select
  }
})();