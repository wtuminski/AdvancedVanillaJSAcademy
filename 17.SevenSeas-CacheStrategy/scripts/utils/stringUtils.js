// @ts-check
/**
 * @param {string} value
 * @param {string[]} searchStrings
 */
export const includesOneOf = (value, searchStrings) =>
  searchStrings.some((searchString) => value.includes(searchString));
