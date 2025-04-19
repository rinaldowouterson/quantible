/**
 * Represents the base structure for all extraction results,
 * containing the input string, match type, index, and length of the extracted value.
 */
export interface baseExtraction {
  input: string;
  matchType: string;
  index: number;
}

/**
 * @interface numericBaseExtraction
 * @extends {baseExtraction}
 * @description Represents the base structure for numeric extraction results,
 * extending the baseExtraction with properties for integer, decimal, and negative integer indication.
 */
export interface numericBaseExtraction extends baseExtraction {
  integer: string;
  decimal?: string;
  negativeInt: boolean;
}

/**
 * @interface baseCurrency
 * @extends {numericBaseExtraction}
 * @description Represents the structure for currency extraction results,
 * extending the numericBaseExtraction with properties for match type (symbol or code) and currency symbol or code.
 */
export interface baseCurrency extends numericBaseExtraction {
  matchType: "symbolCurrency" | "codeCurrency";
  currency: string;
}

/**
 * @interface baseScientific
 * @extends {numericBaseExtraction}
 * @description Represents the structure for scientific notation extraction results,
 * extending the numericBaseExtraction with properties for match type (scientific) and a mandatory exponent value.
 */
export interface baseScientific extends numericBaseExtraction {
  matchType: "scientific";
  exponent: string;
}

/**
 * @interface baseNumberUnit
 * @extends {numericBaseExtraction}
 * @description Represents the structure for quantitative unit extraction results,
 * extending the numericBaseExtraction with properties for match type (unit), unit name, optional exponent, and optional unit exponent.
 */
export interface baseNumberUnit extends numericBaseExtraction {
  matchType: "unit";
  unit: string;
  exponent?: string;
  unitExponent?: string;
}

/**
 * @interface baseUnitOnly
 * @extends {baseExtraction}
 * @description Represents the structure for unit-only extraction results,
 * extending the baseExtraction with properties for match type (unitOnly), unit name, and optional unit exponent.
 */
export interface baseUnitOnly extends baseExtraction {
  matchType: "unitOnly";
  unit: string;
  unitExponent?: string;
}

/**
 * @interface baseOperator
 * @extends {baseExtraction}
 * @description Represents the structure for mathematical operator extraction results,
 * extending the baseExtraction with a property for match type (operator).
 */
export interface baseOperator extends baseExtraction {
  matchType: "operator";
}

/**
 * @interface baseNumber
 * @extends {numericBaseExtraction}
 * @description Represents the structure for number extraction results,
 * extending the numericBaseExtraction with properties for match type (number) and an optional exponent.
 */
export interface baseNumber extends numericBaseExtraction {
  matchType: "number";
  exponent?: string;
}

/**
 * @interface ExtractionResult
 * @description Represents all possible extraction results
 * and contains all properties that can be extracted from a given input string.
 */
export interface ExtractionResult {
  input: string;
  matchType: string;
  index: number;
  integer?: string;
  decimal?: string;
  negativeInt?: boolean;
  currency?: string;
  exponent?: string;
  unit?: string;
  unitExponent?: string;
}
