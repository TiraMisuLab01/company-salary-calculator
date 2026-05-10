import type { PayrollRecord } from "../../types/salary";
import type { ScenarioSettings } from "../../services/scenario-service";
import { calculateLantuSalary } from "./calculate-lantu-salary";

export function buildScenarioPreviewRecord(input: {
  record: PayrollRecord;
  scenario: ScenarioSettings;
  hasPersistedScenario: boolean;
}) {
  const { record, scenario, hasPersistedScenario } = input;
  const salaryMultiplier = 1 + scenario.salaryIncreaseRate / 100;
  const effectiveSpecialDeductions = hasPersistedScenario ? scenario.specialDeductions : Number(record.specialDeductions);
  const baseSalary = (Number(record.baseSalary) * salaryMultiplier).toFixed(2);
  const performanceSalary = (Number(record.performanceSalary) * salaryMultiplier).toFixed(2);

  const summary = calculateLantuSalary({
    month: record.month,
    baseSalary,
    performanceSalary,
    performancePrepayRate: record.performancePrepayRate,
    salesBonus: record.salesBonus,
    q1Rating: record.q1Rating,
    q2Rating: record.q2Rating,
    q3Rating: record.q3Rating,
    q4Rating: record.q4Rating,
    quarterlyBase: record.quarterlyBase,
    departmentBonus: record.departmentBonus,
    patentBonus: record.patentBonus,
    specialDeductions: String(effectiveSpecialDeductions),
    socialPersonalRate: record.socialPersonalRate,
    socialEmployerRate: record.socialEmployerRate,
    housingFundPersonalRate: record.housingFundPersonalRate,
    housingFundEmployerRate: record.housingFundEmployerRate,
    socialFundBase: record.socialFundBase,
    housingFundBase: record.housingFundBase,
    mealSubsidy: record.mealSubsidy,
    housingSubsidy: record.housingSubsidy,
  });

  return {
    ...record,
    baseSalary,
    performanceSalary,
    grossIncome: summary.grossIncome,
    tax: summary.incomeTax,
    netIncome: summary.netIncome,
    personalSocialFundTotal: summary.personalSocialFundTotal,
    employerContribution: summary.employerContribution,
    deferredPerformance: summary.deferredPerformance,
    quarterlyIncentive: summary.quarterlyIncentive,
    taxableIncome: summary.taxableIncome,
    specialDeductions: String(effectiveSpecialDeductions),
  };
}
