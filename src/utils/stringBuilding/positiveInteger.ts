import { numbers } from "../../config/default";
import { zeroTo999 } from "./zeroTo999";

/**
 * Converts a non-negative integer into its full English word representation.
 * @param num The integer to convert.
 * @returns The word representation of the number, or an error message for invalid input.
 */

export function positiveInteger(num: number): string {
  if (typeof num !== "number" || !Number.isInteger(num) || num < 0) {
    return "Invalid input: Please provide a non-negative integer.";
  }

  if (num === 0) {
    return "zero";
  }

  let words = "";
  let scaleIndex = 0;

  while (num > 0) {
    if (num % 1000 !== 0) {
      const upToHundreds = zeroTo999(num % 1000);
      const magnitudeScale = numbers.scales[scaleIndex] ? " " + numbers.scales[scaleIndex] : "";
      words = upToHundreds + magnitudeScale + (words ? " " + words : "");
    }
    num = Math.floor(num / 1000);
    scaleIndex++;
  }

  return words.trim().replace(/\s+/g, " ");
}
