import { regexMatches } from "../src/utils/extraction/regexPatterns";

describe("regexMatches", () => {
  it("should match currency with symbol", () => {
    expect("$100".match(regexMatches)?.[0]).toBe("$100");
    expect("-$100".match(regexMatches)?.[0]).toBe("-$100");
    expect("$1,000".match(regexMatches)?.[0]).toBe("$1,000");
    expect("$100.00".match(regexMatches)?.[0]).toBe("$100.00");
  });

  it("should match currency with code", () => {
    expect("100 USD".match(regexMatches)?.[0]).toBe("100 USD");
    expect("-100 USD".match(regexMatches)?.[0]).toBe("-100 USD");
    expect("1,000 USD".match(regexMatches)?.[0]).toBe("1,000 USD");
    expect("100.00 USD".match(regexMatches)?.[0]).toBe("100.00 USD");
  });

  it("should match scientific notation", () => {
    expect("5e3".match(regexMatches)?.[0]).toBe("5e3");
    expect("-5e3".match(regexMatches)?.[0]).toBe("-5e3");
    expect("5.5e3".match(regexMatches)?.[0]).toBe("5.5e3");
    expect("5e+3".match(regexMatches)?.[0]).toBe("5e+3");
    expect("5e-3".match(regexMatches)?.[0]).toBe("5e-3");
    expect("-5.5e-3".match(regexMatches)?.[0]).toBe("-5.5e-3");
  });

  it("should match units", () => {
    expect("5m^2".match(regexMatches)?.[0]).toBe("5m^2");
    expect("-5m^2".match(regexMatches)?.[0]).toBe("-5m^2");
    expect("5.5m^2".match(regexMatches)?.[0]).toBe("5.5m^2");
    expect("5m^-2".match(regexMatches)?.[0]).toBe("5m^-2");
    expect("5m⁻²".match(regexMatches)?.[0]).toBe("5m⁻²");
    expect("5^2m^2".match(regexMatches)?.[0]).toBe("5^2m^2");
    expect("5²m²".match(regexMatches)?.[0]).toBe("5²m²");
  });

  it("should match numbers", () => {
    expect("1000".match(regexMatches)?.[0]).toBe("1000");
    expect("-1000".match(regexMatches)?.[0]).toBe("-1000");
    expect("1,000".match(regexMatches)?.[0]).toBe("1,000");
    expect("1.23".match(regexMatches)?.[0]).toBe("1.23");
    expect("10^3".match(regexMatches)?.[0]).toBe("10^3");
    expect("10³".match(regexMatches)?.[0]).toBe("10³");
    expect("-10^3".match(regexMatches)?.[0]).toBe("-10^3");
  });

  it("should match mathematical operators", () => {
    expect("+".match(regexMatches)?.[0]).toBe("+");
    expect("-".match(regexMatches)?.[0]).toBe("-");
    expect("*".match(regexMatches)?.[0]).toBe("*");
    expect("/".match(regexMatches)?.[0]).toBe("/");
  });

  it("should not match invalid patterns", () => {
    expect("word123".match(regexMatches)?.[0]).toBeUndefined();
  });

  it("should match unit only", () => {
    expect("m".match(regexMatches)?.[0]).toBe("m");
    expect("m^2".match(regexMatches)?.[0]).toBe("m^2");
    expect("m⁻²".match(regexMatches)?.[0]).toBe("m⁻²");
  });
});
