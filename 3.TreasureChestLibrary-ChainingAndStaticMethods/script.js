// @ts-check
const TreasureChest = (() => {
  const Constructor = function () {
    this.bronze = 0;
    this.silver = 0;
    this.gold = 0;
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
    return `Amount of bronze: ${this.bronze}; 
  Amount of silver: ${this.silver}; 
  Amount of gold: ${this.gold}; 
  Total loot: ${this.bronze + this.silver + this.gold}`;
  };

  const numbers = Array.from(Array(50)).map((_, index) => index + 1);
  /**
   * Add stolen bronze
   * @returns {number}
   */
  Constructor.getRandomLoot = function () {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    return numbers[randomIndex];
  };

  return Constructor;
})();

// @ts-ignore
window.TreasureChest = TreasureChest;
