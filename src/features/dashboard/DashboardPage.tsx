import * as XLSX from "xlsx";
import { buildScenarioPreviewRecord } from "../../lib/payroll/build-scenario-preview";
import { buildWorkbook } from "../../services/excel-export-service";
import { exportNodeAsPdf } from "../../services/pdf-export-service";
import { usePayrollData } from "../data/PayrollDataProvider";
import { useScenario } from "../data/ScenarioProvider";
import { CompareSummary } from "./components/CompareSummary";
import { DetailTable } from "./components/DetailTable";
import { HistoryTrendChart } from "./components/HistoryTrendChart";
import { KpiCards } from "./components/KpiCards";
import { SalaryCompositionChart } from "./components/SalaryCompositionChart";
import { ScenarioPanel } from "./components/ScenarioPanel";
import { SocialFundBreakdown } from "./components/SocialFundBreakdown";

function createEmptyKpiValues() {
  return {
    grossIncome: "0.00",
    netIncome: "0.00",
    tax: "0.00",
    personalSocialFundTotal: "0.00",
    employerContribution: "0.00",
    annualPackage: "0.00",
    deferredPerformance: "0.00",
  };
}

const BTN_PRIMARY = "rounded-lg bg-[var(--color-accent)] px-4 py-2 text-xs font-medium text-white transition-colors duration-150 hover:bg-[var(--color-accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-primary)]";
const BTN_SECONDARY = "rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-4 py-2 text-xs text-[var(--color-text-secondary)] transition-colors duration-150 hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)]";
const CHIP_STYLE = "rounded-full bg-[var(--color-bg-elevated)] px-2.5 py-1 text-xs font-medium text-[var(--color-text-secondary)] border border-[var(--color-border-default)]";

export function DashboardPage() {
  const { latestPayrollRecord, payrollRecords } = usePayrollData();
  const { scenario, hasPersistedScenario, updateScenario } = useScenario();
  const previewRecord = latestPayrollRecord
    ? buildScenarioPreviewRecord({
        record: latestPayrollRecord,
        scenario,
        hasPersistedScenario,
      })
    : undefined;
  const kpiValues = previewRecord
    ? {
        grossIncome: previewRecord.grossIncome,
        netIncome: previewRecord.netIncome,
        tax: previewRecord.tax,
        personalSocialFundTotal: previewRecord.personalSocialFundTotal,
        employerContribution: previewRecord.employerContribution || "0.00",
        annualPackage: (Number(previewRecord.grossIncome) * 13).toFixed(2),
        deferredPerformance: previewRecord.deferredPerformance || "0.00",
      }
    : createEmptyKpiValues();
  const chartRecords =
    previewRecord && payrollRecords.length > 0
      ? [previewRecord, ...payrollRecords.slice(1)]
      : payrollRecords;

  return (
    <div className="space-y-5 sm:space-y-6">
      {latestPayrollRecord ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-4 py-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className={CHIP_STYLE}>默认档案</span>
            <span className="text-xs text-[var(--color-text-muted)]">
              最新 <span className="font-medium text-[var(--color-text-primary)]">{latestPayrollRecord.month}</span>
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              <span className="font-medium text-[var(--color-text-primary)]">{payrollRecords.length}</span> 条记录
            </span>
          </div>
          <div className="flex gap-2">
            <button type="button" className={BTN_SECONDARY} onClick={() => { const node = document.getElementById("dashboard-print-area"); if (node) void exportNodeAsPdf(node, "salary-report.pdf"); }}>导出 PDF</button>
            <button type="button" className={BTN_PRIMARY} onClick={() => { const wb = buildWorkbook(payrollRecords); XLSX.writeFile(wb, "salary-records.xlsx"); }}>导出 Excel</button>
          </div>
        </div>
      ) : null}
      <div id="dashboard-print-area" className="space-y-5 sm:space-y-6">
        <KpiCards values={kpiValues} />
        <div className="grid gap-5 xl:grid-cols-[2fr_1fr] sm:gap-6">
          <SalaryCompositionChart records={chartRecords} />
          <ScenarioPanel value={scenario} onChange={(field, value) => { updateScenario({ [field]: Number.isFinite(value) ? value : 0 }); }} />
        </div>
        <div className="grid gap-5 xl:grid-cols-[2fr_1fr] sm:gap-6">
        <HistoryTrendChart records={chartRecords} />
          <CompareSummary baseNetIncome={latestPayrollRecord?.netIncome ?? "0.00"} previewNetIncome={previewRecord?.netIncome ?? "0.00"} scenarioSalaryIncreaseRate={scenario.salaryIncreaseRate} scenarioHousingFundRate={scenario.housingFundRate} scenarioSpecialDeductions={scenario.specialDeductions} hasScenario={hasPersistedScenario} />
        </div>
        <SocialFundBreakdown
          baseSalary={latestPayrollRecord?.baseSalary ?? "0"}
          performanceSalary={latestPayrollRecord?.performanceSalary ?? "0"}
          salesBonus={latestPayrollRecord?.salesBonus ?? "0"}
          departmentBonus={latestPayrollRecord?.departmentBonus ?? "0"}
          socialPersonalRate={Number(latestPayrollRecord?.socialPersonalRate || "0")}
          socialEmployerRate={Number(latestPayrollRecord?.socialEmployerRate || "0")}
          housingFundPersonalRate={Number(latestPayrollRecord?.housingFundPersonalRate || "0")}
          housingFundEmployerRate={Number(latestPayrollRecord?.housingFundEmployerRate || "0")}
          socialFundBase={latestPayrollRecord?.socialFundBase || ""}
          housingFundBase={latestPayrollRecord?.housingFundBase || ""}
        />
      </div>
      <DetailTable records={payrollRecords} />
    </div>
  );
}
