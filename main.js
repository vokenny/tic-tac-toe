import { GameController } from './modules/GameController.mjs';

/*
  - Creating Players
  - Trigger methods on GameController to affect logic and state
  - Does not talk to GameBoard directly for logic or state
*/

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

let activePlayer = SwordPlayer;

const changeCurrentPlayer = () => activePlayer = activePlayer === SwordPlayer ? ShieldPlayer : SwordPlayer;

GameController.displayBoard();

GameController.getGridUnits().forEach(unit => unit.addEventListener('click', (evt) => {
  activePlayer.select(evt, changeCurrentPlayer);
}));