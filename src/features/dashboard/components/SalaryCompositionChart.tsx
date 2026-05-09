import ReactECharts from "echarts-for-react";

export function SalaryCompositionChart() {
  return (
    <section data-testid="salary-composition-chart" className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h2 className="mb-4 text-lg font-semibold">月度薪资构成</h2>
      <ReactECharts
        style={{ height: 320 }}
        option={{
          tooltip: { trigger: "axis" },
          legend: { textStyle: { color: "#cbd5e1" } },
          xAxis: { type: "category", data: ["1月", "2月", "3月"], axisLabel: { color: "#cbd5e1" } },
          yAxis: { type: "value", axisLabel: { color: "#cbd5e1" } },
          series: [
            { name: "税前", type: "bar", stack: "salary", data: [15508, 15508, 16800] },
            { name: "税后", type: "bar", stack: "salary", data: [11955.97, 11955.97, 12980] },
          ],
        }}
      />
    </section>
  );
}
