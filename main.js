import { GameController } from './modules/GameController.mjs';

/*
  - Setting event listeners, which should trigger methods on GameController
  - Should not talk to GameBoard directly for logic or state
*/

/* DOCUMENT SELECTORS */
const gridUnits = () => document.querySelectorAll('.grid-unit');

const PlayerFactory = mode => {
  const value = mode;
  const select = (evt, callback) => GameController.select(evt.target, value, callback);

  return {
    select
  };
}

const SwordPlayer = PlayerFactory('Sword');
const ShieldPlayer = PlayerFactory('Shield');

let currentPlayer = SwordPlayer;

const changeCurrentPlayer = () => currentPlayer = currentPlayer === SwordPlayer ? ShieldPlayer : SwordPlayer;

GameController.displayBoard();

gridUnits().forEach(unit => unit.addEventListener('click', (evt) => {
  currentPlayer.select(evt, changeCurrentPlayer)
}));