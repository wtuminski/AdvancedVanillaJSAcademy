// @ts-check
import { registerServiceWorker } from "../helpers.js";
import { createTreasure, showLoot } from "../treasureUtils.js";

//
// Inits & Event Listeners
//
registerServiceWorker("./sw.js");

// Hold the treasure instance
const treasure = createTreasure();
showLoot(treasure);
