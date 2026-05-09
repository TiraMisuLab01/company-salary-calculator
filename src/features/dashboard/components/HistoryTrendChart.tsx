import ReactECharts from "echarts-for-react";

export function HistoryTrendChart() {
  return (
    <section data-testid="history-trend-chart" className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h2 className="mb-4 text-lg font-semibold">历史趋势与时间轴</h2>
      <ReactECharts
        style={{ height: 320 }}
        option={{
          tooltip: { trigger: "axis" },
          xAxis: { type: "category", data: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"] },
          yAxis: { type: "value" },
          dataZoom: [{ type: "inside" }, { type: "slider" }],
          series: [{ name: "到手", type: "line", smooth: true, data: [11650, 11820, 11955.97, 12480, 12810] }],
        }}
      />
    </section>
  );
}
