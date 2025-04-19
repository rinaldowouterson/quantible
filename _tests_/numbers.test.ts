import { positiveInteger } from "../src/utils/stringBuilding/positiveInteger";
import { twoDigit } from "../src/utils/stringBuilding/twoDigits";
import { perDigit } from "../src/utils/stringBuilding/perDigit";
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
} from "../src/interfaces/definitions";
describe("positiveInteger", () => {
  it("should return 'zero' for 0", () => {
    expect(positiveInteger(0)).toBe("zero");
  });

  it("should convert 1 to 'one'", () => {
    expect(positiveInteger(1)).toBe("one");
  });

  it("should convert 10 to 'ten'", () => {
    expect(positiveInteger(10)).toBe("ten");
  });

  it("should convert 100 to 'one hundred'", () => {
    expect(positiveInteger(100)).toBe("one hundred");
  });

  it("should convert 123 to 'one hundred twenty three'", () => {
    expect(positiveInteger(123)).toBe("one hundred twenty three");
  });

  it("should convert 1000 to 'one thousand'", () => {
    expect(positiveInteger(1000)).toBe("one thousand");
  });

  it("should convert 12345 to 'twelve thousand three hundred forty five'", () => {
    expect(positiveInteger(12345)).toBe("twelve thousand three hundred forty five");
  });

  it("should convert 1234567 to 'one million two hundred thirty four thousand five hundred sixty seven'", () => {
    expect(positiveInteger(1234567)).toBe("one million two hundred thirty four thousand five hundred sixty seven");
  });

  it("should handle large numbers", () => {
    expect(positiveInteger(1234567890)).toBe(
      "one billion two hundred thirty four million five hundred sixty seven thousand eight hundred ninety",
    );
  });

  it("should return an error message for negative numbers", () => {
    let temp = positiveInteger(-1);
    // console.log({ temp });

    expect(temp).toBe("Invalid input: Please provide a non-negative integer.");
  });
});

describe("twoDigitDecimal", () => {
  it("should convert '0' to ''", () => {
    expect(twoDigit("0")).toBe("");
  });

  it("should convert '00' to 'zero'", () => {
    expect(twoDigit("00")).toBe("zero");
  });

  it("should convert '01' to 'one'", () => {
    expect(twoDigit("01")).toBe("one");
  });

  it("should convert '10' to 'ten'", () => {
    expect(twoDigit("10")).toBe("ten");
  });

  it("should convert '25' to 'twenty five'", () => {
    expect(twoDigit("25")).toBe("twenty five");
  });

  it("should convert '99' to 'ninety nine'", () => {
    expect(twoDigit("99")).toBe("ninety nine");
  });

  it("should return an empty string for numbers >= 100", () => {
    expect(twoDigit("100")).toBe("");
  });

  it("should return an empty string for numbers < 0", () => {
    const temp = twoDigit(" 1");
    // console.log({ temp });
    expect(temp).toBe("");
  });
});

describe("perDigitDecimal", () => {
  it("should convert '1' to 'one'", () => {
    expect(perDigit("1")).toBe("one");
  });

  it("should convert '12' to 'one two'", () => {
    expect(perDigit("12")).toBe("one two");
  });

  it("should convert '123' to 'one two three'", () => {
    expect(perDigit("123")).toBe("one two three");
  });

  it("should convert '4567' to 'four five six seven'", () => {
    expect(perDigit("4567")).toBe("four five six seven");
  });

  it("should convert '0' to 'zero'", () => {
    expect(perDigit("0")).toBe("zero");
  });

  it("should convert '00' to 'zero zero'", () => {
    expect(perDigit("00")).toBe("zero zero");
  });
});

// ######## NUMBER TO SPOKEN WORD ########
describe("convertNumberToSpokenWord", () => {
  it("should convert { integer: '123', decimal: '45', negativeInt: false } to 'one hundred twenty three point twenty five'", () => {
    expect(
      convertNumberToSpokenWord({
        integer: "123",
        decimal: "45",
        negativeInt: false,
        matchType: "number",
        input: "",
        index: 0,
      }),
    ).toBe("one hundred twenty three point forty five");
  });

  it("should convert { integer: '0', decimal: '00', negativeInt: false } to 'zero point zero zero'", () => {
    expect(
      convertNumberToSpokenWord({
        integer: "0",
        decimal: "00",
        negativeInt: false,
        matchType: "number",
        input: "",
        index: 0,
      }),
    ).toBe("zero point zero");
  });

  it("should convert { integer: '1', decimal: '2', negativeInt: false } to 'one point one two'", () => {
    expect(
      convertNumberToSpokenWord({
        integer: "1",
        decimal: "2",
        negativeInt: false,
        matchType: "number",
        input: "",
        index: 0,
      }),
    ).toBe("one point two");
  });

  it("should convert { integer: '1', decimal: '234', negativeInt: false } to 'one point two three four'", () => {
    expect(
      convertNumberToSpokenWord({
        integer: "1",
        decimal: "234",
        negativeInt: false,
        matchType: "number",
        input: "",
        index: 0,
      }),
    ).toBe("one point two three four");
  });

  it("should convert { integer: '1', decimal: undefined, negativeInt: false } to 'one '", () => {
    expect(
      convertNumberToSpokenWord({
        integer: "1",
        decimal: undefined,
        negativeInt: false,
        matchType: "number",
        input: "",
        index: 0,
      }),
    ).toBe("one");
  });

  it("should convert { integer: '123', decimal: '4', negativeInt: true } to 'negative one hundred twenty three point four '", () => {
    expect(
      convertNumberToSpokenWord({
        integer: "123",
        decimal: "4",
        negativeInt: true,
        matchType: "number",
        input: "",
        index: 0,
      }),
    ).toBe("negative one hundred twenty three point four");
  });
});

// ######## CURRENCY TO SPOKEN WORD ########
describe("convertCurrencyToSpokenWord", () => {
  it("should return spoken words for Currency codes", () => {
    // console.log("it should return spoken words for Currency codes");
    const tempres: baseCurrency = extractAllMatches("I have -123.45 USD")[0] as baseCurrency;
    expect(convertCurrencyToSpokenWord(tempres)).toBe("negative one hundred twenty three dollars and forty five cents");

    expect(
      convertCurrencyToSpokenWord({
        integer: "123",
        decimal: "01",
        negativeInt: false,
        currency: "USD",
        matchType: "codeCurrency",
        input: "-123.45 USD",
        index: 0,
      }),
    ).toBe("one hundred twenty three dollars and one cent");

    expect(
      convertCurrencyToSpokenWord({
        integer: "123",
        decimal: "45",
        negativeInt: false,
        currency: "EUR",
        matchType: "codeCurrency",
        input: "-123.45 EUR",
        index: 0,
      }),
    ).toBe("one hundred twenty three euros and forty five cents");
  });

  it("should return spoken words for Currency symbols", () => {
    expect(
      convertCurrencyToSpokenWord({
        integer: "123",
        decimal: "45",
        negativeInt: true,
        currency: "$",
        matchType: "symbolCurrency",
        input: "-$123.45",
        index: 0,
      }),
    ).toBe("negative one hundred twenty three dollars and forty five cents");

    expect(
      convertCurrencyToSpokenWord({
        integer: "123",
        decimal: "45",
        negativeInt: false,
        currency: "€",
        matchType: "symbolCurrency",
        input: "€123.45",
        index: 0,
      }),
    ).toBe("one hundred twenty three euros and forty five cents");
  });
});

// ######## SCIENTIFIC EXPRESSION TO SPOKEN WORD ########
describe("convertScientificExpressionToSpokenWord", () => {
  it("should convert '1e3' to 'one times ten to the power of three'", () => {
    expect(
      convertScientificExpressionToSpokenWord({
        integer: "1",
        decimal: undefined,
        exponent: "3",
        negativeInt: false,
        matchType: "scientific",
        input: "1e3",
        index: 0,
        length: 3,
      } as baseScientific),
    ).toBe("one times ten to the power of three");
  });

  it("should convert '1.23e3' to 'one point twenty three times ten to the power of three'", () => {
    expect(
      convertScientificExpressionToSpokenWord({
        integer: "1",
        decimal: "23",
        exponent: "3",
        negativeInt: false,
        matchType: "scientific",
        input: "1.23e3",
        index: 0,
        length: 6,
      } as baseScientific),
    ).toBe("one point twenty three times ten to the power of three");
  });

  it("should convert '1e-3' to 'one times ten to the power of negative three'", () => {
    expect(
      convertScientificExpressionToSpokenWord({
        integer: "1",
        decimal: undefined,
        exponent: "-3",
        negativeInt: false, // negativeInt applies to the base number, not exponen
        matchType: "scientific",
        input: "1e-3",
        index: 0,
        length: 4,
      } as baseScientific),
    ).toBe("one times ten to the power of negative three");
  });

  it("should convert '-1e3' to 'negative one times ten to the power of three'", () => {
    expect(
      convertScientificExpressionToSpokenWord({
        integer: "1",
        decimal: undefined,
        exponent: "3",
        negativeInt: true,
        matchType: "scientific",
        input: "-1e3",
        index: 0,
        length: 4,
      } as baseScientific),
    ).toBe("negative one times ten to the power of three");
  });

  it("should convert '-1.23e-4' to 'negative one point twenty three times ten to the power of negative four'", () => {
    expect(
      convertScientificExpressionToSpokenWord({
        integer: "1",
        decimal: "23",
        exponent: "-4",
        negativeInt: true,
        matchType: "scientific",
        input: "-1.23e-4",
        index: 0,
        length: 7,
      } as baseScientific),
    ).toBe("negative one point twenty three times ten to the power of negative four");
  });
});

// ######## NUMERIC UNIT TO SPOKEN WORD ########
describe("convertNumericUnitToSpokenWord", () => {
  it("should convert '123.456 kg' to 'one hundred twenty three point four five six kilograms'", () => {
    expect(
      convertNumericUnitToSpokenWord({
        integer: "123",
        decimal: "456",
        unit: "kg",
        negativeInt: false,
        exponent: undefined,
        unitExponent: undefined,
        matchType: "unit",
        input: "123.456 kg",
        index: 0,
        length: 9,
      } as baseNumberUnit),
    ).toBe("one hundred twenty three point four five six kilograms");
  });
  it("should convert '123.456 kg^2' to 'one hundred twenty three point four five six kilograms squared'", () => {
    expect(
      convertNumericUnitToSpokenWord({
        integer: "123",
        decimal: "456",
        unit: "kg",
        negativeInt: false,
        exponent: undefined,
        unitExponent: "2",
        matchType: "unit",
        input: "123.456 kg^2",
        index: 0,
        length: 11,
      } as baseNumberUnit),
    ).toBe("one hundred twenty three point four five six kilograms squared");
  });

  it("should convert '15 m/s²' to 'fifteen meters per second squared'", () => {
    let inputSuperScript = extractAllMatches("15 m/s²")[0] as baseNumberUnit;
    // console.log({ input: inputSuperScript });
    expect(convertNumericUnitToSpokenWord(inputSuperScript)).toBe("fifteen meters per second squared");

    let inputCaret = extractAllMatches("15 m/s^2")[0] as baseNumberUnit;
    // console.log({ input: inputCaret });
    expect(convertNumericUnitToSpokenWord(inputCaret)).toBe("fifteen meters per second squared");
  });

  it("should convert '15 m/s³' to 'fifteen meters per second cubed'", () => {
    let inputSuperScript = extractAllMatches("15 m/s³")[0] as baseNumberUnit;
    // console.log({ input: inputSuperScript });
    expect(convertNumericUnitToSpokenWord(inputSuperScript)).toBe("fifteen meters per second cubed");
    let inputCaret = extractAllMatches("15 m/s^3")[0] as baseNumberUnit;
    // console.log({ input: inputCaret });
    expect(convertNumericUnitToSpokenWord(inputCaret)).toBe("fifteen meters per second cubed");
  });
});

// ######## UNIT ONLY TO SPOKEN WORD ########
describe("convertUnitOnlyToSpokenWord", () => {
  it("should convert 'kg' to 'kilogram'", () => {
    let extracted = extractAllMatches("I have a kg");
    // console.log({ extracted });

    expect(convertUnitOnlyToSpokenWord(extracted[0] as baseUnitOnly)).toBe("kilogram");
  });
  it("should convert 'm/s²' to 'meter per second squared'", () => {
    let extracted = extractAllMatches("m/s²");
    // console.log({ extracted });
    expect(convertUnitOnlyToSpokenWord(extracted[0] as baseUnitOnly)).toBe("meter per second squared");
  });
  it("should convert 'm/s^2' to 'meter per second squared'", () => {
    let extracted = extractAllMatches("m/s^2");
    expect(convertUnitOnlyToSpokenWord(extracted[0] as baseUnitOnly)).toBe("meter per second squared");
  });
  it("should convert 'm/s³' to 'meter per second cubed'", () => {
    let extracted = extractAllMatches("m/s³");
    expect(convertUnitOnlyToSpokenWord(extracted[0] as baseUnitOnly)).toBe("meter per second cubed");
  });
  it("should convert 'm/s^3' to 'meter per second cubed'", () => {
    let extracted = extractAllMatches("m/s^3");
    expect(convertUnitOnlyToSpokenWord(extracted[0] as baseUnitOnly)).toBe("meter per second cubed");
  });
  it("should convert 'm/s' to 'meter per second'", () => {
    let extracted = extractAllMatches("m/s");
    expect(convertUnitOnlyToSpokenWord(extracted[0] as baseUnitOnly)).toBe("meter per second");
  });
  it("should convert 'm/s^4' to 'meter per second to the power of four'", () => {
    let extracted = extractAllMatches("m/s^4");

    expect(convertUnitOnlyToSpokenWord(extracted[0] as baseUnitOnly)).toBe("meter per second to the power of four");
  });
  it("should convert 'm/s^5' to 'meter per second to the power of five'", () => {
    let extracted = extractAllMatches("m/s^5");
    expect(convertUnitOnlyToSpokenWord(extracted[0] as baseUnitOnly)).toBe("meter per second to the power of five");
  });
});

describe("convertOperatorToSpokenWord", () => {
  it("should convert ' + ' to 'plus'", () => {
    let extracted = extractAllMatches("+");
    expect(convertOperatorToSpokenWord(extracted[0] as baseOperator)).toBe("plus");
  });
  it("should convert ' - ' to 'minus'", () => {
    let extracted = extractAllMatches("-");
    expect(convertOperatorToSpokenWord(extracted[0] as baseOperator)).toBe("minus");
  });
  it("should convert ' * ' to 'times'", () => {
    let extracted = extractAllMatches("*");
    expect(convertOperatorToSpokenWord(extracted[0] as baseOperator)).toBe("times");
  });
  it("should convert ' / ' to 'divided by'", () => {
    let extracted = extractAllMatches("/");
    expect(convertOperatorToSpokenWord(extracted[0] as baseOperator)).toBe("divided by");
  });

  it("should convert ' ^ ' to 'to the power of'", () => {
    let extracted = extractAllMatches("^");
    expect(convertOperatorToSpokenWord(extracted[0] as baseOperator)).toBe("to the power of");
  });

  it("should convert ' × ' to 'times'", () => {
    let extracted = extractAllMatches("×");
    expect(convertOperatorToSpokenWord(extracted[0] as baseOperator)).toBe("times");
  });
  it("should convert ' · ' to 'times'", () => {
    let extracted = extractAllMatches("·");
    expect(convertOperatorToSpokenWord(extracted[0] as baseOperator)).toBe("times");
  });
  it("should convert ' ÷ ' to 'divided by'", () => {
    let extracted = extractAllMatches("÷");
    expect(convertOperatorToSpokenWord(extracted[0] as baseOperator)).toBe("divided by");
  });
  it("should convert ' : ' to 'divided by'", () => {
    let extracted = extractAllMatches(" : ");
    // console.log({ extracted });
    expect(convertOperatorToSpokenWord(extracted[0] as baseOperator)).toBe("divided by");
  });
});
