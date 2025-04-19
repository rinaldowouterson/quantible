import { units } from "../config/default";
import { baseNumberUnit } from "../interfaces/definitions";
import { Unit } from "../interfaces/configurations/default";
import { exponentSpokenWord } from "../utils/stringBuilding/exponent";
import { convertNumberToSpokenWord } from "./convertNumberToSpokenWord";

/**
 * Converts a numeric unit object into its spoken word representation.
 * @param {baseNumberUnit} numericUnit - The numeric unit object to convert.
 * @returns {string} The spoken word representation of the numeric unit.
 */
export function convertNumericUnitToSpokenWord(numericUnit: baseNumberUnit): string {
  const { integer, decimal, unit, negativeInt, exponent, unitExponent } = numericUnit;

  let sentence = convertNumberToSpokenWord({
    integer,
    decimal,
    negativeInt,
    matchType: "number",
    input: "",
    index: 0,
  });

  let spokenUnit: Unit;

  let directUnitKey = unit + (unitExponent !== undefined ? unitExponent : "");

  let directUnit = units[directUnitKey];

  if (directUnit !== undefined) {
    spokenUnit = directUnit;
  } else {
    spokenUnit = units[unit];
  }

  if (spokenUnit === undefined) {
    return "";
  }

  let isPlural = parseFloat(integer + "." + decimal) > 1 && spokenUnit.plural;

  let spokenNumberExponent: string = "";
  let spokenUnitExponent: string = "";

  if (exponent !== undefined) {
    spokenNumberExponent = exponentSpokenWord(exponent, true);
  }

  if (unitExponent !== undefined && directUnit === undefined) {
    spokenUnitExponent = exponentSpokenWord(unitExponent);
  }

  sentence +=
    " " + spokenNumberExponent + " " + (isPlural ? spokenUnit.plural : spokenUnit.singular) + " " + spokenUnitExponent;

  sentence = sentence.trim().replace(/\s+/g, " ");

  return sentence;
}
