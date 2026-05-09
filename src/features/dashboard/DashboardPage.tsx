import { usePayrollData } from "../data/PayrollDataProvider";
import { KpiCards } from "./components/KpiCards";
import { HistoryTrendChart } from "./components/HistoryTrendChart";
import { ScenarioPanel } from "./components/ScenarioPanel";
import { SalaryCompositionChart } from "./components/SalaryCompositionChart";

export function DashboardPage() {
  const { latestPayrollRecord, payrollRecords } = usePayrollData();
  const kpiValues = latestPayrollRecord
    ? {
        grossIncome: latestPayrollRecord.grossIncome,
        netIncome: latestPayrollRecord.netIncome,
        tax: latestPayrollRecord.tax,
        personalSocialFundTotal: latestPayrollRecord.personalSocialFundTotal,
        employerContribution: (Number(latestPayrollRecord.baseSalary) * 0.258 + Number(latestPayrollRecord.baseSalary) * 0.1).toFixed(2),
        annualPackage: (Number(latestPayrollRecord.grossIncome) * 13).toFixed(2),
      }
    : {
        grossIncome: "0.00",
        netIncome: "0.00",
        tax: "0.00",
        personalSocialFundTotal: "0.00",
        employerContribution: "0.00",
        annualPackage: "0.00",
      };

  return (
    <div className="space-y-6 px-6 py-6">
      <KpiCards values={kpiValues} />
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <SalaryCompositionChart records={payrollRecords} />
        <ScenarioPanel />
      </div>
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <HistoryTrendChart records={payrollRecords} />
        <aside className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h2 className="text-lg font-semibold">对比摘要与异常提醒</h2>
          <p className="mt-2 text-sm text-slate-300">展示多个方案差异与异常波动月份。</p>
        </aside>
      </div>
    </div>
  );
}
