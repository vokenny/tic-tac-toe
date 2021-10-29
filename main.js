import { GameController } from './modules/GameController.mjs';

/*
  - Setting event listeners, which should trigger methods on GameController
  - Should not talk to GameBoard directly for logic or state
*/

/* DOCUMENT SELECTORS */
const gridUnits = () => document.querySelectorAll('.grid-unit');

const PlayerFactory = item => {
  const value = item;
  const select = (evt, callback) => GameController.select(evt.target, value, callback);

  return {
    select
  };
}

const ITEMS = GameController.getItems();
const SwordPlayer = PlayerFactory(ITEMS.SWORD.value);
const ShieldPlayer = PlayerFactory(ITEMS.SHIELD.value);

let currentPlayer = SwordPlayer;

const changeCurrentPlayer = () => currentPlayer = currentPlayer === SwordPlayer ? ShieldPlayer : SwordPlayer;

GameController.displayBoard();

gridUnits().forEach(unit => unit.addEventListener('click', (evt) => {
  currentPlayer.select(evt, changeCurrentPlayer)
}));