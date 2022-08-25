(function () {
  'use strict';

  /**
   * Randomly shuffle an array
   * https://stackoverflow.com/a/2450976/1293256
   * @param  {Array} array The array to shuffle
   * @return {Array}       The shuffled array
   */
  const shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  /** @param {string} path */
  const registerServiceWorker = (path) => {
    if (navigator && navigator.serviceWorker) {
      navigator.serviceWorker.register("./sw.js");
    }
  };

  // @ts-check

  class TreasureChest {
    #bronze;
    #silver;
    #gold;
    #loot;

    /**
     * Create the constructor object
     * @param {Object} options User settings
     */
    constructor(options = {}) {
      // Merge options into defaults
      const { bronze, silver, gold, loot } = Object.assign(
        {
          bronze: 0,
          silver: 0,
          gold: 0,
          loot: `You have {{gold}} gold, {{silver}} silver, and {{bronze}} bronze.`,
        },
        options
      );

      // Set instance properties
      this.#bronze = bronze;
      this.#silver = silver;
      this.#gold = gold;
      this.#loot = loot;
    }

    /**
     * Emit a custom event
     * @param  {String} type   The event type
     * @param  {*}      detail Any details to pass along with the event
     * @return {boolean}
     */
    #emit(type, detail) {
      // Create a new event
      const event = new CustomEvent(type, {
        bubbles: true,
        cancelable: true,
        detail: detail,
      });

      // Dispatch the event
      return document.dispatchEvent(event);
    }

    /**
     * Add bronze to the treasure chest
     * @param {Number} n The amount to add
     * @return {TreasureChest}
     */
    addBronze(n) {
      this.#bronze += n;
      this.#emit("treasure:bronze", this);
      return this;
    }

    /**
     * Add silver to the treasure chest
     * @param {Number} n The amount to add
     * @return {TreasureChest}
     */
    addSilver(n) {
      this.#silver += n;
      this.#emit("treasure:silver", this);
      return this;
    }

    /**
     * Add gold to the treasure chest
     * @param {Number} n The amount to add
     * @return {TreasureChest}
     */
    addGold(n) {
      this.#gold += n;
      this.#emit("treasure:gold", this);
      return this;
    }

    /**
     * Get the total amount of loot as a string
     * @return {String} The total amount of loot
     */
    getLoot() {
      return this.#loot
        .replace("{{gold}}", this.#gold)
        .replace("{{silver}}", this.#silver)
        .replace("{{bronze}}", this.#bronze);
    }

    /**
     * Get the amount of bronze
     * @return {Number} The amount
     */
    getBronze() {
      return this.#bronze;
    }

    /**
     * Get the amount of silver
     * @return {Number} The amount
     */
    getSilver() {
      return this.#silver;
    }

    /**
     * Get the amount of gold
     * @return {Number} The amount
     */
    getGold() {
      return this.#gold;
    }

    /**
     * Generate random treasure
     * @return {Object} The amount and type of loot found
     */
    static random() {
      // Amount and type
      const amount = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
      ];
      const type = ["bronze", "silver", "gold"];

      // Randomize the amounts
      shuffle(amount);
      shuffle(type);

      // Return the random loot
      return {
        amount: amount[0],
        type: type[0],
      };
    }
  }

  // @ts-check
  /**
   * Create new treasure instance
   * @return {TreasureChest} A new TreasureChest instance
   */
  function createTreasure() {
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
  function showLoot(treasure) {
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
  function lootListeners(treasure) {
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

  // @ts-check

  //
  // Inits & Event Listeners
  //
  registerServiceWorker();

  // Hold the treasure instance
  const treasure = createTreasure();
  showLoot(treasure);
  lootListeners(treasure);

})();
