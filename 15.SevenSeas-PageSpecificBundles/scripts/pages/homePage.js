// @ts-check
import { createTreasure, showLoot } from "../treasureUtils.js";

//
// Inits & Event Listeners
//

// Hold the treasure instance
const treasure = createTreasure();
showLoot(treasure);
