export function ScenarioPanel() {
  return (
    <aside className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h2 className="text-lg font-semibold">假设分析</h2>
      <div className="mt-4 space-y-3">
        <label className="block text-sm" htmlFor="salary-increase-rate">
          <span className="mb-1 block text-slate-300">调薪幅度</span>
          <input
            id="salary-increase-rate"
            name="salaryIncreaseRate"
            className="w-full rounded bg-slate-800 px-3 py-2"
            defaultValue="10"
          />
        </label>
        <label className="block text-sm" htmlFor="housing-fund-rate">
          <span className="mb-1 block text-slate-300">公积金比例</span>
          <input
            id="housing-fund-rate"
            name="housingFundRate"
            className="w-full rounded bg-slate-800 px-3 py-2"
            defaultValue="10"
          />
        </label>
      </div>
    </aside>
  );
}
