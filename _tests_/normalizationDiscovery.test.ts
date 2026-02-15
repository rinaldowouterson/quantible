import { convertQuantities } from "../src/index";

describe("Normalization Discovery", () => {
  it("should handle email addresses", () => {
    const input = "Contact me at test@example.com";
    const result = convertQuantities.autoReplaceAllMatches(input);
    expect(result).toBe("Contact me at test at example dot com");
  });

  it("should handle websites", () => {
    const input = "Visit www.hello.com";
    const result = convertQuantities.autoReplaceAllMatches(input);
    expect(result).toBe("Visit double you double you double you dot hello dot com");
  });

  it("should handle basic math expressions", () => {
    const input = "5 - 10 and -5 + 10";
    const result = convertQuantities.autoReplaceAllMatches(input);
    expect(result).toBe("five minus ten and negative five plus ten");
  });
});
