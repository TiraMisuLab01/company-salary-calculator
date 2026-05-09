import { KpiCards } from "./components/KpiCards";
import { HistoryTrendChart } from "./components/HistoryTrendChart";
import { ScenarioPanel } from "./components/ScenarioPanel";
import { SalaryCompositionChart } from "./components/SalaryCompositionChart";

export function DashboardPage() {
  return (
    <div className="space-y-6 px-6 py-6">
      <KpiCards />
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <SalaryCompositionChart />
        <ScenarioPanel />
      </div>
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <HistoryTrendChart />
        <aside className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h2 className="text-lg font-semibold">对比摘要与异常提醒</h2>
          <p className="mt-2 text-sm text-slate-300">展示多个方案差异与异常波动月份。</p>
        </aside>
      </div>
    </div>
  );
}
