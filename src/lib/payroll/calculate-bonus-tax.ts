import { money, moneyString } from "../money";
import { MONTHLY_TAX_BRACKETS } from "../tax-rules";

export function calculateBonusTax(annualBonus: string) {
  const monthlyEquivalent = money(annualBonus).div(12);
  const bracket = MONTHLY_TAX_BRACKETS.find((item) => monthlyEquivalent.lte(item.upTo))!;
  const tax = money(annualBonus).mul(bracket.rate).minus(bracket.quickDeduction);
  const safeTax = tax.greaterThan(0) ? tax : money(0);

  return moneyString(safeTax);
}
