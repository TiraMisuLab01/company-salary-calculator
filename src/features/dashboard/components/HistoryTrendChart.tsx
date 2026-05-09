import ReactECharts from "echarts-for-react";

export function HistoryTrendChart({ records }: { records: Array<{ month: string; netIncome: string }> }) {
  const labels = records.length > 0 ? [...records].reverse().map((record) => record.month) : ["示例"];
  const netIncomeData = records.length > 0 ? [...records].reverse().map((record) => Number(record.netIncome)) : [0];

  return (
    <section data-testid="history-trend-chart" className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h2 className="mb-4 text-lg font-semibold">历史趋势与时间轴</h2>
      <ReactECharts
        style={{ height: 320 }}
        option={{
          tooltip: { trigger: "axis" },
          xAxis: { type: "category", data: labels },
          yAxis: { type: "value" },
          dataZoom: [{ type: "inside" }, { type: "slider" }],
          series: [{ name: "到手", type: "line", smooth: true, data: netIncomeData }],
        }}
      />
    </section>
  );
}
