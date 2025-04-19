import { positiveInteger } from "./positiveInteger";

/**
 * Converts a given number of cents to words, provided it is a valid number between 0 and 99.
 * @param num The number of cents to convert, as a string.
 * @returns The word representation of the number of cents, or an empty string if the conversion failed.
 */

export function twoDigit(num: string): string {
  if (num.trim().length !== 2) return "";
  let parsed = parseInt(num);

  if (parsed < 100 && parsed >= 0) return positiveInteger(parsed);
  return "";
}
