import { convertCurrencyToSpokenWord } from "../src/converters/convertCurrencyToSpokenWord";
import { convertScientificExpressionToSpokenWord } from "../src/converters/convertScientificExpressionToSpokenWord";
import { convertNumericUnitToSpokenWord } from "../src/converters/convertNumericUnitToSpokenWord";
import { convertUnitOnlyToSpokenWord } from "../src/converters/convertUnitOnlyToSpokenWord";
import { convertOperatorToSpokenWord } from "../src/converters/convertOperatorToSpokenWord";
import { convertNumberToSpokenWord } from "../src/converters/convertNumberToSpokenWord";
import { extractAllMatches } from "../src/utils/extraction/patternExtractor";
import {
  baseCurrency,
  baseNumberUnit,
  baseOperator,
  baseScientific,
  baseUnitOnly,
  baseNumber,
} from "../src/interfaces/definitions";

import { convertQuantities } from "../src/index";

describe("extractConvert", () => {
  it("should convert number in a sentence", () => {
    const input = "The number is 123.45";
    const extracted = extractAllMatches(input)[0] as baseNumber;
    expect(convertNumberToSpokenWord(extracted)).toBe("one hundred twenty-three point forty-five");
  });

  it("should convert currency in a sentence", () => {
    const input = "The price is $123.45";
    const extracted = extractAllMatches(input)[0] as baseCurrency;
    expect(convertCurrencyToSpokenWord(extracted)).toBe("one hundred twenty-three dollars and forty-five cents");
  });

  it("should convert scientific notation in a sentence", () => {
    const input = "The value is 1.23e3";
    const extracted = extractAllMatches(input)[0] as baseScientific;
    expect(convertScientificExpressionToSpokenWord(extracted)).toBe(
      "one point twenty-three times ten to the power of three",
    );
  });

  it("should convert unit in a sentence", () => {
    const input = "The distance is 123.45 km";
    const extracted = extractAllMatches(input)[0] as baseNumberUnit;
    expect(convertNumericUnitToSpokenWord(extracted)).toBe("one hundred twenty-three point forty-five kilometers");
  });

  it("should not mismatch units", () => {
    const input = "dit is een test 123 because we rock 100mph";
    const extracted = convertQuantities.autoReplaceAllMatches(input);
    expect(extracted).toBe("dit is een test one hundred twenty-three because we rock one hundred miles per hour");
  });

  it("should convert unit only in a sentence", () => {
    const input = "The unit is m/s";
    const extracted = extractAllMatches(input)[0] as baseUnitOnly;
    expect(convertUnitOnlyToSpokenWord(extracted)).toBe("meter per second");
  });

  it("should convert operator in a sentence", () => {
    const input = "The operator is +";
    const extracted = extractAllMatches(input)[0] as baseOperator;
    expect(convertOperatorToSpokenWord(extracted)).toBe("plus");
  });

  it("should convert negative number in a sentence", () => {
    const input = "The number is -123.45";
    const extracted = extractAllMatches(input)[0] as baseNumber;
    expect(convertNumberToSpokenWord(extracted)).toBe("negative one hundred twenty-three point forty-five");
  });

  it("should convert negative currency in a sentence", () => {
    const input = "The price is -$123.45";
    const extracted = extractAllMatches(input)[0] as baseCurrency;
    expect(convertCurrencyToSpokenWord(extracted)).toBe(
      "negative one hundred twenty-three dollars and forty-five cents",
    );
  });

  it("should convert negative scientific notation in a sentence", () => {
    const input = "The value is -1.23e3";
    const extracted = extractAllMatches(input)[0] as baseScientific;
    expect(convertScientificExpressionToSpokenWord(extracted)).toBe(
      "negative one point twenty-three times ten to the power of three",
    );
  });

  it("should convert negative unit in a sentence", () => {
    const input = "The distance is -123.45 km";
    const extracted = extractAllMatches(input)[0] as baseNumberUnit;
    expect(convertNumericUnitToSpokenWord(extracted)).toBe(
      "negative one hundred twenty-three point forty-five kilometers",
    );
  });

  it("should convert scientific notation with negative exponent", () => {
    const input = "The value is 1.23e-3";
    const extracted = extractAllMatches(input)[0] as baseScientific;
    expect(convertScientificExpressionToSpokenWord(extracted)).toBe(
      "one point twenty-three times ten to the power of negative three",
    );
  });

  it("should convert unit with negative exponent", () => {
    const input = "The distance is 123.45 km^-1";
    const extracted = extractAllMatches(input)[0] as baseNumberUnit;
    expect(convertNumericUnitToSpokenWord(extracted)).toBe(
      "one hundred twenty-three point forty-five kilometers to the power of negative one",
    );
  });

  it("should convert unit with negative exponent (superscript)", () => {
    const input = "The distance is 123.45 km⁻¹";
    const extracted = convertQuantities.autoReplaceAllMatches(input);
    expect(extracted).toBe(
      "The distance is one hundred twenty-three point forty-five kilometers to the power of negative one",
    );
  });

  it("should convert combined negative number and negative exponent", () => {
    const input = "The value is -1.23e-3";
    const extracted = extractAllMatches(input)[0] as baseScientific;
    expect(convertScientificExpressionToSpokenWord(extracted)).toBe(
      "negative one point twenty-three times ten to the power of negative three",
    );
  });

  it("should convert complex sentence with negative exponent", () => {
    const input = "The speed is 10 m/s^-2 and the distance is 20 km";
    const extracted1 = extractAllMatches(input)[0] as baseNumberUnit;
    const extracted2 = extractAllMatches(input)[1] as baseNumberUnit;
    expect(convertNumericUnitToSpokenWord(extracted1)).toBe("ten meters per second to the power of negative two");
    expect(convertNumericUnitToSpokenWord(extracted2)).toBe("twenty kilometers");
  });

  it("should convert complex sentence with negative exponent (superscript)", () => {
    const input = "The speed is 10 m/s⁻² and the distance is 20 km";
    const extracted = extractAllMatches(input);

    expect(convertNumericUnitToSpokenWord(extracted[0] as baseNumberUnit)).toBe(
      "ten meters per second to the power of negative two",
    );
    expect(convertNumericUnitToSpokenWord(extracted[1] as baseNumberUnit)).toBe("twenty kilometers");
  });

  it("should convert new typography symbols", () => {
    expect(convertQuantities.autoReplaceAllMatches("Connect A & C")).toBe("Connect A and C");
    expect(convertQuantities.autoReplaceAllMatches("Connect X & Y")).toBe("Connect X and Y");
    expect(convertQuantities.autoReplaceAllMatches("Email at support@example.com")).toBe(
      "Email at support at example dot com",
    );
    expect(convertQuantities.autoReplaceAllMatches("Issue #123")).toBe("Issue hash one hundred twenty-three");
    expect(convertQuantities.autoReplaceAllMatches("Select A | C")).toBe("Select A pipe C");
  });

  it("should convert dot, hyphen, underscore with constraints", () => {
    // Dot in domain names
    expect(convertQuantities.autoReplaceAllMatches("example.com")).toBe("example dot com");
    expect(convertQuantities.autoReplaceAllMatches("sub.example.co.uk")).toBe("sub dot example dot co dot uk");
    expect(convertQuantities.autoReplaceAllMatches("5.com")).toBe("five dot com");
    expect(convertQuantities.autoReplaceAllMatches("example.123.com")).toBe("example.one hundred twenty-three dot com");
    // Dot not matched when decimal number (currency conversion uses fraction)
    expect(convertQuantities.autoReplaceAllMatches("The price is 5.5 USD")).toBe(
      "The price is five dollars and fifty cents",
    );
    // Dot not matched at end of sentence
    expect(convertQuantities.autoReplaceAllMatches("This is a sentence.")).toBe("This is a sentence.");
    expect(convertQuantities.autoReplaceAllMatches("First sentence. Second sentence.")).toBe(
      "First sentence. Second sentence.",
    );
    // Dot in abbreviations
    expect(convertQuantities.autoReplaceAllMatches("e.g.")).toBe("example given");
    expect(convertQuantities.autoReplaceAllMatches("i.e.")).toBe("that is");
    // Dot with parentheses
    expect(convertQuantities.autoReplaceAllMatches("Visit example.com (the best).")).toBe(
      "Visit example dot com (the best).",
    );

    // Hyphen removed from common symbols, so it's not converted (remains as hyphen)
    expect(convertQuantities.autoReplaceAllMatches("e-mail")).toBe("e-mail");
    expect(convertQuantities.autoReplaceAllMatches("state-of-the-art")).toBe("state-of-the-art");
    // Hyphen not matched when part of negative number or operator
    expect(convertQuantities.autoReplaceAllMatches("Temperature is -5°C")).toBe(
      "Temperature is negative five degrees Celsius",
    );
    expect(convertQuantities.autoReplaceAllMatches("10 - 5")).toBe("ten minus five");
    expect(convertQuantities.autoReplaceAllMatches("word-")).toBe("word-");
    expect(convertQuantities.autoReplaceAllMatches("-word")).toBe("-word");

    // Underscore anywhere
    expect(convertQuantities.autoReplaceAllMatches("foo_bar")).toBe("foo underscore bar");
    expect(convertQuantities.autoReplaceAllMatches("file_name_v2")).toBe("file underscore name underscore v two");
    expect(convertQuantities.autoReplaceAllMatches("_private")).toBe("underscore private");
    expect(convertQuantities.autoReplaceAllMatches("trailing_")).toBe("trailing underscore");
  });

  it("should convert new math operators", () => {
    expect(convertQuantities.autoReplaceAllMatches("10 > 5")).toBe("ten is greater than five");
    expect(convertQuantities.autoReplaceAllMatches("5 < 10")).toBe("five is less than ten");
    expect(convertQuantities.autoReplaceAllMatches("x = 10")).toBe("x equals ten");
    expect(convertQuantities.autoReplaceAllMatches("x ≠ y")).toBe("x is not equal to y");
    expect(convertQuantities.autoReplaceAllMatches("x ≈ y")).toBe("x is approximately equal to y");
  });

  it("should convert new currencies", () => {
    expect(convertQuantities.autoReplaceAllMatches("100 ₩")).toBe("one hundred won");
    expect(convertQuantities.autoReplaceAllMatches("100 ₫")).toBe("one hundred dong");
    expect(convertQuantities.autoReplaceAllMatches("100 ฿")).toBe("one hundred baht");
    expect(convertQuantities.autoReplaceAllMatches("The price is 123 ₩")).toBe(
      "The price is one hundred twenty-three won",
    );
  });
});
