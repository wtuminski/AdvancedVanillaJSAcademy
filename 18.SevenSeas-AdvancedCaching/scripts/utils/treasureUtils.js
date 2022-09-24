// @ts-check
import { TreasureChest } from "../TreasureChest";
/**
 * Create new treasure instance
 * @return {TreasureChest} A new TreasureChest instance
 */
export function createTreasure() {
  // Get any saved loot from localStorage
  const savedLoot = JSON.parse(localStorage.getItem("ss-treasure") ?? "{}");

  // Create new Treasure Chest instance
  return new TreasureChest(savedLoot);
}

/**
 * Display the amount of loot in the UI
 * @param  {TreasureChest} treasure The TreasureChest object
 * @return {void}
 */
export function showLoot(treasure) {
  const loot = document.querySelector("#loot");
  if (!loot) return;
  loot.textContent = treasure.getLoot();
}

/**
 * Save loot to localStorage and update the UI
 * @param  {Event} event The event object
 * @return {void}
 */
function saveLoot(event) {
  /** @type {TreasureChest} */
  // @ts-ignore
  const eventTreasure = event.detail;

  // Create the treasure object
  const treasure = {
    gold: eventTreasure.getGold(),
    silver: eventTreasure.getSilver(),
    bronze: eventTreasure.getBronze(),
  };

  // Save it to localStorage
  localStorage.setItem("ss-treasure", JSON.stringify(treasure));

  // Update the UI

  showLoot(eventTreasure);
}

/**
 * Handle treasure submit events
 * @param  {Event} event The event object
 * @param {TreasureChest} treasure
 * @return {void}
 */
function submitHandler(event, treasure) {
  // Get the coin type
  // Only run on [data-treasure] forms
  if (!(event.target instanceof HTMLElement)) return;

  const coin = event.target?.getAttribute("data-treasure");
  if (!coin) return;

  // Stop the form from reloading the page
  event.preventDefault();

  // Get coin value
  // @ts-ignore
  const val = parseFloat(event.target?.querySelector('[type="number"]').value);
  if (!val) return;

  // Add the correct loot
  if (coin === "gold") {
    treasure.addGold(val);
  } else if (coin === "silver") {
    treasure.addSilver(val);
  } else if (coin === "bronze") {
    treasure.addBronze(val);
  }
}

/**
 * Listen for loot events
 * @param {TreasureChest} treasure
 * @return {void}
 */
export function lootListeners(treasure) {
  /**
   * @param {Event} event
   */

  document.addEventListener("submit", (event) =>
    submitHandler(event, treasure)
  );
  document.addEventListener("treasure:gold", saveLoot);
  document.addEventListener("treasure:silver", saveLoot);
  document.addEventListener("treasure:bronze", saveLoot);
}
