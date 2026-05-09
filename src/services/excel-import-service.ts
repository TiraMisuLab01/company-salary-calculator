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
      errors.push({ rowIndex, field: "baseSalary", message: "基本工资必须为数字" });
      return;
    }

    seenMonths.add(month);
    validRows.push(row);
  });

  return { validRows, errors };
}
