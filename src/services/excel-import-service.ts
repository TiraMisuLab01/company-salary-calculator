import * as XLSX from "xlsx";

export interface ImportError {
  rowIndex: number;
  field: string;
  message: string;
}

export function validateImportRows(rows: Array<Record<string, unknown>>) {
  const errors: ImportError[] = [];
  const validRows: Array<Record<string, unknown>> = [];
  const seenMonths = new Set<string>();

  rows.forEach((row, rowIndex) => {
    const month = String(row.month ?? "").trim();

    if (!month) {
      errors.push({ rowIndex, field: "month", message: "月份不能为空" });
      return;
    }

    if (seenMonths.has(month)) {
      errors.push({ rowIndex, field: "month", message: "月份重复" });
      return;
    }

    if (Number.isNaN(Number(row.baseSalary))) {
      errors.push({ rowIndex, field: "baseSalary", message: "固定薪资必须为数字" });
      return;
    }

    seenMonths.add(month);
    validRows.push(row);
  });

  return { validRows, errors };
}

export function parseWorkbookRows(buffer: ArrayBuffer) {
  const workbook = XLSX.read(buffer, { type: "array" });
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json<Record<string, unknown>>(firstSheet);
}
