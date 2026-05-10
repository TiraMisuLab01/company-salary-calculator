import { money, moneyString } from "../money";
import { MONTHLY_TAX_THRESHOLD } from "../tax-rules";
import { calculateIncomeTax } from "./calculate-income-tax";
import type { QuarterlyRating } from "../../types/salary";

const QUARTERLY_RATE_MAP: Record<Exclude<QuarterlyRating, "">, number> = {
  A: 0.5,
  B: 0.2,
  C: 0,
  D: -0.2,
};

const QUARTER_SETTLE_MONTHS = new Set([3, 6, 9, 12]);

function getCurrentQuarterRating(month: string, ratings: { q1: QuarterlyRating; q2: QuarterlyRating; q3: QuarterlyRating; q4: QuarterlyRating }): QuarterlyRating {
  const m = Number(month.slice(-2)) || Number(month.replace(/[^0-9]/g, "").slice(-2)) || 1;
  if (m >= 1 && m <= 3) return ratings.q1;
  if (m >= 4 && m <= 6) return ratings.q2;
  if (m >= 7 && m <= 9) return ratings.q3;
  return ratings.q4;
}

function isQuarterSettleMonth(month: string): boolean {
  const m = Number(month.slice(-2)) || Number(month.replace(/[^0-9]/g, "").slice(-2)) || 1;
  return QUARTER_SETTLE_MONTHS.has(m);
}

export function calculateLantuSalary(input: {
  month: string;
  baseSalary: string;
  performanceSalary: string;
  performancePrepayRate: string;
  salesBonus: string;
  q1Rating: QuarterlyRating;
  q2Rating: QuarterlyRating;
  q3Rating: QuarterlyRating;
  q4Rating: QuarterlyRating;
  quarterlyBase: string;
  departmentBonus: string;
  patentBonus: string;
  specialDeductions: string;
  socialPersonalRate: string;
  socialEmployerRate: string;
  housingFundPersonalRate: string;
  housingFundEmployerRate: string;
  socialFundBase: string;
  housingFundBase: string;
  mealSubsidy: string;
  housingSubsidy: string;
}) {
  const prepayRate = Number(input.performancePrepayRate || "80") / 100;
  const prepaidPerformance = money(input.performanceSalary).mul(prepayRate);
  const deferredPerformance = money(input.performanceSalary).minus(prepaidPerformance);

  const currentRating = getCurrentQuarterRating(input.month, {
    q1: input.q1Rating,
    q2: input.q2Rating,
    q3: input.q3Rating,
    q4: input.q4Rating,
  });

  let quarterlyIncentive = money(0);
  if (isQuarterSettleMonth(input.month) && currentRating && currentRating in QUARTERLY_RATE_MAP) {
    const rate = QUARTERLY_RATE_MAP[currentRating as Exclude<QuarterlyRating, "">];
    const base = money(input.quarterlyBase || "0");
    quarterlyIncentive = base.mul(1 + rate);
  }

  const grossIncome = money(input.baseSalary)
    .plus(prepaidPerformance)
    .plus(input.salesBonus)
    .plus(quarterlyIncentive)
    .plus(input.departmentBonus)
    .plus(input.patentBonus)
    .plus(input.mealSubsidy)
    .plus(input.housingSubsidy);

  const effectiveSocialBase = input.socialFundBase
    ? money(input.socialFundBase)
    : money(input.baseSalary).plus(input.performanceSalary).plus(input.salesBonus).plus(input.departmentBonus);

  const effectiveHousingBase = input.housingFundBase
    ? money(input.housingFundBase)
    : effectiveSocialBase;

  const spRate = Number(input.socialPersonalRate || "0") / 100;
  const seRate = Number(input.socialEmployerRate || "0") / 100;
  const hpRate = Number(input.housingFundPersonalRate || "0") / 100;
  const heRate = Number(input.housingFundEmployerRate || "0") / 100;

  const personalSocialFund = effectiveSocialBase.mul(spRate);
  const personalHousingFund = effectiveHousingBase.mul(hpRate);
  const personalTotalDeduction = personalSocialFund.plus(personalHousingFund);

  const employerSocialFund = effectiveSocialBase.mul(seRate);
  const employerHousingFund = effectiveHousingBase.mul(heRate);
  const employerTotalDeduction = employerSocialFund.plus(employerHousingFund);

  const taxableIncome = grossIncome
    .minus(personalTotalDeduction)
    .minus(MONTHLY_TAX_THRESHOLD)
    .minus(input.specialDeductions);
  const safeTaxable = taxableIncome.greaterThan(0) ? taxableIncome : money(0);
  const incomeTax = calculateIncomeTax(moneyString(safeTaxable));
  const netIncome = grossIncome.minus(personalTotalDeduction).minus(incomeTax);

  return {
    grossIncome: moneyString(grossIncome),
    personalSocialFundTotal: moneyString(personalTotalDeduction),
    employerContribution: moneyString(employerTotalDeduction),
    taxableIncome: moneyString(safeTaxable),
    incomeTax,
    netIncome: moneyString(netIncome),
    deferredPerformance: moneyString(deferredPerformance),
    quarterlyIncentive: moneyString(quarterlyIncentive),
  };
}
