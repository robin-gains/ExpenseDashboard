import { RATES } from "../data/rates";

export function convertToUSD(amount, currency) {
  return amount / RATES[currency];
}