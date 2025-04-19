import { convertQuantities } from "../src/index";
import {
  baseNumber,
  baseCurrency,
  baseNumberUnit,
  baseUnitOnly,
  baseOperator,
  baseScientific,
} from "../src/interfaces/definitions";

describe("translateMatch", () => {
  it("should convert number extraction result to spoken words", () => {
    const numberExtractionResult: baseNumber = {
      input: "123",
      integer: "123",
      negativeInt: false,
      index: 0,
      matchType: "number",
    };
    expect(convertQuantities.translateMatch(numberExtractionResult)).toBe("one hundred twenty three");
  });

  it("should convert symbol currency extraction result to spoken words", () => {
    const symbolCurrencyExtractionResult: baseCurrency = {
      input: "$123",
      integer: "123",
      negativeInt: false,
      index: 0,
      matchType: "symbolCurrency",
      currency: "$",
    };
    expect(convertQuantities.translateMatch(symbolCurrencyExtractionResult)).toBe("one hundred twenty three dollars");
  });

  it("should convert code currency extraction result to spoken words", () => {
    const codeCurrencyExtractionResult: baseCurrency = {
      input: "USD 123",
      integer: "123",
      negativeInt: false,
      index: 0,
      matchType: "codeCurrency",
      currency: "USD",
    };
    expect(convertQuantities.translateMatch(codeCurrencyExtractionResult)).toBe("one hundred twenty three dollars");
  });

  it("should convert unit extraction result to spoken words", () => {
    const unitExtractionResult: baseNumberUnit = {
      input: "123 kg",
      integer: "123",
      negativeInt: false,
      index: 0,
      matchType: "unit",
      unit: "kg",
    };
    expect(convertQuantities.translateMatch(unitExtractionResult)).toBe("one hundred twenty three kilograms");
  });

  it("should convert unitOnly extraction result to spoken words", () => {
    const unitOnlyExtractionResult: baseUnitOnly = {
      input: "kg",
      unit: "kg",
      index: 0,
      matchType: "unitOnly",
    };
    expect(convertQuantities.translateMatch(unitOnlyExtractionResult)).toBe("kilogram");
  });

  it("should convert operator extraction result to spoken words", () => {
    const operatorExtractionResult: baseOperator = {
      input: "+",
      index: 0,
      matchType: "operator",
    };
    expect(convertQuantities.translateMatch(operatorExtractionResult)).toBe("plus");
  });

  it("should convert scientific extraction result to spoken words", () => {
    const scientificExtractionResult: baseScientific = {
      input: "1e3",
      integer: "1",
      exponent: "3",
      negativeInt: false,
      index: 0,
      matchType: "scientific",
    };
    expect(convertQuantities.translateMatch(scientificExtractionResult)).toBe("one times ten to the power of three");
  });
});

describe("autoReplaceAllMatches", () => {
  it("should cover lines in autoReplaceAllMatches function", () => {
    expect(convertQuantities.autoReplaceAllMatches("123 kg + 456")).toBe(
      "one hundred twenty three kilograms plus four hundred fifty six",
    );
    expect(convertQuantities.autoReplaceAllMatches("123")).toBe("one hundred twenty three");
    expect(convertQuantities.autoReplaceAllMatches("")).toBe("");
    expect(convertQuantities.autoReplaceAllMatches("abc")).toBe("abc");
    expect(convertQuantities.autoReplaceAllMatches("123abc456")).toBe("one hundred twenty threeabc456");
    expect(convertQuantities.autoReplaceAllMatches("abc123")).toBe("abc123");
  });
});
