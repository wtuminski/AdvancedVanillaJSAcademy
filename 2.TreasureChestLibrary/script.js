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
   * @returns {void}
   */
  Constructor.prototype.addBronze = function (bronze) {
    this.bronze += bronze;
  };

  /**
   * Add stolen silver
   * @param {number} silver The number of stolen silver
   * @returns {void}
   */
  Constructor.prototype.addSilver = function (silver) {
    this.silver += silver;
  };

  /**
   * Add stolen gold
   * @param {number} gold The number of stolen gold
   * @returns {void}
   */
  Constructor.prototype.addGold = function (gold) {
    this.gold += gold;
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

  return Constructor;
})();

// @ts-ignore
window.TreasureChest = TreasureChest;
