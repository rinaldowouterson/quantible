/* eslint-disable @typescript-eslint/no-explicit-any */
import { validateExtractionResult } from "../src/utils/validateExtractionResultObject";
import { ExtractionResult } from "../src/interfaces/definitions";

describe("validateExtractionResult error cases", () => {
  describe("number", () => {
    it("should throw an error if 'integer' property is missing", () => {
      expect(() =>
        validateExtractionResult({ input: "123", matchType: "number", index: 0 } as ExtractionResult),
      ).toThrow(
        "validateExtractionResult: For matchType 'number', ExtractionResult is missing the 'integer' property.",
      );
    });

    it("should throw an error if 'integer' property is not a string", () => {
      expect(() =>
        validateExtractionResult({ input: "123", matchType: "number", index: 0, integer: 123 } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'number', ExtractionResult 'integer' property must be a string.",
      );
    });

    it("should throw an error if 'decimal' property is present but not a string", () => {
      expect(() =>
        validateExtractionResult({ input: "123", matchType: "number", index: 0, integer: "123", decimal: 123 } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'number', ExtractionResult 'decimal' property must be a string if present.",
      );
    });

    it("should throw an error if 'negativeInt' property is missing", () => {
      expect(() =>
        validateExtractionResult({ input: "123", matchType: "number", index: 0, integer: "123" } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'number', ExtractionResult is missing the 'negativeInt' property.",
      );
    });

    it("should throw an error if 'negativeInt' property is not a boolean", () => {
      expect(() =>
        validateExtractionResult({
          input: "123",
          matchType: "number",
          index: 0,
          integer: "123",
          negativeInt: "true",
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'number', ExtractionResult 'negativeInt' property must be a boolean.",
      );
    });

    it("should throw an error if 'exponent' property is present but not a string", () => {
      expect(() =>
        validateExtractionResult({
          input: "123",
          matchType: "number",
          index: 0,
          integer: "123",
          negativeInt: false,
          exponent: 123,
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'number', ExtractionResult 'exponent' property must be a string if present.",
      );
    });
  });

  describe("symbolCurrency", () => {
    it("should throw an error if 'integer' property is missing", () => {
      expect(() => validateExtractionResult({ input: "$123", matchType: "symbolCurrency", index: 0 } as any)).toThrow(
        "validateExtractionResult: For matchType 'symbolCurrency', ExtractionResult is missing the 'integer' property.",
      );
    });

    it("should throw an error if 'integer' property is not a string", () => {
      expect(() =>
        validateExtractionResult({ input: "$123", matchType: "symbolCurrency", index: 0, integer: 123 } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'symbolCurrency', ExtractionResult 'integer' property must be a string.",
      );
    });

    it("should throw an error if 'decimal' property is present but not a string", () => {
      expect(() =>
        validateExtractionResult({
          input: "$123",
          matchType: "symbolCurrency",
          index: 0,
          integer: "123",
          decimal: 123,
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'symbolCurrency', ExtractionResult 'decimal' property must be a string if present.",
      );
    });

    it("should throw an error if 'negativeInt' property is missing", () => {
      expect(() =>
        validateExtractionResult({ input: "$123", matchType: "symbolCurrency", index: 0, integer: "123" } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'symbolCurrency', ExtractionResult is missing the 'negativeInt' property.",
      );
    });

    it("should throw an error if 'negativeInt' property is not a boolean", () => {
      expect(() =>
        validateExtractionResult({
          input: "$123",
          matchType: "symbolCurrency",
          index: 0,
          integer: "123",
          negativeInt: "true",
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'symbolCurrency', ExtractionResult 'negativeInt' property must be a boolean.",
      );
    });

    it("should throw an error if 'currency' property is missing", () => {
      expect(() =>
        validateExtractionResult({
          input: "$123",
          matchType: "symbolCurrency",
          index: 0,
          integer: "123",
          negativeInt: false,
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'symbolCurrency', ExtractionResult is missing the 'currency' property.",
      );
    });

    it("should throw an error if 'currency' property is not a string", () => {
      expect(() =>
        validateExtractionResult({
          input: "$123",
          matchType: "symbolCurrency",
          index: 0,
          integer: "123",
          negativeInt: false,
          currency: 123,
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'symbolCurrency', ExtractionResult 'currency' property must be a string.",
      );
    });
  });

  describe("unit", () => {
    it("should throw an error if 'integer' property is missing", () => {
      expect(() => validateExtractionResult({ input: "123m", matchType: "unit", index: 0 } as any)).toThrow(
        "validateExtractionResult: For matchType 'unit', ExtractionResult is missing the 'integer' property.",
      );
    });

    it("should throw an error if 'integer' property is not a string", () => {
      expect(() =>
        validateExtractionResult({ input: "123m", matchType: "unit", index: 0, integer: 123 } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'unit', ExtractionResult 'integer' property must be a string.",
      );
    });

    it("should throw an error if 'decimal' property is present but not a string", () => {
      expect(() =>
        validateExtractionResult({ input: "123m", matchType: "unit", index: 0, integer: "123", decimal: 123 } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'unit', ExtractionResult 'decimal' property must be a string if present.",
      );
    });

    it("should throw an error if 'negativeInt' property is missing", () => {
      expect(() =>
        validateExtractionResult({ input: "123m", matchType: "unit", index: 0, integer: "123" } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'unit', ExtractionResult is missing the 'negativeInt' property.",
      );
    });

    it("should throw an error if 'negativeInt' property is not a boolean", () => {
      expect(() =>
        validateExtractionResult({
          input: "123m",
          matchType: "unit",
          index: 0,
          integer: "123",
          negativeInt: "true",
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'unit', ExtractionResult 'negativeInt' property must be a boolean.",
      );
    });

    it("should throw an error if 'unit' property is missing", () => {
      expect(() =>
        validateExtractionResult({
          input: "123m",
          matchType: "unit",
          index: 0,
          integer: "123",
          negativeInt: false,
        } as any),
      ).toThrow("validateExtractionResult: For matchType 'unit', ExtractionResult is missing the 'unit' property.");
    });

    it("should throw an error if 'unit' property is not a string", () => {
      expect(() =>
        validateExtractionResult({
          input: "123m",
          matchType: "unit",
          index: 0,
          integer: "123",
          negativeInt: false,
          unit: 123,
        } as any),
      ).toThrow("validateExtractionResult: For matchType 'unit', ExtractionResult 'unit' property must be a string.");
    });

    it("should throw an error if 'exponent' property is present but not a string", () => {
      expect(() =>
        validateExtractionResult({
          input: "123m",
          matchType: "unit",
          index: 0,
          integer: "123",
          negativeInt: false,
          unit: "m",
          exponent: 123,
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'unit', ExtractionResult 'exponent' property must be a string if present.",
      );
    });

    it("should throw an error if 'unitExponent' property is present but not a string", () => {
      expect(() =>
        validateExtractionResult({
          input: "123m",
          matchType: "unit",
          index: 0,
          integer: "123",
          negativeInt: false,
          unit: "m",
          unitExponent: 123,
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'unit', ExtractionResult 'unitExponent' property must be a string if present.",
      );
    });
  });

  describe("unitOnly", () => {
    it("should throw an error if 'unit' property is missing", () => {
      expect(() => validateExtractionResult({ input: "m", matchType: "unitOnly", index: 0 } as any)).toThrow(
        "validateExtractionResult: For matchType 'unitOnly', ExtractionResult is missing the 'unit' property.",
      );
    });

    it("should throw an error if 'unit' property is not a string", () => {
      expect(() => validateExtractionResult({ input: "m", matchType: "unitOnly", index: 0, unit: 123 } as any)).toThrow(
        "validateExtractionResult: For matchType 'unitOnly', ExtractionResult 'unit' property must be a string.",
      );
    });

    it("should throw an error if 'unitExponent' property is present but not a string", () => {
      expect(() =>
        validateExtractionResult({ input: "m", matchType: "unitOnly", index: 0, unit: "m", unitExponent: 123 } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'unitOnly', ExtractionResult 'unitExponent' property must be a string if present.",
      );
    });
  });

  describe("scientific", () => {
    it("should throw an error if 'integer' property is missing", () => {
      expect(() => validateExtractionResult({ input: "5E10", matchType: "scientific", index: 0 } as any)).toThrow(
        "validateExtractionResult: For matchType 'scientific', ExtractionResult is missing the 'integer' property.",
      );
    });

    it("should throw an error if 'integer' property is not a string", () => {
      expect(() =>
        validateExtractionResult({ input: "5E10", matchType: "scientific", index: 0, integer: 5 } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'scientific', ExtractionResult 'integer' property must be a string.",
      );
    });

    it("should throw an error if 'decimal' property is present but not a string", () => {
      expect(() =>
        validateExtractionResult({
          input: "5.5E10",
          matchType: "scientific",
          index: 0,
          integer: "5",
          decimal: 5,
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'scientific', ExtractionResult 'decimal' property must be a string if present.",
      );
    });

    it("should throw an error if 'negativeInt' property is missing", () => {
      expect(() =>
        validateExtractionResult({ input: "5E10", matchType: "scientific", index: 0, integer: "5" } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'scientific', ExtractionResult is missing the 'negativeInt' property.",
      );
    });

    it("should throw an error if 'negativeInt' property is not a boolean", () => {
      expect(() =>
        validateExtractionResult({
          input: "5E10",
          matchType: "scientific",
          index: 0,
          integer: "5",
          negativeInt: "false",
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'scientific', ExtractionResult 'negativeInt' property must be a boolean.",
      );
    });

    it("should throw an error if 'exponent' property is missing", () => {
      expect(() =>
        validateExtractionResult({
          input: "5E10",
          matchType: "scientific",
          index: 0,
          integer: "5",
          negativeInt: false,
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'scientific', ExtractionResult is missing the 'exponent' property.",
      );
    });

    it("should throw an error if 'exponent' property is not a string", () => {
      expect(() =>
        validateExtractionResult({
          input: "5E10",
          matchType: "scientific",
          index: 0,
          integer: "5",
          negativeInt: false,
          exponent: 10,
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'scientific', ExtractionResult 'exponent' property must be a string.",
      );
    });
  });

  it("should throw an error if extractionResult is null or undefined", () => {
    expect(() => validateExtractionResult(null as any)).toThrow(
      "validateExtractionResult: ExtractionResult cannot be null or undefined.",
    );
    expect(() => validateExtractionResult(undefined as any)).toThrow(
      "validateExtractionResult: ExtractionResult cannot be null or undefined.",
    );
  });

  it("should throw an error if extractionResult is not an object", () => {
    expect(() => validateExtractionResult("not an object" as any)).toThrow(
      "validateExtractionResult: ExtractionResult must be an object.",
    );
  });

  it("should throw an error if extractionResult is missing the 'input' property", () => {
    expect(() => validateExtractionResult({} as any)).toThrow(
      "validateExtractionResult: ExtractionResult is missing the 'input' property.",
    );
  });

  it("should throw an error if extractionResult 'input' property is not a string", () => {
    expect(() => validateExtractionResult({ input: 123 } as any)).toThrow(
      "validateExtractionResult: ExtractionResult 'input' property must be a string.",
    );
  });

  it("should throw an error if extractionResult is missing the 'matchType' property", () => {
    expect(() => validateExtractionResult({ input: "123" } as any)).toThrow(
      "validateExtractionResult: ExtractionResult is missing the 'matchType' property.",
    );
  });

  it("should throw an error if extractionResult 'matchType' property is not a string", () => {
    expect(() => validateExtractionResult({ input: "123", matchType: 123 } as any)).toThrow(
      "validateExtractionResult: ExtractionResult 'matchType' property must be a string.",
    );
  });

  it("should throw an error if extractionResult is missing the 'index' property", () => {
    expect(() => validateExtractionResult({ input: "123", matchType: "number" } as any)).toThrow(
      "validateExtractionResult: ExtractionResult is missing the 'index' property.",
    );
  });

  it("should throw an error if extractionResult 'index' property is not a number", () => {
    expect(() => validateExtractionResult({ input: "123", matchType: "number", index: "123" } as any)).toThrow(
      "validateExtractionResult: ExtractionResult 'index' property must be a number.",
    );
  });
});

describe("validateExtractionResult error cases - appended", () => {
  describe("number", () => {
    it("should throw an error if 'integer' property contains invalid characters", () => {
      expect(() =>
        validateExtractionResult({
          input: "123a",
          matchType: "number",
          index: 0,
          integer: "123a",
          negativeInt: false,
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'number', ExtractionResult 'integer' property must contain only integers.",
      );
    });

    it("should throw an error if 'decimal' property contains invalid characters", () => {
      expect(() =>
        validateExtractionResult({
          input: "123.a",
          matchType: "number",
          index: 0,
          integer: "123",
          decimal: "a",
          negativeInt: false,
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'number', ExtractionResult 'decimal' property must contain only integers.",
      );
    });

    it("should throw an error if 'exponent' property contains invalid characters", () => {
      expect(() =>
        validateExtractionResult({
          input: "123e+",
          matchType: "number",
          index: 0,
          integer: "123",
          negativeInt: false,
          exponent: "a",
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'number', ExtractionResult 'exponent' property must contain only integers or superscript integers (and their respective negative symbol - and ⁻).",
      );
    });
  });

  describe("symbolCurrency", () => {
    it("should throw an error if 'integer' property contains invalid characters", () => {
      expect(() =>
        validateExtractionResult({
          input: "$123a",
          matchType: "symbolCurrency",
          index: 0,
          integer: "123a",
          negativeInt: false,
          currency: "$",
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'symbolCurrency', ExtractionResult 'integer' property must contain only integers.",
      );
    });

    it("should throw an error if 'decimal' property contains invalid characters", () => {
      expect(() =>
        validateExtractionResult({
          input: "$123.a",
          matchType: "symbolCurrency",
          index: 0,
          integer: "123",
          decimal: "a",
          negativeInt: false,
          currency: "$",
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'symbolCurrency', ExtractionResult 'decimal' property must contain only integers.",
      );
    });
  });

  describe("unit", () => {
    it("should throw an error if 'integer' property contains invalid characters", () => {
      expect(() =>
        validateExtractionResult({
          input: "123am",
          matchType: "unit",
          index: 0,
          integer: "123a",
          negativeInt: false,
          unit: "m",
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'unit', ExtractionResult 'integer' property must contain only integers.",
      );
    });

    it("should throw an error if 'decimal' property contains invalid characters", () => {
      expect(() =>
        validateExtractionResult({
          input: "123.am",
          matchType: "unit",
          index: 0,
          integer: "123",
          decimal: "a",
          negativeInt: false,
          unit: "m",
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'unit', ExtractionResult 'decimal' property must contain only integers.",
      );
    });

    it("should throw an error if 'exponent' property contains invalid characters", () => {
      expect(() =>
        validateExtractionResult({
          input: "123e+m",
          matchType: "unit",
          index: 0,
          integer: "123",
          negativeInt: false,
          unit: "m",
          exponent: "a",
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'unit', ExtractionResult 'exponent' property must contain only integers or superscript integers (and their respective negative symbol - and ⁻).",
      );
    });

    it("should throw an error if 'unitExponent' property contains invalid characters", () => {
      expect(() =>
        validateExtractionResult({
          input: "123m",
          matchType: "unit",
          index: 0,
          integer: "123",
          negativeInt: false,
          unit: "m",
          unitExponent: "a",
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'unit', ExtractionResult 'unitExponent' property must contain only integers or superscript integers (and their respective negative symbol - and ⁻).",
      );
    });
  });

  describe("unitOnly", () => {
    it("should throw an error if 'unitExponent' property contains invalid characters", () => {
      expect(() =>
        validateExtractionResult({ input: "m", matchType: "unitOnly", index: 0, unit: "m", unitExponent: "a" } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'unitOnly', ExtractionResult 'unitExponent' property must contain only integers or superscript integers (and their respective negative symbol - and ⁻).",
      );
    });
  });

  describe("scientific", () => {
    it("should throw an error if 'integer' property contains invalid characters", () => {
      expect(() =>
        validateExtractionResult({
          input: "5aE10",
          matchType: "scientific",
          index: 0,
          integer: "5a",
          negativeInt: false,
          exponent: "10",
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'scientific', ExtractionResult 'integer' property must contain only integers.",
      );
    });

    it("should throw an error if 'decimal' property contains invalid characters", () => {
      expect(() =>
        validateExtractionResult({
          input: "5.aE10",
          matchType: "scientific",
          index: 0,
          integer: "5",
          decimal: "a",
          negativeInt: false,
          exponent: "10",
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'scientific', ExtractionResult 'decimal' property must contain only integers.",
      );
    });

    it("should throw an error if 'exponent' property contains invalid characters", () => {
      expect(() =>
        validateExtractionResult({
          input: "5Ea",
          matchType: "scientific",
          index: 0,
          integer: "5",
          negativeInt: false,
          exponent: "a",
        } as any),
      ).toThrow(
        "validateExtractionResult: For matchType 'scientific', ExtractionResult 'exponent' property must contain only integers or superscript integers (and their respective negative symbol - and ⁻).",
      );
    });
  });
});
