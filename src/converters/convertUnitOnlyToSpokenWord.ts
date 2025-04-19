import { units } from "../config/default";
import { Unit } from "../interfaces/configurations/default";
import { exponentSpokenWord } from "../utils/stringBuilding/exponent";
import { baseUnitOnly } from "../interfaces/definitions";

/**
 * Converts a unit-only object into its spoken word representation.
 * @param {baseUnitOnly} unitOnlyObject - The unit-only object to convert.
 * @returns {string} The spoken word representation of the unit.
 */
export function convertUnitOnlyToSpokenWord(unitOnlyObject: baseUnitOnly): string {
  const { unit, unitExponent } = unitOnlyObject;

  let spokenUnit: Unit;

  spokenUnit = units[unit];

  let result: string = "";
  if (spokenUnit === undefined) {
    return "";
  }

  if (unitExponent !== undefined) {
    result = spokenUnit.singular + " " + exponentSpokenWord(unitExponent);
  } else {
    result = spokenUnit.singular;
  }
  return result;
}
