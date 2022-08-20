// @ts-check
import { RollDice } from "../RollDice.js";

//
// Functions
//

//
// Inits & Event Listeners
//

if ("customElements" in window) {
  customElements.define("roll-dice", RollDice);
}
