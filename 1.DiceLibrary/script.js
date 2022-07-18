// @ts-check
/**
 * Dice library
 */
const roll = (() => {
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
   * Get array with numbers in range between 1 and provided max number (integer)
   * @param  {number} maxNumber    The maxiumum number in range, which must be an integer
   * @return {Array<number>}       An array of number in range
   */
  function getNumbersInRange(maxNumber) {
    const parsedMaxNumber = Math.floor(maxNumber);
    if (isNaN(Number(maxNumber)))
      throw new Error("Provided argument must be an integer");
    return Array.from(Array(maxNumber)).map((_, index) => index + 1);
  }

  /**
   * Get array with numbers in range between 1 and provided max number (integer)
   * @param  {number} maxNumber    The maxiumum number in range, which must be an integer
   * @return {number}              An array of number in range
   */
  function rollInRange(maxNumber) {
    return shuffle(getNumbersInRange(maxNumber))[0];
  }

  return {
    d2: () => rollInRange(2),
    d4: () => rollInRange(4),
    d6: () => rollInRange(6),
    d8: () => rollInRange(8),
    d10: () => rollInRange(10),
    d12: () => rollInRange(12),
    d20: () => rollInRange(20),
    rollInRange,
  };
})();

// @ts-ignore
window.roll = roll;
