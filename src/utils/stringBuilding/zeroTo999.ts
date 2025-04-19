import { numbers } from "../../config/default";

/**
 * Converts a number less than 1000 into words.
 * @param num The number to convert (0-999).
 * @returns The word representation of the number.
 */

export function zeroTo999(num: number): string {
  if (num === 0) {
    return "";
  }

  let words = "";

  if (num >= 100) {
    words += numbers.ones[Math.floor(num / 100)] + " hundred";
    num %= 100;
    if (num > 0) {
      words += " ";
    }
  }

  if (num >= 20) {
    words += numbers.tens[Math.floor(num / 10)];
    num %= 10;
    if (num > 0) {
      words += " " + numbers.ones[num];
    }
  } else if (num >= 10) {
    words += numbers.teens[num - 10];
  } else if (num > 0) {
    words += numbers.ones[num];
  }

  return words;
}
