import "fake-indexeddb/auto";
import { beforeEach, describe, expect, it } from "vitest";
import { appDb } from "../db/app-db";
import { listPayrollRecords, savePayrollRecord, deletePayrollRecord } from "./payroll-record-service";

describe("payroll-record-service", () => {
  beforeEach(async () => {
    await appDb.delete();
    await appDb.open();
  });

  const baseInput = {
    month: "2026-05",
    baseSalary: "11308",
    performanceSalary: "4200",
    performancePrepayRate: "80",
    salesBonus: "0",
    q1Rating: "" as const,
    q2Rating: "" as const,
    q3Rating: "" as const,
    q4Rating: "" as const,
    quarterlyBase: "12600",
    departmentBonus: "0",
    patentBonus: "0",
    specialDeductions: "1500",
    socialPersonalRate: "10.3",
    socialEmployerRate: "25.8",
    housingFundPersonalRate: "10",
    housingFundEmployerRate: "10",
    socialFundBase: "",
    housingFundBase: "",
    yearEndBonusMonths: "2",
    mealSubsidy: "300",
    housingSubsidy: "0",
    actualNetIncome: "",
  };

  it("saves and reads back lantu payroll records ordered by month descending", async () => {
    await savePayrollRecord(baseInput);
    await savePayrollRecord({
      ...baseInput,
      month: "2026-06",
      salesBonus: "2000",
      q2Rating: "B",
    });

    const records = await listPayrollRecords();

    expect(records).toHaveLength(2);
    expect(records[0].month).toBe("2026-06");
    expect(records[1].month).toBe("2026-05");
    expect(records[0].q2Rating).toBe("B");
  });

  it("deletes a payroll record", async () => {
    const record = await savePayrollRecord(baseInput);
    await deletePayrollRecord(record.id);
    const records = await listPayrollRecords();
    expect(records).toHaveLength(0);
  });

  it("saves and reads back actualNetIncome", async () => {
    const record = await savePayrollRecord({ ...baseInput, actualNetIncome: "11955.97" });
    expect(record.actualNetIncome).toBe("11955.97");
  });
});
