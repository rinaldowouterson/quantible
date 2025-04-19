import { extractFirstMatch, extractAllMatches } from "../src/utils/extraction/patternExtractor";

describe("patternExtractor", () => {
  describe("extractFirstMatch", () => {
    it("should return null if the input string contains no matches", () => {
      const input = "No numbers here";
      const result = extractFirstMatch(input);
      expect(result).toBeNull();
    });

    it("should extract currency with symbol", () => {
      const input = "$1,000";
      const result = extractFirstMatch(input);
      expect(result).toEqual({
        integer: "1000",
        decimal: undefined,
        negativeInt: false,
        currency: "$",
        matchType: "symbolCurrency",
        input: "$1,000",
        index: 0,
      });
    });

    it("should extract currency with code", () => {
      const input = "1000 USD";
      const result = extractFirstMatch(input);
      expect(result).toEqual({
        integer: "1000",
        decimal: undefined,
        currency: "USD",
        negativeInt: false,
        matchType: "codeCurrency",
        input: "1000 USD",
        index: 0,
      });
    });

    it("should extract scientific notation", () => {
      const input = "5e3";
      const result = extractFirstMatch(input);
      expect(result).toEqual({
        integer: "5",
        decimal: undefined,
        exponent: "3",
        negativeInt: false,
        matchType: "scientific",
        input: "5e3",
        index: 0,
      });
    });

    it("should extract units", () => {
      const input = "5m^2";
      const result = extractFirstMatch(input);
      expect(result).toEqual({
        integer: "5",
        decimal: undefined,
        unit: "m",
        exponent: undefined,
        unitExponent: "2",
        negativeInt: false,
        matchType: "unit",
        input: "5m^2",
        index: 0,
      });
    });

    it("should extract integers", () => {
      const input = "1000";
      const result = extractFirstMatch(input);
      expect(result).toEqual({
        integer: "1000",
        decimal: undefined,
        exponent: undefined,
        negativeInt: false,
        matchType: "number",
        input: "1000",
        index: 0,
      });
    });

    it("should extract mathematical operators", () => {
      const input = "+";
      const result = extractFirstMatch(input);
      expect(result).toEqual({
        matchType: "operator",
        input: "+",
        index: 0,
      });
    });

    it("should extract unit only", () => {
      const input = "m";
      const result = extractFirstMatch(input);
      expect(result).toEqual({
        unit: "m",
        unitExponent: undefined,
        matchType: "unitOnly",
        input: "m",
        index: 0,
      });
    });
  });

  describe("extractAllMatches", () => {
    it("should return an empty array if the input string contains no numbers", () => {
      const input = "No numbers here";
      const result = extractAllMatches(input);
      expect(result).toEqual([]);
    });

    it("should extract currency with symbol", () => {
      const input = "$1,000 $1000 -$50";
      const result = extractAllMatches(input);
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

    it("should extract currency with code", () => {
      const input = "1000 USD 50 EUR -50 USD";
      const result = extractAllMatches(input);
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
      const input = "1000 -500 10^3 -10³";
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
  });
});
