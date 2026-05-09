import "fake-indexeddb/auto";
import { beforeEach, describe, expect, it } from "vitest";
import { appDb } from "../db/app-db";
import { listPayrollRecords, savePayrollRecord } from "./payroll-record-service";

describe("payroll-record-service", () => {
  beforeEach(async () => {
    await appDb.delete();
    await appDb.open();
  });

  it("saves and reads back payroll records ordered by month descending", async () => {
    await savePayrollRecord({
      month: "2026-05",
      baseSalary: "11308",
      performanceSalary: "4200",
      bonus: "0",
      subsidy: "0",
      stockIncome: "0",
      specialDeductions: "1500",
    });
    await savePayrollRecord({
      month: "2026-06",
      baseSalary: "12000",
      performanceSalary: "4500",
      bonus: "1000",
      subsidy: "300",
      stockIncome: "0",
      specialDeductions: "1500",
    });

    const records = await listPayrollRecords();

    expect(records).toHaveLength(2);
    expect(records[0].month).toBe("2026-06");
    expect(records[0].grossIncome).toBe("17800.00");
    expect(records[1].month).toBe("2026-05");
  });
});
