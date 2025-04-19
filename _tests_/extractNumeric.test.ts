import { extractAllMatches } from "../src/utils/extraction/patternExtractor";

describe("extractAllNumericData", () => {
  it("should return an empty array if the input string contains no numbers", () => {
    const input = "No numbers here";
    const result = extractAllMatches(input);
    expect(result).toEqual([]);
  });
  it("should extract currency with symbol", () => {
    const input = "$1,000 $1000 -$50";
    const result = extractAllMatches(input);
    // console.log({ result });
    expect(result).toEqual([
      {
        integer: "1000",
        decimal: undefined,
        negativeInt: false,
        currency: "$",
        matchType: "symbolCurrency",
        input: "$1,000",
        index: 0,
      },
      {
        integer: "1000",
        decimal: undefined,
        negativeInt: false,
        currency: "$",
        matchType: "symbolCurrency",
        input: "$1000",
        index: 7,
      },
      {
        integer: "50",
        decimal: undefined,
        negativeInt: true,
        currency: "$",
        matchType: "symbolCurrency",
        input: "-$50",
        index: 13,
      },
    ]);
  });
  // });
  it("should extract currency with code", () => {
    const input = "1000 USD 50 EUR -50 USD";
    const result = extractAllMatches(input);
    // console.log({ result });
    expect(result).toEqual([
      {
        integer: "1000",
        decimal: undefined,
        currency: "USD",
        negativeInt: false,
        matchType: "codeCurrency",
        input: "1000 USD",
        index: 0,
      },
      {
        integer: "50",
        decimal: undefined,
        currency: "EUR",
        negativeInt: false,
        matchType: "codeCurrency",
        input: "50 EUR",
        index: 9,
      },
      {
        integer: "50",
        decimal: undefined,
        currency: "USD",
        negativeInt: true,
        matchType: "codeCurrency",
        input: "-50 USD",
        index: 16,
      },
    ]);
  });

  it("should extract scientific notation", () => {
    const input = "5e3 6.022E23 -5e3 -6.022E23";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "5",
        decimal: undefined,
        exponent: "3",
        negativeInt: false,
        matchType: "scientific",
        input: "5e3",
        index: 0,
      },
      {
        integer: "6",
        decimal: "022",
        exponent: "23",
        negativeInt: false,
        matchType: "scientific",
        input: "6.022E23",
        index: 4,
      },
      {
        integer: "5",
        decimal: undefined,
        exponent: "3",
        negativeInt: true,
        matchType: "scientific",
        input: "-5e3",
        index: 13,
      },
      {
        integer: "6",
        decimal: "022",
        exponent: "23",
        negativeInt: true,
        matchType: "scientific",
        input: "-6.022E23",
        index: 18,
      },
    ]);
  });

  it("should extract units", () => {
    const input = "5m^2 10kg^3 5^2m^2 10²kg³ -5m^2 -10kg^3";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "5",
        decimal: undefined,
        unit: "m",
        exponent: undefined,
        unitExponent: "2",
        negativeInt: false,
        matchType: "unit",
        input: "5m^2",
        index: 0,
      },
      {
        integer: "10",
        decimal: undefined,
        unit: "kg",
        exponent: undefined,
        unitExponent: "3",
        negativeInt: false,
        matchType: "unit",
        input: "10kg^3",
        index: 5,
      },
      {
        integer: "5",
        decimal: undefined,
        unit: "m",
        exponent: "2",
        unitExponent: "2",
        negativeInt: false,
        matchType: "unit",
        input: "5^2m^2",
        index: 12,
      },
      {
        integer: "10",
        decimal: undefined,
        unit: "kg",
        exponent: "²",
        unitExponent: "³",
        negativeInt: false,
        matchType: "unit",
        input: "10²kg³",
        index: 19,
      },
      {
        integer: "5",
        decimal: undefined,
        unit: "m",
        exponent: undefined,
        unitExponent: "2",
        negativeInt: true,
        matchType: "unit",
        input: "-5m^2",
        index: 26,
      },
      {
        integer: "10",
        decimal: undefined,
        unit: "kg",
        exponent: undefined,
        unitExponent: "3",
        negativeInt: true,
        matchType: "unit",
        input: "-10kg^3",
        index: 32,
      },
    ]);
  });

  it("should extract mathematical operators", () => {
    const input = "+ - * × · / ÷ ";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      { matchType: "operator", input: "+", index: 0 },
      { matchType: "operator", input: "-", index: 2 },
      { matchType: "operator", input: "*", index: 4 },
      { matchType: "operator", input: "×", index: 6 },
      { matchType: "operator", input: "·", index: 8 },
      { matchType: "operator", input: "/", index: 10 },
      { matchType: "operator", input: "÷", index: 12 },
    ]);
  });

  it("should extract integers with optional exponent", () => {
    const input = "1000 -500 10^3 -10³ 5²";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "1000",
        decimal: undefined,
        exponent: undefined,
        negativeInt: false,
        matchType: "number",
        input: "1000",
        index: 0,
      },
      {
        integer: "500",
        decimal: undefined,
        exponent: undefined,
        negativeInt: true,
        matchType: "number",
        input: "-500",
        index: 5,
      },
      {
        integer: "10",
        decimal: undefined,
        exponent: "3",
        negativeInt: false,
        matchType: "number",
        input: "10^3",
        index: 10,
      },
      {
        integer: "10",
        decimal: undefined,
        exponent: "³",
        negativeInt: true,
        matchType: "number",
        input: "-10³",
        index: 15,
      },
      {
        integer: "5",
        decimal: undefined,
        exponent: "²",
        negativeInt: false,
        matchType: "number",
        input: "5²",
        index: 20,
      },
    ]);
  });

  it("should handle decimal numbers correctly", () => {
    const input = "1.23 456.789 -0.5";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "1",
        decimal: "23",
        exponent: undefined,
        negativeInt: false,
        matchType: "number",
        input: "1.23",
        index: 0,
      },
      {
        integer: "456",
        decimal: "789",
        exponent: undefined,
        negativeInt: false,
        matchType: "number",
        input: "456.789",
        index: 5,
      },
      {
        integer: "0",
        decimal: "5",
        exponent: undefined,
        negativeInt: true,
        matchType: "number",
        input: "-0.5",
        index: 13,
      },
    ]);
  });

  it("should handle numbers with commas correctly", () => {
    const input = "1,000,000 10,000.50";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "1000000",
        decimal: undefined,
        exponent: undefined,
        negativeInt: false,
        matchType: "number",
        input: "1,000,000",
        index: 0,
      },
      {
        integer: "10000",
        decimal: "50",
        exponent: undefined,
        negativeInt: false,
        matchType: "number",
        input: "10,000.50",
        index: 10,
      },
    ]);
  });

  it("should handle multiple occurrences of different types", () => {
    const input = "$100 5e3 10kg^2 1,000 USD";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "100",
        decimal: undefined,
        negativeInt: false,
        currency: "$",
        matchType: "symbolCurrency",
        input: "$100",
        index: 0,
      },
      {
        integer: "5",
        decimal: undefined,
        exponent: "3",
        negativeInt: false,
        matchType: "scientific",
        input: "5e3",
        index: 5,
      },
      {
        integer: "10",
        decimal: undefined,
        unit: "kg",
        exponent: undefined,
        unitExponent: "2",
        negativeInt: false,
        matchType: "unit",
        input: "10kg^2",
        index: 9,
      },
      {
        integer: "1000",
        decimal: undefined,
        currency: "USD",
        negativeInt: false,
        matchType: "codeCurrency",
        input: "1,000 USD",
        index: 16,
      },
    ]);
  });

  it("should handle edge cases with spaces and non-numeric characters", () => {
    const input = " $100  5e3  10kg^2  1,000 USD ";
    const result = extractAllMatches(input);

    expect(result).toEqual([
      {
        integer: "100",
        decimal: undefined,
        negativeInt: false,
        currency: "$",
        matchType: "symbolCurrency",
        input: "$100",
        index: 1,
      },
      {
        integer: "5",
        decimal: undefined,
        exponent: "3",
        negativeInt: false,
        matchType: "scientific",
        input: "5e3",
        index: 7,
      },
      {
        integer: "10",
        decimal: undefined,
        unit: "kg",
        exponent: undefined,
        unitExponent: "2",
        negativeInt: false,
        matchType: "unit",
        input: "10kg^2",
        index: 12,
      },
      {
        integer: "1000",
        decimal: undefined,
        currency: "USD",
        negativeInt: false,
        matchType: "codeCurrency",
        input: "1,000 USD",
        index: 20,
      },
    ]);
  });

  it("should extract numbers at the beginning and end of the string", () => {
    const input = "100USD and $200";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "100",
        decimal: undefined,
        currency: "USD",
        negativeInt: false,
        matchType: "codeCurrency",
        input: "100USD",
        index: 0,
      },
      {
        integer: "200",
        decimal: undefined,
        negativeInt: false,
        currency: "$",
        matchType: "symbolCurrency",
        input: "$200",
        index: 11,
      },
    ]);
  });

  it("should not extract numbers within words", () => {
    const input = "word123 word";
    const result = extractAllMatches(input);
    expect(result).toEqual([]);
  });

  it("should extract numbers within sentences (ending with a period)", () => {
    const input = "I have a sample of 100 units and $50.";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "100",
        decimal: undefined,
        negativeInt: false,
        exponent: undefined,
        matchType: "number",
        input: "100",
        index: 19,
      },
      {
        integer: "50",
        decimal: undefined,
        negativeInt: false,
        currency: "$",
        matchType: "symbolCurrency",
        input: "$50",
        index: 33,
      },
    ]);
  });

  it("should handle complex units with combined exponents", () => {
    const input = "10m^2kg^3";
    const result = extractAllMatches(input);
    // console.log({ result });
    expect(result).toEqual([
      {
        integer: "10",
        decimal: undefined,
        unit: "m",
        exponent: undefined,
        unitExponent: "2",
        negativeInt: false,
        matchType: "unit",
        input: "10m^2",
        index: 0,
      },
      {
        unit: "kg",
        unitExponent: "3",
        matchType: "unitOnly",
        input: "kg^3",
        index: 5,
      },
    ]);
  });

  it("should extract multiple operators", () => {
    const input = "1 + 2 - 3 * 4 / 5";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "1",
        decimal: undefined,
        exponent: undefined,
        negativeInt: false,
        matchType: "number",
        input: "1",
        index: 0,
      },
      { matchType: "operator", input: "+", index: 2 },
      {
        integer: "2",
        decimal: undefined,
        exponent: undefined,
        negativeInt: false,
        matchType: "number",
        input: "2",
        index: 4,
      },
      { matchType: "operator", input: "-", index: 6 },
      {
        integer: "3",
        decimal: undefined,
        exponent: undefined,
        negativeInt: false,
        matchType: "number",
        input: "3",
        index: 8,
      },
      { matchType: "operator", input: "*", index: 10 },
      {
        integer: "4",
        decimal: undefined,
        exponent: undefined,
        negativeInt: false,
        matchType: "number",
        input: "4",
        index: 12,
      },
      { matchType: "operator", input: "/", index: 14 },
      {
        integer: "5",
        decimal: undefined,
        exponent: undefined,
        negativeInt: false,
        matchType: "number",
        input: "5",
        index: 16,
      },
    ]);
  });

  it("should handle trailing commas in numbers that ends with a period", () => {
    const input = "1,000.";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "1000", // The integer part after the comma is removed.
        decimal: undefined, // No decimal part.
        exponent: undefined, // No exponent in this case.
        negativeInt: false, // No negative sign.
        matchType: "number", // Type of match is a number.
        input: "1,000", // Original input string.
        index: 0, // Match starts at the first character.
      },
    ]);
  });

  it("should extract currency at the beginning and end of the string", () => {
    const input = "$100 and 200USD";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "100",
        decimal: undefined,
        negativeInt: false,
        currency: "$",
        matchType: "symbolCurrency",
        input: "$100",
        index: 0,
      },
      {
        integer: "200",
        decimal: undefined,
        currency: "USD",
        negativeInt: false,
        matchType: "codeCurrency",
        input: "200USD",
        index: 9,
      },
    ]);
  });

  it("should handle multiple currencies", () => {
    const input = "$100 200USD";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "100",
        decimal: undefined,
        negativeInt: false,
        currency: "$",
        matchType: "symbolCurrency",
        input: "$100",
        index: 0,
      },
      {
        integer: "200",
        decimal: undefined,
        currency: "USD",
        negativeInt: false,
        matchType: "codeCurrency",
        input: "200USD",
        index: 5,
      },
    ]);
  });

  it("should handle exponents with decimals", () => {
    const input = "2.5^3 and 3.5² and 4.5³";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "2",
        decimal: "5",
        exponent: "3",
        negativeInt: false,
        matchType: "number",
        input: "2.5^3",
        index: 0,
      },
      {
        integer: "3",
        decimal: "5",
        exponent: "²",
        negativeInt: false,
        matchType: "number",
        input: "3.5²",
        index: 10,
      },
      {
        integer: "4",
        decimal: "5",
        exponent: "³",
        negativeInt: false,
        matchType: "number",
        input: "4.5³",
        index: 19,
      },
    ]);
  });

  it("should handle exponents with negative numbers", () => {
    const input = "-2^3";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "2",
        decimal: undefined,
        exponent: "3",
        negativeInt: true,
        matchType: "number",
        input: "-2^3",
        index: 0,
      },
    ]);
  });

  it("should handle exponents with negative number and decimals", () => {
    const input = "-2.5^3";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "2",
        decimal: "5",
        exponent: "3",
        negativeInt: true,
        matchType: "number",
        input: "-2.5^3",
        index: 0,
      },
    ]);
  });

  it("should handle scientific notation with positive and negative exponents", () => {
    const input = "1.23e+5 4.56E-7";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "1",
        decimal: "23",
        exponent: "+5",
        negativeInt: false,
        matchType: "scientific",
        input: "1.23e+5",
        index: 0,
      },
      {
        integer: "4",
        decimal: "56",
        exponent: "-7",
        negativeInt: false,
        matchType: "scientific",
        input: "4.56E-7",
        index: 8,
      },
    ]);
  });

  it("should handle scientific notation with no decimal part", () => {
    const input = "1e5 2E-7";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "1",
        decimal: undefined,
        exponent: "5",
        negativeInt: false,
        matchType: "scientific",
        input: "1e5",
        index: 0,
      },
      {
        integer: "2",
        decimal: undefined,
        exponent: "-7",
        negativeInt: false,
        matchType: "scientific",
        input: "2E-7",
        index: 4,
      },
    ]);
  });

  it("should handle scientific notation with negative numbers and exponents", () => {
    const input = "-1e-5 -2.3E+7";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "1",
        decimal: undefined,
        exponent: "-5",
        negativeInt: true,
        matchType: "scientific",
        input: "-1e-5",
        index: 0,
      },
      {
        integer: "2",
        decimal: "3",
        exponent: "+7",
        negativeInt: true,
        matchType: "scientific",
        input: "-2.3E+7",
        index: 6,
      },
    ]);
  });

  it("should handle units with decimals and exponents", () => {
    const input = "2.5m^2 3.14kg^3";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "2",
        decimal: "5",
        unit: "m",
        exponent: undefined,
        unitExponent: "2",
        negativeInt: false,
        matchType: "unit",
        input: "2.5m^2",
        index: 0,
      },
      {
        integer: "3",
        decimal: "14",
        unit: "kg",
        exponent: undefined,
        unitExponent: "3",
        negativeInt: false,
        matchType: "unit",
        input: "3.14kg^3",
        index: 7,
      },
    ]);
  });

  it("should handle units with negative numbers and exponents", () => {
    const input = "-2m^2 -3.14kg^3";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "2",
        decimal: undefined,
        unit: "m",
        exponent: undefined,
        unitExponent: "2",
        negativeInt: true,
        matchType: "unit",
        input: "-2m^2",
        index: 0,
      },
      {
        integer: "3",
        decimal: "14",
        unit: "kg",
        exponent: undefined,
        unitExponent: "3",
        negativeInt: true,
        matchType: "unit",
        input: "-3.14kg^3",
        index: 6,
      },
    ]);
  });

  it("should handle units with exponents before and after the unit name", () => {
    const input = "2^2m^2 3²kg³";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "2",
        decimal: undefined,
        unit: "m",
        exponent: "2",
        unitExponent: "2",
        negativeInt: false,
        matchType: "unit",
        input: "2^2m^2",
        index: 0,
      },
      {
        integer: "3",
        decimal: undefined,
        unit: "kg",
        exponent: "²",
        unitExponent: "³",
        negativeInt: false,
        matchType: "unit",
        input: "3²kg³",
        index: 7,
      },
    ]);
  });

  it("should handle units with exponents before and after the unit name with decimals", () => {
    const input = "2.5^2m^2 3.5²kg³";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "2",
        decimal: "5",
        unit: "m",
        exponent: "2",
        unitExponent: "2",
        negativeInt: false,
        matchType: "unit",
        input: "2.5^2m^2",
        index: 0,
      },
      {
        integer: "3",
        decimal: "5",
        unit: "kg",
        exponent: "²",
        unitExponent: "³",
        negativeInt: false,
        matchType: "unit",
        input: "3.5²kg³",
        index: 9,
      },
    ]);
  });

  it("should handle units with negative numbers and exponents before and after the unit name", () => {
    const input = "-2^2m^2 -3²kg³";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "2",
        decimal: undefined,
        unit: "m",
        exponent: "2",
        unitExponent: "2",
        negativeInt: true,
        matchType: "unit",
        input: "-2^2m^2",
        index: 0,
      },
      {
        integer: "3",
        decimal: undefined,
        unit: "kg",
        exponent: "²",
        unitExponent: "³",
        negativeInt: true,
        matchType: "unit",
        input: "-3²kg³",
        index: 8,
      },
    ]);
  });

  it("should handle units with negative numbers and exponents before and after the unit name with decimals", () => {
    const input = "-2.5^2m^2 -3.5²kg³";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "2",
        decimal: "5",
        unit: "m",
        exponent: "2",
        unitExponent: "2",
        negativeInt: true,
        matchType: "unit",
        input: "-2.5^2m^2",
        index: 0,
      },
      {
        integer: "3",
        decimal: "5",
        unit: "kg",
        exponent: "²",
        unitExponent: "³",
        negativeInt: true,
        matchType: "unit",
        input: "-3.5²kg³",
        index: 10,
      },
    ]);
  });

  it("should handle multiple spaces between number and unit", () => {
    const input = "10   m^2";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "10",
        decimal: undefined,
        unit: "m",
        exponent: undefined,
        unitExponent: "2",
        negativeInt: false,
        matchType: "unit",
        input: "10   m^2",
        index: 0,
      },
    ]);
  });

  it("should handle multiple spaces between number and currency code", () => {
    const input = "10   USD";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "10",
        decimal: undefined,
        currency: "USD",
        negativeInt: false,
        matchType: "codeCurrency",
        input: "10   USD",
        index: 0,
      },
    ]);
  });

  it("should handle commas in currency", () => {
    const input = "$1,000,000";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "1000000",
        decimal: undefined,
        negativeInt: false,
        currency: "$",
        matchType: "symbolCurrency",
        input: "$1,000,000",
        index: 0,
      },
    ]);
  });

  it("should handle commas and decimals in currency", () => {
    const input = "$1,000,000.00";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "1000000",
        decimal: "00",
        negativeInt: false,
        currency: "$",
        matchType: "symbolCurrency",
        input: "$1,000,000.00",
        index: 0,
      },
    ]);
  });

  it("should handle multiple spaces between number and currency symbol", () => {
    const input = "$                   10";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "10",
        decimal: undefined,
        negativeInt: false,
        currency: "$",
        matchType: "symbolCurrency",
        input: "$                   10",
        index: 0,
      },
    ]);
  });

  it("should handle commas in numbers with decimals", () => {
    const input = "1,000,000.00";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "1000000",
        decimal: "00",
        exponent: undefined,
        negativeInt: false,
        matchType: "number",
        input: "1,000,000.00",
        index: 0,
      },
    ]);
  });

  it("should extract number at the end of a sentence with a period", () => {
    const input = "The temperature today is 72.";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "72",
        decimal: undefined,
        exponent: undefined,
        negativeInt: false,
        matchType: "number",
        input: "72",
        index: 25,
      },
    ]);
  });

  it("should extract currency at the end of a sentence with a period", () => {
    const input = "The price is $100.";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "100",
        decimal: undefined,
        negativeInt: false,
        currency: "$",
        matchType: "symbolCurrency",
        input: "$100",
        index: 13,
      },
    ]);
  });

  it("should extract currency code at the end of a sentence with a period", () => {
    const input = "The price is 100 USD.";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "100",
        decimal: undefined,
        negativeInt: false,
        currency: "USD",
        matchType: "codeCurrency",
        input: "100 USD",
        index: 13,
      },
    ]);
  });

  it("should extract scientific notation at the end of a sentence with a period", () => {
    const input = "The value is 1.23e4.";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "1",
        decimal: "23",
        exponent: "4",
        negativeInt: false,
        matchType: "scientific",
        input: "1.23e4",
        index: 13,
      },
    ]);
  });

  it("should extract unit at the end of a sentence with a period", () => {
    const input = "The distance is 100 km.";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "100",
        decimal: undefined,
        exponent: undefined,
        negativeInt: false,
        unit: "km",
        matchType: "unit",
        input: "100 km",
        index: 16,
      },
    ]);
  });

  it("should extract unit only at the end of a sentence with a period", () => {
    const input = "The temperature is 100°C.";
    const result = extractAllMatches(input);

    expect(result).toEqual([
      {
        integer: "100",
        decimal: undefined,
        unitExponent: undefined,
        exponent: undefined,
        unit: "°C",
        negativeInt: false,
        matchType: "unit",
        input: "100°C",
        index: 19,
      },
    ]);
  });

  it("should extract unit without a number (unitOnly) at the end of a sentence with a period", () => {
    const input = "The temperature is °C.";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        unit: "°C",
        matchType: "unitOnly",
        input: "°C",
        index: 19,
      },
    ]);
  });

  it("should extract numbers with commas at the end of a sentence with a period", () => {
    const input = "The price is $1,000,000.";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "1000000",
        currency: "$",
        decimal: undefined,
        exponent: undefined,
        negativeInt: false,
        matchType: "symbolCurrency",
        input: "$1,000,000",
        index: 13,
      },
    ]);
  });

  it("should extract multiple values in a sentence ending with a period", () => {
    const input = "I purchased 3 items for $19.99 and received 5kg of materials.";

    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "3",
        decimal: undefined,
        exponent: undefined,
        negativeInt: false,
        matchType: "number",
        input: "3",
        index: 12,
      },
      {
        currency: "$",
        integer: "19",
        decimal: "99",
        negativeInt: false,
        matchType: "symbolCurrency",
        input: "$19.99",
        index: 24,
      },
      {
        integer: "5",
        decimal: undefined,
        unitExponent: undefined,
        exponent: undefined,
        negativeInt: false,
        unit: "kg",
        matchType: "unit",
        input: "5kg",
        index: 44,
      },
    ]);
  });

  it("should extract number with exponent at the end of a sentence with a period", () => {
    const input = "The area is 10².";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        integer: "10",
        decimal: undefined,
        exponent: "²",
        matchType: "number",
        input: "10²",
        index: 12,
        negativeInt: false,
      },
    ]);
  });

  it("should extract operator followed by a number at the end of a sentence with a period", () => {
    const input = "The result of the operation is + 10.";
    const result = extractAllMatches(input);
    expect(result).toEqual([
      {
        matchType: "operator",
        input: "+",
        index: 31,
      },
      {
        integer: "10",
        decimal: undefined,
        exponent: undefined,
        negativeInt: false,
        matchType: "number",
        input: "10",
        index: 33,
      },
    ]);
  });

  it("should handle complex mixed expressions in a sentence ending with a period", () => {
    const input =
      "The formula uses values of 5m^2, 3e4, and $1,000.50, and $1,000, and $1000.50, and the result is 10².";
    const result = extractAllMatches(input);

    expect(result).toEqual([
      // Unchanged from original
      {
        integer: "5",
        decimal: undefined,
        unit: "m", // Changed from "kg" to "m" to match the input
        exponent: undefined,
        unitExponent: "2",
        matchType: "unit",
        input: "5m^2",
        index: 27, // These indexes might need adjustment based on your actual implementation

        negativeInt: false,
      },
      {
        decimal: undefined,
        exponent: "4",
        index: 33,
        input: "3e4",
        integer: "3",

        matchType: "scientific",
        negativeInt: false,
      },

      {
        currency: "$",
        decimal: "50",
        index: 42,
        input: "$1,000.50",
        integer: "1000",

        matchType: "symbolCurrency",
        negativeInt: false,
      },
      {
        currency: "$",
        decimal: undefined,
        index: 57,
        input: "$1,000",
        integer: "1000",

        matchType: "symbolCurrency",
        negativeInt: false,
      },
      {
        currency: "$",
        decimal: "50",
        index: 69,
        input: "$1000.50",
        integer: "1000",

        matchType: "symbolCurrency",
        negativeInt: false,
      },
      {
        decimal: undefined,
        exponent: "²",
        index: 97,
        input: "10²",
        integer: "10",

        matchType: "number",
        negativeInt: false,
      },
    ]);
  });
});
