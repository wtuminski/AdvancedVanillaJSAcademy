// @ts-check
import { registerServiceWorker } from "../helpers.js";
import { RollDice } from "../RollDice.js";

//
// Inits & Event Listeners
//

registerServiceWorker("sw.js");

if ("customElements" in window) {
  customElements.define("roll-dice", RollDice);
}
