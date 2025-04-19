import { units, math, currencyCodes, currencySymbols } from "../../config/default";

const sanitizeString = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// Dynamic pattern generation from config
const currencySymbolsSanitized = Object.keys(currencySymbols)
  .map((key) => sanitizeString(key)) // Escape special regex characters
  .join("|");
const currencyCodesSanitized = Object.keys(currencyCodes).join("|");

const allUnits = Object.keys(units)
  .map((key) => sanitizeString(key))
  .sort((a, b) => b.length - a.length)
  .join("|");

const operatorSymbols = Object.keys(math)
  .map((operator) => sanitizeString(operator))
  .join("|");

const regexMatches = new RegExp(
  [
    // Currency Matching (Highest Priority)
    `(?<=^|\\s)(?:` + // Ensures the match is at the beginning of the string or preceded by whitespace
      `(?<symbolCurrency>(?<negativeSignSymbol>-)?(?<currencySymbol>${currencySymbolsSanitized})\\s*(?<symbolInt>(?:\\d{1,3}(?:,\\d{3})*|\\d+))(?:\\.(?<symbolDec>\\d+))?)` + // Matches currency with symbols
      `|` + // OR
      `(?<codeCurrency>(?<negativeSignCode>-)?(?<codeInt>(?:\\d{1,3}(?:,\\d{3})*|\\d+))(?:\\.(?<codeDec>\\d+))?[ \\t]*(?<currencyCode>${currencyCodesSanitized}))` + // Matches currency with codes
      `)` + // End of currency matching group
      `(?=(?:\\s|$|(?:\\.(?!\\d))|[^\\d.]))`, // Ensures the match is followed by whitespace, end of string, or non-numeric characters

    // Scientific Notation 5e-10, 5e10, 5.5e10, 5.5e-10
    `|(?<scientific>` + // Group for scientific notation
      `(?<negativeSignScientific>-)?(?<scientificInt>\\d+)(?:\\.(?<scientificDec>\\d+))?(?:[eE])(?<scientificExponent>[+-]?\\d+)` + // Matches scientific notation format
      `)(?=(?:\\s|$|(?:\\.(?!\\d))|[^\\d.]))`, // Ensures the match is followed by whitespace, end of string, or non-numeric characters

    // Numeric Units 5km, 10m/s, 10m/s^2, 10m/s², 10m²/s, 10m²/s²
    `|(?<unit>` + // Group for units
      `(?<negativeSignUnit>-)?(?<unitInt>(?:\\d{1,3}(?:,\\d{3})*|\\d+))(?:\\.(?<unitDec>\\d+))?` + // Matches the number part of the unit
      `\\s*` + // Matches optional whitespace
      `(?:` + // Group for handling exponents (caret or superscript)
      `\\^(?<unitCaretExponentPre>-?\\d+)|` + // Matches caret exponent
      `(?<unitSuperExponentPre>⁻?[¹²³⁴⁵⁶⁷⁸⁹])` + // Matches superscript exponent
      `)?` + // End of exponent group
      `\\s*(?<unitName>(?:${allUnits})\\b)` + // Matches the unit name
      `(?:` + // Group for handling exponents (caret or superscript)
      `\\^(?<unitCaretExponentPost>-?\\d+)|` + // Matches caret exponent
      `(?<unitSuperExponentPost>⁻?[¹²³⁴⁵⁶⁷⁸⁹])` + // Matches superscript exponent
      `)?` + // End of exponent group
      `)(?=(?:\\s|$|(?:\\.(?!\\d))|[^\\d.]))`, // Ensures the match is followed by whitespace, end of string, or non-numeric characters

    // Number with optional exponent
    `|(?<!\\w)(?<number>` + // Group for number
      `(?<negativeSignInteger>-)?` + // Matches an optional negative sign
      `(?<integerInt>(?:\\d{1,3}(?:,\\d{3})*|\\d+))` + // Matches the integer part of the number
      `(?:\\.(?<integerDec>\\d+))?` + // Matches the decimal part of the number
      `(?:(?:\\^(?<integerCaretExponent>-?\\d+))|` + // Matches exponent with caret
      `(?<integerSuperExponent>⁻?[¹²³⁴⁵⁶⁷⁸⁹]))?` + // Matches exponent with superscript
      `)(?=(?:\\s|$|(?:\\.(?!\\d))|[^\\d.]))`, // Ensures the match is followed by whitespace, end of string, or non-numeric characters

    // Unit Only (e.g., m, kg, m², kg³)
    `|(?<unitOnly>` + // Group for unit only
      `(?<![\\w.])` + // Negative lookbehind to prevent matching units within words
      `(?<unitNameOnly>(?:${allUnits})\\b)` + // Matches the unit name
      `(?:\\^(?<unitOnlyCaretExponent>-?\\d+)|(?<unitOnlySuperExponent>⁻?[¹²³⁴⁵⁶⁷⁸⁹]))?` + // Matches optional exponent
      `(?!\\w)` + // Negative lookahead to prevent matching units within words
      `)(?=(?:\\s|$|(?:\\.(?!\\d))|[^\\d.]))`, // Ensures the match is followed by whitespace, end of string, or non-numeric characters
    // Mathematical Operators
    `|(?<operator>(?:(?<=^)|(?<=\\s))(${operatorSymbols})(?=\\s|$|(?:\\.(?!\\d))))`, // Matches mathematical operators
  ].join(""),
  "u",
);

export { regexMatches };
