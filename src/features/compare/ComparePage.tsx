const scenarios = [
  { name: "基准方案", annualPackage: "230,000", takeHome: "11,955.97" },
  { name: "调薪 10%", annualPackage: "253,000", takeHome: "13,151.57" },
];

export function ComparePage() {
  return (
    <div className="space-y-4 px-6 py-6">
      <h1 className="text-2xl font-bold">方案对比</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {scenarios.map((scenario) => (
          <article key={scenario.name} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <h2 className="text-lg font-semibold">{scenario.name}</h2>
            <p className="mt-2 text-sm text-slate-300">年包：{scenario.annualPackage}</p>
            <p className="text-sm text-slate-300">税后到手：{scenario.takeHome}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
