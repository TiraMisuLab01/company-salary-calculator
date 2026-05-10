export type MoneyString = string;

export interface Profile {
  id: string;
  name: string;
  city: string;
  createdAt: string;
  updatedAt: string;
  defaultScenarioId?: string;
}

export interface SocialFundItem {
  personal: MoneyString;
  employer: MoneyString;
}

export interface SocialFund {
  pension: SocialFundItem;
  medical: SocialFundItem;
  unemployment: SocialFundItem;
  injury: SocialFundItem;
  maternity: SocialFundItem;
  housingFund: SocialFundItem;
}

export type QuarterlyRating = "" | "A" | "B" | "C" | "D";

export interface PayrollRecord {
  id: string;
  month: string;
  baseSalary: MoneyString;
  performanceSalary: MoneyString;
  performancePrepayRate: MoneyString;
  salesBonus: MoneyString;
  q1Rating: QuarterlyRating;
  q2Rating: QuarterlyRating;
  q3Rating: QuarterlyRating;
  q4Rating: QuarterlyRating;
  quarterlyBase: MoneyString;
  departmentBonus: MoneyString;
  patentBonus: MoneyString;
  specialDeductions: MoneyString;
  socialPersonalRate: MoneyString;
  socialEmployerRate: MoneyString;
  housingFundPersonalRate: MoneyString;
  housingFundEmployerRate: MoneyString;
  socialFundBase: MoneyString;
  housingFundBase: MoneyString;
  yearEndBonusMonths: MoneyString;
  mealSubsidy: MoneyString;
  housingSubsidy: MoneyString;
  grossIncome: MoneyString;
  tax: MoneyString;
  netIncome: MoneyString;
  personalSocialFundTotal: MoneyString;
  employerContribution: MoneyString;
  deferredPerformance: MoneyString;
  quarterlyIncentive: MoneyString;
  taxableIncome: MoneyString;
  actualNetIncome: MoneyString;
  createdAt: string;
  updatedAt: string;
}
