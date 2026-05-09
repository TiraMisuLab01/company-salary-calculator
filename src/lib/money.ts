import Decimal from "decimal.js";

export function money(value: Decimal.Value) {
  return new Decimal(value);
}

export function moneyString(value: Decimal.Value) {
  return money(value).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toFixed(2);
}
