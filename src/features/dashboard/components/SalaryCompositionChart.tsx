import { useState } from "react";
import ReactECharts from "echarts-for-react";

type ViewMode = "pre-post" | "fund";

interface SalaryCompositionChartProps {
  records: Array<{
    month: string;
    grossIncome: string;
    netIncome: string;
    tax?: string;
    personalSocialFundTotal?: string;
    employerContribution?: string;
    baseSalary?: string;
  }>;
}

const TAB_STYLE = "rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150";

export function SalaryCompositionChart({ records }: SalaryCompositionChartProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("pre-post");
  const labels = records.length > 0 ? [...records].reverse().map((record) => record.month) : ["示例"];
  const grossData = records.length > 0 ? [...records].reverse().map((r) => Number(r.grossIncome)) : [0];
  const netData = records.length > 0 ? [...records].reverse().map((r) => Number(r.netIncome)) : [0];
  const employerContributionData = records.length > 0
    ? [...records].reverse().map((r) => Number(r.employerContribution ?? 0))
    : [0];
  const personalFundData = records.length > 0
    ? [...records].reverse().map((r) => Number(r.personalSocialFundTotal ?? 0))
    : [0];

  const COLORS = {
    preTax: "#3b82f6",
    postTax: "#10b981",
    employer: "#f59e0b",
    personal: "#ef4444",
  };

  return (
    <section data-testid="salary-composition-chart" className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">月度薪资构成</h2>
        <div className="flex gap-1 rounded-lg bg-[var(--color-bg-primary)] p-1">
          {(["pre-post", "fund"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              className={`${TAB_STYLE} ${viewMode === mode ? "bg-[var(--color-accent)] text-white shadow-sm" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"}`}
              onClick={() => setViewMode(mode)}
            >
              {mode === "pre-post" ? "税前/税后" : "五险一金"}
            </button>
          ))}
        </div>
      </div>
      <ReactECharts
        style={{ height: 280 }}
        option={
          viewMode === "pre-post"
            ? {
                tooltip: { trigger: "axis" },
                legend: { bottom: 0, textStyle: { fontSize: 12, color: "#94a3b8" } },
                grid: { left: 8, right: 8, bottom: 32, top: 8, containLabel: true },
                xAxis: { type: "category", data: labels, axisLabel: { fontSize: 11, color: "#64748b" }, axisLine: { lineStyle: { color: "#2a2e3b" } } },
                yAxis: { type: "value", axisLabel: { fontSize: 11, color: "#64748b" }, splitLine: { lineStyle: { color: "#1f2230" } } },
                series: [
                  { name: "税前", type: "bar", data: grossData, barGap: "-100%", z: 1, itemStyle: { color: COLORS.preTax, borderRadius: [4, 4, 0, 0] } },
                  { name: "税后", type: "bar", data: netData, z: 2, itemStyle: { color: COLORS.postTax, borderRadius: [4, 4, 0, 0] } },
                ],
              }
            : {
                tooltip: { trigger: "axis" },
                legend: { bottom: 0, textStyle: { fontSize: 12, color: "#94a3b8" } },
                grid: { left: 8, right: 8, bottom: 32, top: 8, containLabel: true },
                xAxis: { type: "category", data: labels, axisLabel: { fontSize: 11, color: "#64748b" }, axisLine: { lineStyle: { color: "#2a2e3b" } } },
                yAxis: { type: "value", axisLabel: { fontSize: 11, color: "#64748b" }, splitLine: { lineStyle: { color: "#1f2230" } } },
                series: [
                  { name: "公司缴纳", type: "bar", data: employerContributionData, barGap: "-100%", z: 1, itemStyle: { color: COLORS.employer, borderRadius: [4, 4, 0, 0] } },
                  { name: "个人缴纳", type: "bar", data: personalFundData, z: 2, itemStyle: { color: COLORS.personal, borderRadius: [4, 4, 0, 0] } },
                ],
              }
        }
      />
    </section>
  );
}
