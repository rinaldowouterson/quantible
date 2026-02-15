import { regexMatches } from "./regexPatterns";
import { ExtractionResult } from "../../interfaces/definitions";

/**
 * Returns the first match of a number, currency, unit, or exponent in the given string.
 * The returned object contains the extracted groups and additional information such as
 * the type of match and the index of the match in the string.
 *
 * @param {string} input - The string to search for matches
 * @returns {ExtractionResult | null} - The extracted groups and additional information, or null if no match is found
 */

export function extractFirstMatch(input: string): ExtractionResult | null {
  const match = input.match(regexMatches);

  if (match && match.groups && match.index !== undefined) {
    const matchedGroup = Object.fromEntries(Object.entries(match.groups).filter(([_, value]) => value !== undefined));
    let matchType = Object.keys(matchedGroup)[0];

    const extractedGroup = {} as ExtractionResult;

    switch (matchType) {
      case "abbreviation":
        extractedGroup.symbol = matchedGroup["abbreviation"];
        break;
      case "commonSymbol":
        extractedGroup.symbol = matchedGroup["commonSymbol"];
        break;
      case "symbolCurrency":
        extractedGroup.integer = matchedGroup["symbolInt"];
        extractedGroup.decimal = matchedGroup["symbolDec"];
        // Pad single‑digit decimal with trailing zero for cents
        if (extractedGroup.decimal && extractedGroup.decimal.length === 1) {
          extractedGroup.decimal += "0";
        }
        extractedGroup.negativeInt = matchedGroup["negativeSignSymbol"] !== undefined;
        extractedGroup.currency = matchedGroup["currencySymbol"];
        break;
      case "trailingSymbolCurrency":
        extractedGroup.integer = matchedGroup["trailingInt"];
        extractedGroup.decimal = matchedGroup["trailingDec"];
        if (extractedGroup.decimal && extractedGroup.decimal.length === 1) {
          extractedGroup.decimal += "0";
        }
        extractedGroup.negativeInt = matchedGroup["negativeSignTrailing"] !== undefined;
        extractedGroup.currency = matchedGroup["trailingCurrencySymbol"];
        break;
      case "codeCurrency":
        extractedGroup.integer = matchedGroup["codeInt"];
        extractedGroup.decimal = matchedGroup["codeDec"];
        if (extractedGroup.decimal && extractedGroup.decimal.length === 1) {
          extractedGroup.decimal += "0";
        }
        extractedGroup.negativeInt = matchedGroup["negativeSignCode"] !== undefined;
        extractedGroup.currency = matchedGroup["currencyCode"];
        break;
      case "scientific":
        extractedGroup.integer = matchedGroup["scientificInt"];
        extractedGroup.decimal = matchedGroup["scientificDec"];
        extractedGroup.negativeInt = matchedGroup["negativeSignScientific"] !== undefined;
        extractedGroup.exponent = matchedGroup["scientificExponent"];
        break;
      case "unit":
        extractedGroup.integer = matchedGroup["unitInt"];
        extractedGroup.decimal = matchedGroup["unitDec"];
        extractedGroup.negativeInt = matchedGroup["negativeSignUnit"] !== undefined;
        extractedGroup.unit = matchedGroup["unitName"];
        extractedGroup.exponent = matchedGroup["unitCaretExponentPre"] || matchedGroup["unitSuperExponentPre"];
        extractedGroup.unitExponent = matchedGroup["unitCaretExponentPost"] || matchedGroup["unitSuperExponentPost"];
        break;
      case "unitOnly":
        extractedGroup.unit = matchedGroup["unitNameOnly"];
        extractedGroup.unitExponent = matchedGroup["unitOnlyCaretExponent"] || matchedGroup["unitOnlySuperExponent"];
        break;
      case "operator":
        break;
      case "number":
        extractedGroup.integer = matchedGroup["integerInt"];
        extractedGroup.decimal = matchedGroup["integerDec"];
        extractedGroup.exponent = matchedGroup["integerSuperExponent"] || matchedGroup["integerCaretExponent"];
        extractedGroup.negativeInt = matchedGroup["negativeSignInteger"] !== undefined;
        break;
      case "versionedNumber": {
        const vMatch = matchedGroup["versionedNumber"];
        extractedGroup.symbol = vMatch[0];
        extractedGroup.integer = vMatch.slice(1);
        break;
      }
      default:
        break;
    }

    extractedGroup.matchType = matchType;
    extractedGroup.input = matchedGroup[matchType];
    extractedGroup.index = match.index;

    if (matchType !== "operator" && matchType !== "scientific" && matchType !== "unitOnly")
      extractedGroup.integer = extractedGroup.integer !== undefined ? extractedGroup.integer.replace(/,/g, "") : "0";

    return extractedGroup;
  }

  return null;
}

/**
 * Extracts all matches of a number, currency, unit, or exponent in the given string
 * and returns an array of the extracted groups and additional information such as
 * the type of match and the index of the match in the string.
 *
 * If the input string contains no matches, an empty array is returned.
 *
 * @param {string} input - The string to search for matches
 * @returns {ExtractionResult[]} - The extracted groups and additional information, or an empty array if no match is found
 */
export function extractAllMatches(input: string): ExtractionResult[] {
  const results: ExtractionResult[] = [];
  let remainingInput = input;
  let currentExtraction = extractFirstMatch(remainingInput);

  while (currentExtraction !== null && currentExtraction.input) {
    results.push(currentExtraction);
    const lastMatchEnd = currentExtraction.index + currentExtraction.input.length;
    remainingInput = input.substring(lastMatchEnd);
    currentExtraction = extractFirstMatch(remainingInput);
    if (currentExtraction) {
      currentExtraction.index += lastMatchEnd;
    }
  }

  return results;
}
