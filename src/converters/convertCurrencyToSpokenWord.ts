import { currencies } from "../config/default";
import { Currency } from "../interfaces/configurations/default";
import { positiveInteger } from "../utils/stringBuilding/positiveInteger";
import { twoDigit } from "../utils/stringBuilding/twoDigits";
import { negative } from "../utils/stringBuilding/negative";
import { baseCurrency } from "../interfaces/definitions";

/**
 * Converts a currency object into its spoken word representation.
 * @param {baseCurrency} amount - The currency object to convert.
 * @returns {string} The spoken word representation of the currency.
 */
export function convertCurrencyToSpokenWord(amount: baseCurrency): string {
  let sentence = "";
  const { integer, decimal, negativeInt, currency } = amount;

  let currencyConfig: Currency = currencies[currency];

  let parsedInteger = parseInt(integer);

  sentence += negative(negativeInt);
  sentence += positiveInteger(parsedInteger) + " ";
  sentence += parsedInteger < 2 ? currencyConfig.singular : currencyConfig.plural + " ";
  if (decimal !== undefined && currencyConfig.fraction !== null && currencyConfig.fraction !== undefined) {
    sentence += "and ";
    sentence += twoDigit(decimal) + " ";
    sentence += parseInt(decimal) < 2 ? currencyConfig.fraction.singular : currencyConfig.fraction.plural;
  }
  return sentence.trim();
}
