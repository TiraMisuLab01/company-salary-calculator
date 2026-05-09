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

export interface PayrollRecord {
  id: string;
  month: string;
  baseSalary: MoneyString;
  performanceSalary: MoneyString;
  bonus: MoneyString;
  subsidy: MoneyString;
  stockIncome: MoneyString;
  specialDeductions: MoneyString;
  grossIncome: MoneyString;
  tax: MoneyString;
  netIncome: MoneyString;
  personalSocialFundTotal: MoneyString;
  taxableIncome: MoneyString;
  createdAt: string;
  updatedAt: string;
}
