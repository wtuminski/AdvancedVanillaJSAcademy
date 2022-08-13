// @ts-check
/**
 * Dice library
 */

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
 * Get function that returns number in range between 1 and provided max number (integer)
 * @param  {number} maxNumber    The maxiumum number in range, which must be an integer
 * @return {()=>number}          A function returning random number from the array
 */
function getRollInRange(maxNumber) {
  const numbers = getNumbersInRange(maxNumber);
  return () => shuffle(numbers)[0];
}

const d2 = getRollInRange(2);
const d4 = getRollInRange(4);
const d6 = getRollInRange(6);
const d8 = getRollInRange(8);
const d10 = getRollInRange(10);
const d12 = getRollInRange(12);
const d20 = getRollInRange(20);

/**
 * @param {number} maxNumber The maxiumum number in range, which must be an integer
 * @returns  {number} A random number in provided range
 */
const rollInRange = (maxNumber) => getRollInRange(maxNumber)();

export { d2, d4, d6, d8, d10, d12, d20, rollInRange };
