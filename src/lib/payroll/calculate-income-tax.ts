import { money, moneyString } from "../money";
import { MONTHLY_TAX_BRACKETS } from "../tax-rules";

export function calculateIncomeTax(taxableIncome: string) {
  const taxable = money(taxableIncome);
  const bracket = MONTHLY_TAX_BRACKETS.find((item) => taxable.lte(item.upTo))!;
  const tax = taxable.mul(bracket.rate).minus(bracket.quickDeduction);
  const safeTax = tax.greaterThan(0) ? tax : money(0);

  return moneyString(safeTax);
}
