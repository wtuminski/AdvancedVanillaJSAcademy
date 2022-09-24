// @ts-check
import { registerServiceWorker } from "../utils/serviceWorkerUtils.js";
import { createTreasure, showLoot } from "../utils/treasureUtils.js";

//
// Inits & Event Listeners
//
registerServiceWorker("sw.js");

// Hold the treasure instance
const treasure = createTreasure();
showLoot(treasure);
