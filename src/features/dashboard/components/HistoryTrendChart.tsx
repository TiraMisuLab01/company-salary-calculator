import { useState } from "react";
import ReactECharts from "echarts-for-react";

type TrendMode = "net" | "gross";

interface HistoryTrendChartProps {
  records: Array<{ month: string; netIncome: string; grossIncome: string }>;
}

const TAB_STYLE = "rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150";

export function HistoryTrendChart({ records }: HistoryTrendChartProps) {
  const [trendMode, setTrendMode] = useState<TrendMode>("net");

  const labels = records.length > 0 ? [...records].reverse().map((record) => record.month) : ["示例"];
  const netData = records.length > 0 ? [...records].reverse().map((record) => Number(record.netIncome)) : [0];
  const grossData = records.length > 0 ? [...records].reverse().map((record) => Number(record.grossIncome)) : [0];

  const seriesData = trendMode === "net"
    ? [{ name: "税后到手", type: "line", smooth: true, data: netData, symbol: "circle", symbolSize: 6, lineStyle: { color: "#10b981", width: 2 }, itemStyle: { color: "#10b981" }, areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(16,185,129,0.15)" }, { offset: 1, color: "rgba(16,185,129,0)" }] } } }]
    : [{ name: "税前总额", type: "line", smooth: true, data: grossData, symbol: "circle", symbolSize: 6, lineStyle: { color: "#3b82f6", width: 2 }, itemStyle: { color: "#3b82f6" }, areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(59,130,246,0.15)" }, { offset: 1, color: "rgba(59,130,246,0)" }] } } }];

  return (
    <section data-testid="history-trend-chart" className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">历史趋势与时间轴</h2>
        <div className="flex gap-1 rounded-lg bg-[var(--color-bg-primary)] p-1">
          {(["net", "gross"] as TrendMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              className={`${TAB_STYLE} ${trendMode === mode ? "bg-[var(--color-accent)] text-white shadow-sm" : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"}`}
              onClick={() => setTrendMode(mode)}
            >
              {mode === "net" ? "税后到手" : "税前总额"}
            </button>
          ))}
        </div>
      </div>
      <ReactECharts
        style={{ height: 280 }}
        option={{
          tooltip: { trigger: "axis" },
          legend: { top: 0, textStyle: { fontSize: 12, color: "#94a3b8" } },
          grid: { left: 8, right: 8, bottom: 32, top: 28, containLabel: true },
          xAxis: { type: "category", data: labels, axisLabel: { fontSize: 11, color: "#64748b" }, axisLine: { lineStyle: { color: "#2a2e3b" } } },
          yAxis: { type: "value", axisLabel: { fontSize: 11, color: "#64748b" }, splitLine: { lineStyle: { color: "#1f2230" } } },
          dataZoom: [
            { type: "slider", height: 20, bottom: 8, backgroundColor: "#111318", dataBackground: { lineStyle: { color: "#3b82f6" }, areaStyle: { color: "rgba(59,130,246,0.08)" } }, selectedDataBackground: { lineStyle: { color: "#3b82f6" }, areaStyle: { color: "rgba(59,130,246,0.2)" } }, handleStyle: { color: "#3b82f6" } },
          ],
          series: seriesData,
        }}
      />
    </section>
  );
}
