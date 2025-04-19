import { ExtractionResult } from "../interfaces/definitions";

function isValidIntegerString(str: string | undefined, allowNegative: boolean = false): boolean {
  if (str === undefined) {
    return true;
  }
  let regex;
  if (allowNegative) {
    regex = /^(?:[\u207B\u002D]?[\d\u2070-\u2079]+)$/;
  } else {
    regex = /^[\d\u2070-\u2079]+$/;
  }
  return regex.test(str);
}

/**
 * Validates an ExtractionResult object.
 *
 * Checks that the object is present, contains the required properties, and that
 * the values of those properties are of the correct type.
 *
 * If the object is invalid, throws an Error with a description of the problem.
 *
 * @param {ExtractionResult} extractionResult - The object to validate.
 */
export function validateExtractionResult(extractionResult: ExtractionResult): void {
  if (!extractionResult) {
    throw new Error("validateExtractionResult: ExtractionResult cannot be null or undefined.");
  }

  if (typeof extractionResult !== "object") {
    throw new Error("validateExtractionResult: ExtractionResult must be an object.");
  }

  if (!("input" in extractionResult)) {
    throw new Error("validateExtractionResult: ExtractionResult is missing the 'input' property.");
  }
  if (typeof extractionResult.input !== "string") {
    throw new Error("validateExtractionResult: ExtractionResult 'input' property must be a string.");
  }

  if (!("matchType" in extractionResult)) {
    throw new Error("validateExtractionResult: ExtractionResult is missing the 'matchType' property.");
  }
  if (typeof extractionResult.matchType !== "string") {
    throw new Error("validateExtractionResult: ExtractionResult 'matchType' property must be a string.");
  }

  if (!("index" in extractionResult)) {
    throw new Error("validateExtractionResult: ExtractionResult is missing the 'index' property.");
  }
  if (typeof extractionResult.index !== "number") {
    throw new Error("validateExtractionResult: ExtractionResult 'index' property must be a number.");
  }

  const { matchType } = extractionResult;

  switch (matchType) {
    case "number":
      if (!("integer" in extractionResult)) {
        throw new Error(
          "validateExtractionResult: For matchType 'number', ExtractionResult is missing the 'integer' property.",
        );
      }
      if (typeof extractionResult.integer !== "string") {
        throw new Error(
          "validateExtractionResult: For matchType 'number', ExtractionResult 'integer' property must be a string.",
        );
      }
      if (!isValidIntegerString(extractionResult.integer)) {
        throw new Error(
          "validateExtractionResult: For matchType 'number', ExtractionResult 'integer' property must contain only integers.",
        );
      }
      if (
        "decimal" in extractionResult &&
        extractionResult.decimal !== undefined &&
        typeof extractionResult.decimal !== "string"
      ) {
        throw new Error(
          "validateExtractionResult: For matchType 'number', ExtractionResult 'decimal' property must be a string if present.",
        );
      }
      if (
        "decimal" in extractionResult &&
        extractionResult.decimal !== undefined &&
        !isValidIntegerString(extractionResult.decimal)
      ) {
        throw new Error(
          "validateExtractionResult: For matchType 'number', ExtractionResult 'decimal' property must contain only integers.",
        );
      }
      if (!("negativeInt" in extractionResult)) {
        throw new Error(
          "validateExtractionResult: For matchType 'number', ExtractionResult is missing the 'negativeInt' property.",
        );
      }
      if (typeof extractionResult.negativeInt !== "boolean") {
        throw new Error(
          "validateExtractionResult: For matchType 'number', ExtractionResult 'negativeInt' property must be a boolean.",
        );
      }
      if (
        "exponent" in extractionResult &&
        extractionResult.exponent !== undefined &&
        typeof extractionResult.exponent !== "string"
      ) {
        throw new Error(
          "validateExtractionResult: For matchType 'number', ExtractionResult 'exponent' property must be a string if present.",
        );
      }
      if (
        "exponent" in extractionResult &&
        extractionResult.exponent !== undefined &&
        !isValidIntegerString(extractionResult.exponent, true)
      ) {
        throw new Error(
          "validateExtractionResult: For matchType 'number', ExtractionResult 'exponent' property must contain only integers or superscript integers (and their respective negative symbol - and ⁻).",
        );
      }
      break;

    case "symbolCurrency":
    case "codeCurrency":
      if (!("integer" in extractionResult)) {
        throw new Error(
          `validateExtractionResult: For matchType '${matchType}', ExtractionResult is missing the 'integer' property.`,
        );
      }
      if (typeof extractionResult.integer !== "string") {
        throw new Error(
          `validateExtractionResult: For matchType '${matchType}', ExtractionResult 'integer' property must be a string.`,
        );
      }
      if (!isValidIntegerString(extractionResult.integer)) {
        throw new Error(
          `validateExtractionResult: For matchType '${matchType}', ExtractionResult 'integer' property must contain only integers.`,
        );
      }
      if (
        "decimal" in extractionResult &&
        extractionResult.decimal !== undefined &&
        typeof extractionResult.decimal !== "string"
      ) {
        throw new Error(
          `validateExtractionResult: For matchType '${matchType}', ExtractionResult 'decimal' property must be a string if present.`,
        );
      }
      if (
        "decimal" in extractionResult &&
        extractionResult.decimal !== undefined &&
        !isValidIntegerString(extractionResult.decimal)
      ) {
        throw new Error(
          `validateExtractionResult: For matchType '${matchType}', ExtractionResult 'decimal' property must contain only integers.`,
        );
      }
      if (!("negativeInt" in extractionResult)) {
        throw new Error(
          `validateExtractionResult: For matchType '${matchType}', ExtractionResult is missing the 'negativeInt' property.`,
        );
      }
      if (typeof extractionResult.negativeInt !== "boolean") {
        throw new Error(
          `validateExtractionResult: For matchType '${matchType}', ExtractionResult 'negativeInt' property must be a boolean.`,
        );
      }
      if (!("currency" in extractionResult)) {
        throw new Error(
          `validateExtractionResult: For matchType '${matchType}', ExtractionResult is missing the 'currency' property.`,
        );
      }
      if (typeof extractionResult.currency !== "string") {
        throw new Error(
          `validateExtractionResult: For matchType '${matchType}', ExtractionResult 'currency' property must be a string.`,
        );
      }
      break;

    case "unit":
      if (!("integer" in extractionResult)) {
        throw new Error(
          "validateExtractionResult: For matchType 'unit', ExtractionResult is missing the 'integer' property.",
        );
      }
      if (typeof extractionResult.integer !== "string") {
        throw new Error(
          "validateExtractionResult: For matchType 'unit', ExtractionResult 'integer' property must be a string.",
        );
      }
      if (!isValidIntegerString(extractionResult.integer)) {
        throw new Error(
          "validateExtractionResult: For matchType 'unit', ExtractionResult 'integer' property must contain only integers.",
        );
      }
      if (
        "decimal" in extractionResult &&
        extractionResult.decimal !== undefined &&
        typeof extractionResult.decimal !== "string"
      ) {
        throw new Error(
          "validateExtractionResult: For matchType 'unit', ExtractionResult 'decimal' property must be a string if present.",
        );
      }
      if (
        "decimal" in extractionResult &&
        extractionResult.decimal !== undefined &&
        !isValidIntegerString(extractionResult.decimal)
      ) {
        throw new Error(
          "validateExtractionResult: For matchType 'unit', ExtractionResult 'decimal' property must contain only integers.",
        );
      }
      if (!("negativeInt" in extractionResult)) {
        throw new Error(
          "validateExtractionResult: For matchType 'unit', ExtractionResult is missing the 'negativeInt' property.",
        );
      }
      if (typeof extractionResult.negativeInt !== "boolean") {
        throw new Error(
          "validateExtractionResult: For matchType 'unit', ExtractionResult 'negativeInt' property must be a boolean.",
        );
      }
      if (!("unit" in extractionResult)) {
        throw new Error(
          "validateExtractionResult: For matchType 'unit', ExtractionResult is missing the 'unit' property.",
        );
      }
      if (typeof extractionResult.unit !== "string") {
        throw new Error(
          "validateExtractionResult: For matchType 'unit', ExtractionResult 'unit' property must be a string.",
        );
      }
      if (
        "exponent" in extractionResult &&
        extractionResult.exponent !== undefined &&
        typeof extractionResult.exponent !== "string"
      ) {
        throw new Error(
          "validateExtractionResult: For matchType 'unit', ExtractionResult 'exponent' property must be a string if present.",
        );
      }
      if (
        "exponent" in extractionResult &&
        extractionResult.exponent !== undefined &&
        !isValidIntegerString(extractionResult.exponent, true)
      ) {
        throw new Error(
          "validateExtractionResult: For matchType 'unit', ExtractionResult 'exponent' property must contain only integers or superscript integers (and their respective negative symbol - and ⁻).",
        );
      }
      if (
        "unitExponent" in extractionResult &&
        extractionResult.unitExponent !== undefined &&
        typeof extractionResult.unitExponent !== "string"
      ) {
        throw new Error(
          "validateExtractionResult: For matchType 'unit', ExtractionResult 'unitExponent' property must be a string if present.",
        );
      }
      if (
        "unitExponent" in extractionResult &&
        extractionResult.unitExponent !== undefined &&
        !isValidIntegerString(extractionResult.unitExponent, true)
      ) {
        throw new Error(
          "validateExtractionResult: For matchType 'unit', ExtractionResult 'unitExponent' property must contain only integers or superscript integers (and their respective negative symbol - and ⁻).",
        );
      }
      break;

    case "unitOnly":
      if (!("unit" in extractionResult)) {
        throw new Error(
          "validateExtractionResult: For matchType 'unitOnly', ExtractionResult is missing the 'unit' property.",
        );
      }
      if (typeof extractionResult.unit !== "string") {
        throw new Error(
          "validateExtractionResult: For matchType 'unitOnly', ExtractionResult 'unit' property must be a string.",
        );
      }
      if (
        "unitExponent" in extractionResult &&
        extractionResult.unitExponent !== undefined &&
        typeof extractionResult.unitExponent !== "string"
      ) {
        throw new Error(
          "validateExtractionResult: For matchType 'unitOnly', ExtractionResult 'unitExponent' property must be a string if present.",
        );
      }
      if (
        "unitExponent" in extractionResult &&
        extractionResult.unitExponent !== undefined &&
        !isValidIntegerString(extractionResult.unitExponent, true)
      ) {
        throw new Error(
          "validateExtractionResult: For matchType 'unitOnly', ExtractionResult 'unitExponent' property must contain only integers or superscript integers (and their respective negative symbol - and ⁻).",
        );
      }
      break;

    case "operator":
      break; // No specific properties to validate for operator

    case "scientific":
      if (!("integer" in extractionResult)) {
        throw new Error(
          "validateExtractionResult: For matchType 'scientific', ExtractionResult is missing the 'integer' property.",
        );
      }
      if (typeof extractionResult.integer !== "string") {
        throw new Error(
          "validateExtractionResult: For matchType 'scientific', ExtractionResult 'integer' property must be a string.",
        );
      }
      if (!isValidIntegerString(extractionResult.integer)) {
        throw new Error(
          "validateExtractionResult: For matchType 'scientific', ExtractionResult 'integer' property must contain only integers.",
        );
      }
      if (
        "decimal" in extractionResult &&
        extractionResult.decimal !== undefined &&
        typeof extractionResult.decimal !== "string"
      ) {
        throw new Error(
          "validateExtractionResult: For matchType 'scientific', ExtractionResult 'decimal' property must be a string if present.",
        );
      }
      if (
        "decimal" in extractionResult &&
        extractionResult.decimal !== undefined &&
        !isValidIntegerString(extractionResult.decimal)
      ) {
        throw new Error(
          "validateExtractionResult: For matchType 'scientific', ExtractionResult 'decimal' property must contain only integers.",
        );
      }
      if (!("negativeInt" in extractionResult)) {
        throw new Error(
          "validateExtractionResult: For matchType 'scientific', ExtractionResult is missing the 'negativeInt' property.",
        );
      }
      if (typeof extractionResult.negativeInt !== "boolean") {
        throw new Error(
          "validateExtractionResult: For matchType 'scientific', ExtractionResult 'negativeInt' property must be a boolean.",
        );
      }
      if (!("exponent" in extractionResult)) {
        throw new Error(
          "validateExtractionResult: For matchType 'scientific', ExtractionResult is missing the 'exponent' property.",
        );
      }
      if (extractionResult.exponent !== undefined && typeof extractionResult.exponent !== "string") {
        throw new Error(
          "validateExtractionResult: For matchType 'scientific', ExtractionResult 'exponent' property must be a string.",
        );
      }
      if (extractionResult.exponent !== undefined && !isValidIntegerString(extractionResult.exponent, true)) {
        throw new Error(
          "validateExtractionResult: For matchType 'scientific', ExtractionResult 'exponent' property must contain only integers or superscript integers (and their respective negative symbol - and ⁻).",
        );
      }
      break;

    default:
      throw new Error(`validateExtractionResult: Unknown matchType: ${matchType}`);
  }
}
