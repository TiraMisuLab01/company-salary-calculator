import * as XLSX from "xlsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { parseWorkbookRows, validateImportRows } from "../../services/excel-import-service";
import { usePayrollData } from "../data/PayrollDataProvider";

const TEMPLATE_HEADERS = ["month", "baseSalary", "performanceSalary", "performancePrepayRate", "salesBonus", "q1Rating", "q2Rating", "q3Rating", "q4Rating", "quarterlyBase", "departmentBonus", "patentBonus", "specialDeductions", "socialPersonalRate", "socialEmployerRate", "housingFundPersonalRate", "housingFundEmployerRate", "socialFundBase", "housingFundBase", "yearEndBonusMonths", "mealSubsidy", "housingSubsidy", "actualNetIncome"];
const SECTION = "rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4 sm:p-5";
const BTN = "rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--color-accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-primary)]";

export function ImportPage() {
  const navigate = useNavigate();
  const { addPayrollRecord } = usePayrollData();
  const [previewRows, setPreviewRows] = useState<Array<Record<string, unknown>>>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [importCount, setImportCount] = useState(0);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const rows = parseWorkbookRows(await file.arrayBuffer());
    const result = validateImportRows(rows);
    setPreviewRows(result.validRows);
    setErrorMessages(result.errors.map((error) => `第 ${error.rowIndex + 1} 行 ${error.field}: ${error.message}`));
    setImportCount(0);
  };

  const handleImport = async () => {
    for (const row of previewRows) {
      await addPayrollRecord({
        month: String(row.month ?? ""),
        baseSalary: String(row.baseSalary ?? "0"),
        performanceSalary: String(row.performanceSalary ?? "0"),
        performancePrepayRate: String(row.performancePrepayRate ?? "80"),
        salesBonus: String(row.salesBonus ?? "0"),
        q1Rating: String(row.q1Rating ?? "") as any,
        q2Rating: String(row.q2Rating ?? "") as any,
        q3Rating: String(row.q3Rating ?? "") as any,
        q4Rating: String(row.q4Rating ?? "") as any,
        quarterlyBase: String(row.quarterlyBase ?? "0"),
        departmentBonus: String(row.departmentBonus ?? "0"),
        patentBonus: String(row.patentBonus ?? "0"),
        specialDeductions: String(row.specialDeductions ?? "0"),
        socialPersonalRate: String(row.socialPersonalRate ?? "0"),
        socialEmployerRate: String(row.socialEmployerRate ?? "0"),
        housingFundPersonalRate: String(row.housingFundPersonalRate ?? "0"),
        housingFundEmployerRate: String(row.housingFundEmployerRate ?? "0"),
        socialFundBase: String(row.socialFundBase ?? ""),
        housingFundBase: String(row.housingFundBase ?? ""),
        yearEndBonusMonths: String(row.yearEndBonusMonths ?? "0"),
        mealSubsidy: String(row.mealSubsidy ?? "0"),
        housingSubsidy: String(row.housingSubsidy ?? "0"),
        actualNetIncome: String(row.actualNetIncome ?? ""),
      });
    }
    setImportCount(previewRows.length);
    navigate("/dashboard");
  };

  const handleDownloadTemplate = () => {
    const sheet = XLSX.utils.aoa_to_sheet([TEMPLATE_HEADERS]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "salary");
    XLSX.writeFile(wb, "salary-import-template.xlsx");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5 sm:space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">Excel 导入</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">上传特定薪酬结构的工资表，校验后批量导入本地加密存储。</p>
      </div>
      <div className={SECTION}>
        <h2 className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">使用指南</h2>
        <ol className="list-inside list-decimal space-y-1 text-xs text-[var(--color-text-muted)]">
          <li>下载模板文件，模板包含全部薪酬字段。</li>
          <li>选择填好的文件上传，系统自动校验月份和必填项。</li>
          <li>确认预览无误后点击导入，数据加密存入本地。</li>
        </ol>
        <button type="button" className="mt-4 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-4 py-2 text-xs text-[var(--color-text-secondary)] transition-colors duration-150 hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)]" onClick={handleDownloadTemplate}>下载导入模板</button>
      </div>
      <div className={SECTION}>
        <label className="block" htmlFor="import-file">
          <span className="mb-2 block text-xs font-medium text-[var(--color-text-secondary)]">选择工资表文件</span>
          <input id="import-file" name="importFile" type="file" accept=".xlsx,.xls,.csv" className="block w-full rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm text-[var(--color-text-secondary)] file:mr-3 file:rounded-md file:border-0 file:bg-[var(--color-accent-subtle)] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-[var(--color-accent)] transition-colors" onChange={(e) => { void handleFileChange(e); }} />
        </label>
        <div className="mt-4 flex gap-4 text-xs">
          <span className="text-[var(--color-text-muted)]">可导入：<span className="font-medium text-[var(--color-text-primary)]">{previewRows.length}</span></span>
          <span className="text-[var(--color-text-muted)]">异常：<span className={`font-medium ${errorMessages.length > 0 ? "text-[var(--color-rose)]" : "text-[var(--color-text-primary)]"}`}>{errorMessages.length}</span></span>
        </div>
        {errorMessages.length > 0 ? (
          <ul className="mt-3 space-y-1 rounded-lg border border-[var(--color-rose)]/20 bg-[var(--color-rose)]/5 p-3 text-xs text-[var(--color-rose)]">{errorMessages.map((m) => <li key={m}>{m}</li>)}</ul>
        ) : null}
        {previewRows.length > 0 ? <button type="button" className={`mt-4 ${BTN}`} onClick={() => { void handleImport(); }}>导入 {previewRows.length} 条记录</button> : null}
        {importCount > 0 ? <p className="mt-3 text-xs text-[var(--color-emerald)]">已导入 {importCount} 条记录。</p> : null}
      </div>
    </div>
  );
}
