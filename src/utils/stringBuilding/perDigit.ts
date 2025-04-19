import { positiveInteger } from "./positiveInteger";

/**
 * Converts each digit in a number to words, and returns them as a joined string.
 * @param num The number to convert, as a string.
 * @returns A string of space-separated words, where each word is a digit in the original number.
 * @example convertPerDigit("123") => "one two three"
 */

export function perDigit(num: string): string {
  const words = [];
  for (let i = 0; i < num.length; i++) {
    words.push(positiveInteger(parseInt(num[i])));
  }
  return words.join(" ");
}
