import { describe, expect, it } from "vitest";
import { calculateBonusTax } from "./calculate-bonus-tax";
import { calculateSalarySummary } from "./calculate-salary-summary";

describe("calculateSalarySummary", () => {
  it("calculates gross pay, personal contributions, tax, and net pay", () => {
    const summary = calculateSalarySummary({
      baseSalary: "11308",
      performanceSalary: "4200",
      bonus: "0",
      subsidy: "0",
      stockIncome: "0",
      specialDeductions: "1500",
      socialFundBase: "15508",
      housingFundRate: "0.10",
      socialRates: {
        pension: "0.08",
        medical: "0.02",
        unemployment: "0.005",
      },
    });

    expect(summary.grossIncome).toBe("15508.00");
    expect(summary.personalSocialFundTotal).toBe("3179.14");
    expect(summary.taxableIncome).toBe("5828.86");
    expect(summary.incomeTax).toBe("372.89");
    expect(summary.netIncome).toBe("11955.97");
  });

  it("calculates annual bonus tax independently", () => {
    expect(calculateBonusTax("22616")).toBe("678.48");
  });
});
