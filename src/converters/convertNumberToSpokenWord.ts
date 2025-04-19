import { positiveInteger } from "../utils/stringBuilding/positiveInteger";
import { twoDigit } from "../utils/stringBuilding/twoDigits";
import { perDigit } from "../utils/stringBuilding/perDigit";
import { negative } from "../utils/stringBuilding/negative";
import { baseNumber } from "../interfaces/definitions";
import { exponentSpokenWord } from "../utils/stringBuilding/exponent";

/**
 * Converts a number object into its spoken word representation.
 * @param {baseNumber} num - The number object to convert.
 * @returns {string} The spoken word representation of the number.
 */
export function convertNumberToSpokenWord(num: baseNumber): string {
  const { integer, decimal, negativeInt, exponent } = num;

  let sentence = negative(negativeInt);

  sentence += positiveInteger(parseInt(integer)) + " ";

  if (decimal !== undefined) {
    sentence += "point ";
    if (decimal.length === 1 || decimal.length > 2) {
      sentence += perDigit(decimal) + " ";
    } else {
      sentence += twoDigit(decimal) + " ";
    }
  }

  if (exponent !== undefined) {
    sentence += exponentSpokenWord(exponent, true);
  }
  return sentence.trim();
}
