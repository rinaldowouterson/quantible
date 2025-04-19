import { convertNumberToSpokenWord } from "./convertNumberToSpokenWord";
import { toRegularInteger } from "../utils/parseSuperscript";
import { baseScientific } from "../interfaces/definitions";

/**
 * Converts a scientific expression object into its spoken word representation.
 * @param {baseScientific} expression - The scientific expression object to convert.
 * @returns {string} The spoken word representation of the scientific expression.
 */
export function convertScientificExpressionToSpokenWord(expression: baseScientific): string {
  const { integer, decimal, exponent, negativeInt } = expression;

  const isNegativeExponent = exponent.startsWith("-") || exponent.startsWith("⁻");

  let E = "times ten to the power of ";

  let sentence =
    convertNumberToSpokenWord({
      integer,
      decimal,
      negativeInt,
      matchType: "number",
      input: "",
      index: 0,
    }) +
    " " +
    E +
    convertNumberToSpokenWord({
      decimal: undefined,
      negativeInt: isNegativeExponent,
      integer: toRegularInteger(isNegativeExponent ? exponent.slice(1) : exponent),
      matchType: "number",
      input: "",
      index: 0,
    });

  return sentence.trim();
}
