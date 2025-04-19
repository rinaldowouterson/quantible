# Quantible - Convert Numbers and Quantities to Spoken Words

[![NPM Version](https://img.shields.io/npm/v/quantible)](https://www.npmjs.com/package/quantible)
[![bundlephobia](https://badgen.net/bundlephobia/minzip/quantible)](https://bundlephobia.com/package/quantible)

**Quantible** is a versatile JavaScript library designed to convert numbers, quantities, and simple mathematical expressions into easily understandable spoken words. Whether you're building applications that require text-to-speech functionality, accessibility enhancements, or simply need to present numerical data in a more human-readable format, Quantible provides a robust and flexible solution.

## Key Features

*   **Comprehensive Quantity Conversion:** Handles a wide range of numerical formats, including integers, decimals, negative numbers, currencies, units (e.g., meters, seconds), scientific expressions, and simple mathematical operations.
*   **Flexible Usage:**  Supports multiple consumption methods including:
    *   **CDN:**  Directly include in HTML for quick and easy use in web browsers.
    *   **CommonJS (CJS):**  Integrate into Node.js projects and older JavaScript module systems.
    *   **ECMAScript Modules (ESM):**  Utilize modern JavaScript module imports for optimized bundling and performance.
*   **String Auto-Replacement:**  Effortlessly convert all or the first detected quantities within a string, simplifying text manipulation and dynamic content generation.
*   **Extensive Examples:**  Clear and concise examples to quickly grasp the library's capabilities and integration methods.
*   **Well-Documented and Tested:**  Thorough documentation and comprehensive test suite ensure reliability and ease of maintenance.
*   **Lightweight and Performant:** Optimized for minimal bundle size and efficient execution, ensuring a smooth user experience.

## Examples

Quantible excels at transforming various numerical expressions into their spoken word equivalents:

- `5 - 10`  ->  "five minus ten"
- `-5 + 10` ->  "negative five plus ten"
- `10m/s`  ->  "ten meters per second"
- `15m/s²` ->  "fifteen meters per second squared"
- `15²` or `15^2` ->  "fifteen to the power of two"
- `2^2m^2` ->  "two to the power of two meters squared"
- `2^2m²` ->  "two to the power of two square meters"
- `5E-10` ->  "five times ten to the power of negative ten"
- `-5E10` ->  "negative five times ten to the power of ten"
- `5E10`  ->  "five times ten to the power of ten"
- `5 USD` ->  "five dollars"
- `$5`   ->  "five dollars"
- `5.25 USD` ->  "five dollars and twenty-five cents"
- `$5.25`  ->  "five dollars and twenty-five cents"

The `autoReplaceAllMatches` function demonstrates the power of Quantible by converting all quantities within a text:

**Input Sentence:**

> "We made $500 more this year than last years projections of 25%"

**Output Sentence (after `autoReplaceAllMatches`):**

> "We made five hundred dollars more this year than last years projections of twenty-five percent"

## Installation

### npm

For projects using npm or yarn:

```bash
npm install quantible
```

## How to Consume Quantible

Quantible is designed to be versatile and easily integrated into various JavaScript environments. You can consume it in three primary ways: directly in HTML via CDN, using CommonJS `require`, or with modern ECMAScript `import` statements.

### 1.  Directly in HTML via CDN

For the quickest integration into web pages, you can use a Content Delivery Network (CDN) to include Quantible directly in your HTML file. This method is ideal for simple projects or when you want to avoid complex build processes.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Quantible Example</title>
</head>
<body>
    <div id="output"></div>
    <script src="https://unpkg.com/quantible/dist/index.umd.js"></script>
    <script>
        const inputString = "The price is $12.50 USD.";
        const spokenText = quantible.convertQuantities.autoReplaceAllMatches(inputString);
        document.getElementById('output').textContent = spokenText;
    </script>
</body>
</html>
```

In this example:

*   We include Quantible by referencing the UMD build from unpkg CDN:  `https://unpkg.com/quantible/dist/index.umd.js`.
*   The library is then globally accessible as `quantible`.
*   We use `quantible.convertQuantities.autoReplaceAllMatches` to process a string and display the spoken word output in the `div#output` element.

### 2.  CommonJS (CJS) - `require`

For Node.js environments or projects using CommonJS modules, you can import Quantible using `require`.

```javascript
const { convertQuantities, extractQuantities } = require('quantible');

const input = "25 EUR";
const extractedData = extractQuantities.firstMatch(input);
const spokenWord = convertQuantities.translateMatch(extractedData);

console.log(spokenWord); // Output: twenty-five euros
```

### 3.  ECMAScript Modules (ESM) - `import`

For modern JavaScript projects and applications using ECMAScript modules, you can import Quantible using the `import` statement. This is the recommended approach for most modern JavaScript development.

```javascript
import { convertQuantities, extractQuantities } from 'quantible';

const input = "100 km/h";
const extractedData = extractQuantities.firstMatch(input);
const spokenWord = convertQuantities.translateMatch(extractedData);

console.log(spokenWord); // Output: one hundred kilometers per hour
```

Choose the consumption method that best fits your project's environment and build process. Quantible is designed to be flexible and adaptable to your needs.

## Example Usage

The following examples demonstrate key functions of Quantible.

### Extracting and Translating a Quantity

```javascript
import { convertQuantities, extractQuantities } from 'quantible';

const input = "123.45 USD";
const extractedData = extractQuantities.firstMatch(input);
const spokenWord = convertQuantities.translateMatch(extractedData);

console.log(spokenWord);
// Output: one hundred twenty-three dollars and forty-five cents
```

This example shows how to extract and translate the first quantity found in a string.

### Auto-replacing all quantities in a string

```javascript
import { convertQuantities } from 'quantible';

const inputReplaceAllMatches = "I have 5 USD and 10 EUR.";
const replacedString = convertQuantities.autoReplaceAllMatches(inputReplaceAllMatches);
console.log(replacedString); // Output: I have five dollars and ten euros.
```

This example demonstrates automatically replacing all quantities within a string.

## Contributing

We welcome contributions to Quantible! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute.

## License

MIT License

Copyright (c) 2025 rinaldowouterson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
