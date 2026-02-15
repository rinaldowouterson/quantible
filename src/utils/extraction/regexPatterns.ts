import {
  units,
  math,
  currencyCodes,
  currencySymbols,
  commonSymbols,
  trailingCurrencySymbols,
} from "../../config/default";

const sanitizeString = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

// Dynamic pattern generation from config
const currencySymbolsSanitized = Object.keys(currencySymbols)
  .map((key) => sanitizeString(key)) // Escape special regex characters
  .join("|");
const trailingCurrencySymbolsSanitized = Object.keys(trailingCurrencySymbols)
  .map((key) => sanitizeString(key))
  .join("|");
const currencyCodesSanitized = Object.keys(currencyCodes).join("|");

const allUnits = Object.keys(units)
  .map((key) => sanitizeString(key))
  .sort((a, b) => b.length - a.length)
  .join("|");

// Separate symbols that need constraints
const commonSymbolsBase = Object.keys(commonSymbols).filter(
  (symbol) => symbol !== "." && symbol !== "-" && symbol !== "_",
);
const commonSymbolsBaseSanitized = commonSymbolsBase.map((symbol) => sanitizeString(symbol)).join("|");

// Dot constraint: not followed by digit, must be followed by word character
// Allow digit before dot (numeric subdomains) but not digit after (decimal numbers)
// Also ensure dot is not preceded by digit if we want to avoid decimal-like patterns? Actually we want to match numeric subdomains, so keep.
const dotPattern = `\\.(?![0-9])(?=\\w)`;
// Underscore: no constraints
const underscorePattern = `_`;

const commonSymbolsSanitized = `(?:${commonSymbolsBaseSanitized}|${dotPattern}|${underscorePattern})`;

const operatorSymbols = Object.keys(math)
  .sort((a, b) => b.length - a.length)
  .map((operator) => sanitizeString(operator))
  .join("|");

const regexMatches = new RegExp(
  [
    [
      // 0. ABBREVIATIONS (special multi‑character sequences)
      // Priority: Highest, to prevent mis‑matching as units or symbols
      `(?<abbreviation>e\\.g\\.|i\\.e\\.)`,

      // 1. COMMON SYMBOLS
      // Priority: High
      // Anchoring: Loose (allows matching symbols like '@' in emails or '&' in 'A&B')
      `|(?<commonSymbol>(${commonSymbolsSanitized}))`,

      // 2. CURRENCY MATCHING
      // Strategy: Atomic anchoring per subtype to prevent 'loose' matches from being stolen by the 'number' group.
      `|(?<=^|\\s)(?:` +
        // Subtype: Symbol Currency (e.g., $1,000, -€50.00)
        `(?<symbolCurrency>(?<negativeSignSymbol>-)?(?<currencySymbol>${currencySymbolsSanitized})\\s*(?<symbolInt>(?:\\d{1,3}(?:,\\d{3})*|\\d+))(?:\\.(?<symbolDec>\\d+))?)` +
        `|` +
        // Subtype: Trailing Currency Symbols (e.g., 1,000 ₩, -50 ฿)
        `(?<trailingSymbolCurrency>(?<negativeSignTrailing>-)?(?<trailingInt>(?:\\d{1,3}(?:,\\d{3})*|\\d+))(?:\\.(?<trailingDec>\\d+))?[ \\t]*(?<trailingCurrencySymbol>${trailingCurrencySymbolsSanitized}))` +
        `|` +
        // Subtype: Currency Codes (e.g., 1000 USD, -50.25 EUR)
        `(?<codeCurrency>(?<negativeSignCode>-)?(?<codeInt>(?:\\d{1,3}(?:,\\d{3})*|\\d+))(?:\\.(?<codeDec>\\d+))?[ \\t]*(?<currencyCode>${currencyCodesSanitized}))` +
        `)` +
        // Segment boundary for currencies: whitespace, EOL, non-digit period, or any non-numeric char.
        `(?=(?:\\s|$|(?:\\.(?!\\d))|[^\\d.]))`,

      // 3. SCIENTIFIC NOTATION
      // Target: 5e-10, 5.5E10, etc.
      `|(?<scientific>` +
        `(?<negativeSignScientific>-)?(?<scientificInt>\\d+)(?:\\.(?<scientificDec>\\d+))?(?:[eE])(?<scientificExponent>[+-]?\\d+)` +
        `)` +
        // Prevents matching scientific fragments (like '5e') at a boundary.
        `(?=(?:\\s|$|(?:\\.(?!\\d))|[^\\d.]))`,

      // 4. NUMERIC UNITS
      // Target: 5km, 10m/s^2, 10m²/s, etc.
      `|(?<unit>` +
        // Number part with optional thousands separators
        `(?<negativeSignUnit>-)?(?<unitInt>(?:\\d{1,3}(?:,\\d{3})*|\\d+))(?:\\.(?<unitDec>\\d+))?` +
        `\\s*` +
        // Multi-stage exponent support (Caret ^2 or Superscript ²)
        `(?:\\^(?<unitCaretExponentPre>-?\\d+)|(?<unitSuperExponentPre>⁻?[¹²³⁴⁵⁶⁷⁸⁹]))?` +
        `\\s*(?<unitName>(?:${allUnits})\\b)` +
        // Negative lookahead to avoid "Connect A & B" where '&' might be misidentified as part of a unit chain.
        `(?!\\s*(?:${commonSymbolsSanitized}))` +
        `(?:\\^(?<unitCaretExponentPost>-?\\d+)|(?<unitSuperExponentPost>⁻?[¹²³⁴⁵⁶⁷⁸⁹]))?` +
        `)` +
        `(?=(?:\\s|$|(?:\\.(?!\\d))|[^\\d.]))`,

      // 5. VERSIONED NUMBERS (e.g., v2, _5, V10)
      // Priority: Higher than generic numbers to catch specific prefixes within words/boundaries.
      `|(?<versionedNumber>(?:v|V|_)\\d+)` +
        // 6. NUMBERS (General / Fallback)
        // Priority: Lower than specific types to prevent partial matching.
        `|(?<!\\w)(?<number>` +
        `(?<negativeSignInteger>-)?` +
        `(?<integerInt>(?:\\d{1,3}(?:,\\d{3})*|\\d+))` +
        `(?:\\.(?<integerDec>\\d+))?` +
        // Optional exponent (10³ or 10^3)
        `(?:(?:\\^(?<integerCaretExponent>-?\\d+))|(?<integerSuperExponent>⁻?[¹²³⁴⁵⁶⁷⁸⁹]))?` +
        `)` +
        `(?=(?:\\s|$|(?:\\.(?!\\d))|[^\\d.]))`,

      // 7. UNIT ONLY
      // Target: stand-alone units (m, kg, m²)
      `|(?<unitOnly>` +
        // Negative lookbehind ensures we aren't at a weird boundary or right next to a common symbol.
        `(?<![\\w.]|(?:${commonSymbolsSanitized})\\s+)` +
        `(?<unitNameOnly>(?:${allUnits})\\b)` +
        `(?!\\s*(?:${commonSymbolsSanitized}))` +
        `(?:\\^(?<unitOnlyCaretExponent>-?\\d+)|(?<unitOnlySuperExponent>⁻?[¹²³⁴⁵⁶⁷⁸⁹]))?` +
        `(?!\\w)` +
        `)` +
        `(?=(?:\\s|$|(?:\\.(?!\\d))|[^\\d.]))`,

      // 7. MATHEMATICAL OPERATORS
      // Target: standalone +, -, *, /, =, <, >, etc.
      // Anchoring: Must be surrounded by whitespace or EOL to avoid splitting numbers/words.
      `|(?<operator>(?:(?<=^)|(?<=\\s))(${operatorSymbols})(?=(?:\\s|$|(?:\\.(?!\\d)))))`,
    ].join(""), // Matches mathematical operators
  ].join(""),
  "u",
);

export { regexMatches };
