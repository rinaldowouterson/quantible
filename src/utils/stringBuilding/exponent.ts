import { toRegularInteger } from "../parseSuperscript";
import { positiveInteger } from "./positiveInteger";

/** * Converts an exponent integer to its spoken word representation, * optionally using "squared" and "cubed" for exponents 2 and 3. * @param exponent The exponent value as an integer. * @param onlyUsePowerOf A boolean flag. If false, uses "squared" for 2 and "cubed" for 3. * If true, uses "to the power of two", "to the power of three", etc. * @returns The spoken word representation of the exponent. */

export function exponentSpokenWord(exponent: string, onlyUsePowerOf: boolean = false): string {
  const isNegative = exponent.startsWith("-") || exponent.startsWith("⁻");
  let newExponentString = toRegularInteger(isNegative ? exponent.slice(1) : exponent);
  if (!onlyUsePowerOf && !isNegative) {
    if (newExponentString === "2") {
      return "squared";
    }
    if (newExponentString === "3") {
      return "cubed";
    }
  }
  let res = "to the power of " + (isNegative ? "negative " : "") + positiveInteger(parseInt(newExponentString));
  return res;
}
