// @ts-check
const TreasureChest = (() => {
  /**
   * @typedef {{gold?: number, silver?: number, bronze?: number, getCustomGetLootMessage?: ()=>string}} Options
   *
   * @constructor
   * @param {Options} options
   * @returns {void}
   */
  const Constructor = function (options) {
    this.bronze = 0;
    this.silver = 0;
    this.gold = 0;
    /** @type {undefined | (()=>string)} */
    this.getCustomGetLootMessage = undefined;
    Object.assign(this, options);
  };

  /**
   * Add stolen bronze
   * @param {number} bronze The number of stolen bronze
   * @returns {Constructor}
   */
  Constructor.prototype.addBronze = function (bronze) {
    this.bronze += bronze;
    return this;
  };

  /**
   * Add stolen silver
   * @param {number} silver The number of stolen silver
   * @returns {Constructor}
   */
  Constructor.prototype.addSilver = function (silver) {
    this.silver += silver;
    return this;
  };

  /**
   * Add stolen gold
   * @param {number} gold The number of stolen gold
   * @returns {Constructor}
   */
  Constructor.prototype.addGold = function (gold) {
    this.gold += gold;
    return this;
  };

  /**
   * Add stolen bronze
   * @returns {string}
   */
  Constructor.prototype.getLoot = function () {
    return (
      this.getCustomGetLootMessage?.() ??
      `Amount of bronze: ${this.bronze}; 
  Amount of silver: ${this.silver}; 
  Amount of gold: ${this.gold}; 
  Total loot: ${this.bronze + this.silver + this.gold}`
    );
  };

  const numbers = Array.from(Array(50)).map((_, index) => index + 1);
  /**
   * Randomly shuffle an array
   * @param  {Array} array The array to shuffle
   * @return {Array}       A new shuffled array
   */
  function shuffle(array) {
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
  Constructor.getRandomLoot = function () {
    return shuffle(numbers)[0];
  };

  return Constructor;
})();

// @ts-ignore
window.TreasureChest = TreasureChest;
