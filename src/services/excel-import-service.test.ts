import * as XLSX from "xlsx";
import { describe, expect, it } from "vitest";
import { parseWorkbookRows, validateImportRows } from "./excel-import-service";

describe("validateImportRows", () => {
  it("reports missing month and duplicate month rows", () => {
    const result = validateImportRows([
      { month: "", baseSalary: 11308 },
      { month: "2026-05", baseSalary: 11308 },
      { month: "2026-05", baseSalary: 12000 },
    ]);

    expect(result.validRows).toHaveLength(1);
    expect(result.errors).toEqual([
      { rowIndex: 0, field: "month", message: "月份不能为空" },
      { rowIndex: 2, field: "month", message: "月份重复" },
    ]);
  });

  it("rejects rows with non-numeric base salary", () => {
    const result = validateImportRows([{ month: "2026-05", baseSalary: "abc" }]);

    expect(result.validRows).toHaveLength(0);
    expect(result.errors).toEqual([{ rowIndex: 0, field: "baseSalary", message: "固定薪资必须为数字" }]);
  });

  it("parses the first worksheet from an uploaded workbook", () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([
      { month: "2026-05", baseSalary: 11308, performanceSalary: 4200, specialDeductions: 1500 },
    ]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "salary");
    const fileBuffer = XLSX.write(workbook, { type: "array", bookType: "xlsx" });

    expect(parseWorkbookRows(fileBuffer)).toEqual([
      { month: "2026-05", baseSalary: 11308, performanceSalary: 4200, specialDeductions: 1500 },
    ]);
  });
});
