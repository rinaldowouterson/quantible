import { math } from "../config/default";
import { baseOperator } from "../interfaces/definitions";

/**
 * Converts an operator object into its spoken word representation.
 * @param {baseOperator} operatorObject - The operator object to convert.
 * @returns {string} The spoken word representation of the operator.
 */
export function convertOperatorToSpokenWord(operatorObject: baseOperator): string {
  const { input } = operatorObject;
  if (input === undefined) {
    return "";
  }
  return math[input as keyof typeof math];
}
