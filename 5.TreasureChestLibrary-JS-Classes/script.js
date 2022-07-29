// @ts-check
class TreasureChest {
  /**
   * @typedef {{gold?: number, silver?: number, bronze?: number, getCustomGetLootMessage?: ()=>string}} Options
   *
   * @constructor
   * @param {Options} options
   */
  constructor(options) {
    let { bronze, gold, silver, getCustomGetLootMessage } = {
      bronze: 0,
      silver: 0,
      gold: 0,
      ...options,
    };

    Object.defineProperties(this, {
      bronze: {
        /** @param {number} newBronze*/
        set: (newBronze) => {
          if (typeof newBronze !== "number")
            throw new TypeError("Provided bronze must be a number.");
          bronze = newBronze;
        },
        get: () => bronze,
      },
      silver: {
        /** @param {number} newSilver*/
        set: (newSilver) => {
          if (typeof newSilver !== "number")
            throw new TypeError("Provided silver must be a number.");
          silver = newSilver;
        },
        get: () => silver,
      },
      gold: {
        /** @param {number} newGold*/
        set: (newGold) => {
          if (typeof newGold !== "number")
            throw new TypeError("Provided gold must be a number.");
          gold = newGold;
        },
        get: () => gold,
      },
      _getCustomGetLootMessage: {
        value: getCustomGetLootMessage,
      },
    });

    // Type definitions
    /** @type {number} */
    // @ts-ignore
    this.bronze;
    /** @type {number} */
    // @ts-ignore
    this.silver;
    /** @type {number} */
    // @ts-ignore
    this.gold;
    /** @type {undefined | (()=>string)} */
    this._getCustomGetLootMessage;
  }

  /**
   * Add stolen bronze
   * @param {number} bronze The number of stolen bronze
   * @returns {TreasureChest}
   */
  addBronze = function (bronze) {
    this.bronze += bronze;
    return this;
  };

  /**
   * Add stolen silver
   * @param {number} silver The number of stolen silver
   * @returns {TreasureChest}
   */
  addSilver = function (silver) {
    this.silver += silver;
    return this;
  };

  /**
   * Add stolen gold
   * @param {number} gold The number of stolen gold
   * @returns {TreasureChest}
   */
  addGold = function (gold) {
    this.gold += gold;
    return this;
  };

  /**
   * Add stolen bronze
   * @returns {string}
   */
  getLoot = function () {
    return (
      this._getCustomGetLootMessage?.() ??
      `Amount of bronze: ${this.bronze}; 
  Amount of silver: ${this.silver}; 
  Amount of gold: ${this.gold}; 
  Total loot: ${this.bronze + this.silver + this.gold}`
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
