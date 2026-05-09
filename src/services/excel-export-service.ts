import * as XLSX from "xlsx";

export function buildWorkbook(rows: Array<Record<string, unknown>>) {
  const sheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, "salary");
  return workbook;
}
