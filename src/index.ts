import { extractFirstMatch, extractAllMatches } from "./utils/extraction/patternExtractor";
import { convertCurrencyToSpokenWord } from "./converters/convertCurrencyToSpokenWord";
import { convertNumberToSpokenWord } from "./converters/convertNumberToSpokenWord";
import { convertNumericUnitToSpokenWord } from "./converters/convertNumericUnitToSpokenWord";
import { convertOperatorToSpokenWord } from "./converters/convertOperatorToSpokenWord";
import { convertScientificExpressionToSpokenWord } from "./converters/convertScientificExpressionToSpokenWord";
import { convertUnitOnlyToSpokenWord } from "./converters/convertUnitOnlyToSpokenWord";

import type {
  baseCurrency,
  baseNumber,
  baseNumberUnit,
  baseOperator,
  baseScientific,
  baseUnitOnly,
  ExtractionResult,
} from "./interfaces/definitions";

import { validateExtractionResult } from "./utils/validateExtractionResultObject";

/**
 * @namespace extractQuantities
 * @description Contains functions for extracting numeric data from a string.
 */
const extractQuantities = {
  /**
   * Extracts the first match (number || currency || unit || operator || scientific expression) from the input string.
   * @param {string} input - The string to extract from.
   * @returns {ExtractionResult | null} The extracted data or null if no match is found.
   */
  firstMatch: extractFirstMatch,
  /**
   * Extracts all matches (number || currency || unit || operator || scientific expression) from the input string.
   * @param {string} input - The string to extract from.
   * @returns {ExtractionResult[]} The extracted data.
   */
  allMatches: extractAllMatches,
};

/**
 * @namespace convertQuantities
 * @description Contains functions for converting (number || currency || unit || operator || scientific expression) data from a string or object to spoken word.
 */
const convertQuantities = {
  /**
   * Translates an ExtractionResult object (number || currency || unit || operator || scientific expression) into its spoken word equivalent.
   *
   * @param {ExtractionResult} extractionResult - The ExtractionResult object to translate.
   * @returns {string} The spoken word equivalent of the ExtractionResult.
   */
  translateMatch: (extractionResult: ExtractionResult): string => {
    let result: string = "";

    switch (extractionResult.matchType) {
      case "number":
        result = convertNumberToSpokenWord(extractionResult as baseNumber);
        break;

      case "symbolCurrency":
        result = convertCurrencyToSpokenWord(extractionResult as baseCurrency);
        break;
      case "codeCurrency":
        result = convertCurrencyToSpokenWord(extractionResult as baseCurrency);
        break;
      case "unit":
        result = convertNumericUnitToSpokenWord(extractionResult as baseNumberUnit);
        break;
      case "unitOnly":
        result = convertUnitOnlyToSpokenWord(extractionResult as baseUnitOnly);
        break;
      case "operator":
        result = convertOperatorToSpokenWord(extractionResult as baseOperator);
        break;
      case "scientific":
        result = convertScientificExpressionToSpokenWord(extractionResult as baseScientific);
        break;

      default:
        break;
    }
    return result;
  },

  /**
   * Extracts the first match (number || currency || unit || operator || scientific expression) from the input string
   * and translates it to its spoken word equivalent.
   *
   * @param {string} input - The string to extract and translate from.
   * @returns {string} The input string with the first match replaced by its spoken word equivalent,
   * or an empty string if no match is found.
   */
  autoReplaceFirstMatch: (input: string): string => {
    const match = extractFirstMatch(input);
    if (!match) return "";
    return input.replace(match.input, convertQuantities.translateMatch(match));
  },

  /**
   * Extracts all matches (number || currency || unit || operator || scientific expression) from the input string
   * and translates them to their spoken word equivalents.
   *
   * @param {string} input - The string to extract and translate from.
   * @returns {string} The input string with all matches replaced by their spoken word equivalents. Returns the original string if no matches are found.
   */
  autoReplaceAllMatches: (input: string): string => {
    const matches = extractAllMatches(input);

    if (matches.length === 0) {
      return input;
    }

    let output = "";
    let lastIndex = 0;

    for (const match of matches) {
      output += input.substring(lastIndex, match.index);
      output += convertQuantities.translateMatch(match);
      lastIndex = match.index + match.input.length;
    }

    output += input.substring(lastIndex);
    return output.replace(/\s+/g, " ").trim();
  },
};

console.log(convertQuantities.autoReplaceAllMatches("25 EUR"));

export { convertQuantities, extractQuantities, validateExtractionResult };
export type { ExtractionResult, baseCurrency, baseNumber, baseNumberUnit, baseOperator, baseScientific, baseUnitOnly };
