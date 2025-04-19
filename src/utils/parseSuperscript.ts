/**
 * Converts a string of superscript digits to regular integer string.
 * @param {string} superscriptString - String containing superscript digits.
 * @returns {string} - String of regular digits.
 */
export function toRegularInteger(superscriptString: string): string {
  const superscriptMap: { [key: string]: string } = {
    "⁰": "0",
    "¹": "1",
    "²": "2",
    "³": "3",
    "⁴": "4",
    "⁵": "5",
    "⁶": "6",
    "⁷": "7",
    "⁸": "8",
    "⁹": "9",
  };

  let standardDigitString = "";
  for (let char of superscriptString) {
    if (superscriptMap[char]) {
      standardDigitString += superscriptMap[char];
    } else {
      standardDigitString += char;
    }
  }

  return standardDigitString;
}
