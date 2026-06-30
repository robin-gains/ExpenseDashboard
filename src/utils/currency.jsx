import { RATES } from "../data/rates";

export function convertToUSD(
  amount,
  currency
) {
  const rate = RATES[currency];

  if (!rate) {
    console.warn(
      `Missing exchange rate for ${currency}`
    );
    return 0;
  }

  return amount / rate;
}