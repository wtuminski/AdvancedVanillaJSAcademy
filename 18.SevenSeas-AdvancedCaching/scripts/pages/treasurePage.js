// @ts-check
import { registerServiceWorker } from "../utils/serviceWorkerUtils.js";
import {
  createTreasure,
  lootListeners,
  showLoot,
} from "../utils/treasureUtils.js";

//
// Inits & Event Listeners
//
registerServiceWorker("sw.js");

// Hold the treasure instance
const treasure = createTreasure();
showLoot(treasure);
lootListeners(treasure);
