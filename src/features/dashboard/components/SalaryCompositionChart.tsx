import ReactECharts from "echarts-for-react";

export function SalaryCompositionChart({ records }: { records: Array<{ month: string; grossIncome: string; netIncome: string }> }) {
  const labels = records.length > 0 ? [...records].reverse().map((record) => record.month) : ["示例"];
  const grossData = records.length > 0 ? [...records].reverse().map((record) => Number(record.grossIncome)) : [0];
  const netData = records.length > 0 ? [...records].reverse().map((record) => Number(record.netIncome)) : [0];

  return (
    <section data-testid="salary-composition-chart" className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h2 className="mb-4 text-lg font-semibold">月度薪资构成</h2>
      <ReactECharts
        style={{ height: 320 }}
        option={{
          tooltip: { trigger: "axis" },
          legend: { textStyle: { color: "#cbd5e1" } },
          xAxis: { type: "category", data: labels, axisLabel: { color: "#cbd5e1" } },
          yAxis: { type: "value", axisLabel: { color: "#cbd5e1" } },
          series: [
            { name: "税前", type: "bar", stack: "salary", data: grossData },
            { name: "税后", type: "bar", stack: "salary", data: netData },
          ],
        }}
      />
    </section>
  );
}
