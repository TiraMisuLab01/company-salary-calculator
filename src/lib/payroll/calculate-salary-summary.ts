import { money, moneyString } from "../money";
import { MONTHLY_TAX_THRESHOLD } from "../tax-rules";
import { calculateIncomeTax } from "./calculate-income-tax";
import { calculateSocialFund } from "./calculate-social-fund";

export function calculateSalarySummary(input: {
  baseSalary: string;
  performanceSalary: string;
  bonus: string;
  subsidy: string;
  stockIncome: string;
  specialDeductions: string;
  socialFundBase: string;
  housingFundRate: string;
  socialRates: { pension: string; medical: string; unemployment: string };
}) {
  const grossIncome = money(input.baseSalary)
    .plus(input.performanceSalary)
    .plus(input.bonus)
    .plus(input.subsidy)
    .plus(input.stockIncome);

  const socialFund = calculateSocialFund(input);
  const taxableIncome = grossIncome
    .minus(socialFund.total)
    .minus(MONTHLY_TAX_THRESHOLD)
    .minus(input.specialDeductions);
  const safeTaxableIncome = taxableIncome.greaterThan(0) ? taxableIncome : money(0);
  const incomeTax = calculateIncomeTax(moneyString(safeTaxableIncome));
  const netIncome = grossIncome.minus(socialFund.total).minus(incomeTax);

  return {
    grossIncome: moneyString(grossIncome),
    personalSocialFundTotal: socialFund.total,
    taxableIncome: moneyString(safeTaxableIncome),
    incomeTax,
    netIncome: moneyString(netIncome),
  };
}
