// @ts-check

/**
 * @typedef {'treasure:gold' | 'treasure:silver' | 'treasure:bronze'} CustomEventType
 */

class TreasureChest {
  #bronze;
  #silver;
  #gold;
  #getCustomLootMessage;

  /**
   * @typedef {{gold?: number, silver?: number, bronze?: number, getCustomLootMessage?: ()=>string}} Options
   *
   * @constructor
   * @param {Options=} options
   */
  constructor(options) {
    let { bronze, gold, silver, getCustomLootMessage } = {
      bronze: 0,
      silver: 0,
      gold: 0,
      ...options,
    };

    this.#bronze = bronze;
    this.#silver = silver;
    this.#gold = gold;
    this.#getCustomLootMessage = getCustomLootMessage;
  }

  get bronze() {
    return this.#bronze;
  }

  get silver() {
    return this.#silver;
  }

  get gold() {
    return this.#gold;
  }

  /**
   * @param {CustomEventType} eventName
   * @param {CustomEventInit} eventOptions
   */
  #emitEvent(eventName, eventOptions) {
    const event = new CustomEvent(eventName, {
      ...eventOptions,
      bubbles: true,
      cancelable: true,
    });

    return document.dispatchEvent(event);
  }

  /**
   * Add stolen bronze
   * @param {number} bronze The number of stolen bronze
   * @returns {TreasureChest}
   * @this {TreasureChest}
   */
  addBronze = function (bronze) {
    if (typeof bronze !== "number")
      throw new TypeError("Provided bronze must be a number.");
    this.#bronze += bronze;
    this.#emitEvent("treasure:bronze", {
      detail: "Bronze was added to your treasure chest",
    });
    return this;
  };

  /**
   * Add stolen silver
   * @param {number} silver The number of stolen silver
   * @returns {TreasureChest}
   * @this {TreasureChest}
   */
  addSilver = function (silver) {
    if (typeof silver !== "number")
      throw new TypeError("Provided silver must be a number.");
    this.#silver += silver;
    this.#emitEvent("treasure:silver", {
      detail: "Silver was added to your treasure chest",
    });
    return this;
  };

  /**
   * Add stolen gold
   * @param {number} gold The number of stolen gold
   * @returns {TreasureChest}
   * @this {TreasureChest}
   */
  addGold = function (gold) {
    if (typeof gold !== "number")
      throw new TypeError("Provided gold must be a number.");
    this.#gold += gold;
    this.#emitEvent("treasure:gold", {
      detail: "Gold was added to your treasure chest",
    });
    return this;
  };

  /**
   * Add stolen bronze
   * @returns {string}
   * @this {TreasureChest}
   */
  getLoot = function () {
    return (
      this.#getCustomLootMessage?.() ??
      `Amount of bronze: ${this.#bronze}; 
  Amount of silver: ${this.#silver}; 
  Amount of gold: ${this.#gold}; 
  Total loot: ${this.#bronze + this.#silver + this.#gold}`
    );
  };

  static #numbers = Array.from(Array(50)).map((_, index) => index + 1);
  /**
   * Randomly shuffle an array
   * @param  {Array} array The array to shuffle
   * @return {Array}       A new shuffled array
   */
  static #shuffle(array) {
    if (!Array.isArray(array))
      throw new Error("Provided argument must be an array");
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  /**
   * Add stolen bronze
   * @returns {number}
   */
  static getRandomLoot = function () {
    return this.#shuffle(this.#numbers)[0];
  };
}

// @ts-ignore
window.TreasureChest = TreasureChest;

// Listen for custom event
/**
 * @param {CustomEventType} eventName
 */
const addCustomEventListener = (eventName) => {
  /**
   * @param {CustomEvent | Event} event
   */
  const eventHandler = (event) => {
    const message =
      event instanceof CustomEvent
        ? event.detail
        : "Some loot was added to your treasure chest";
    console.log(message, event);
  };
  document.addEventListener(eventName, eventHandler);
};

addCustomEventListener("treasure:gold");
addCustomEventListener("treasure:silver");
addCustomEventListener("treasure:bronze");
