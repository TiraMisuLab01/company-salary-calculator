import type { ScenarioSettings } from "../../../services/scenario-service";

interface ScenarioPanelProps {
  value: ScenarioSettings;
  onChange: (field: keyof ScenarioSettings, value: number) => void;
}

const INPUT_STYLE = "w-full rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors";
const LABEL_STYLE = "mb-1.5 block text-xs font-medium text-[var(--color-text-secondary)]";

export function ScenarioPanel({ value, onChange }: ScenarioPanelProps) {
  return (
    <aside className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4">
      <h2 className="mb-1 text-sm font-semibold text-[var(--color-text-primary)]">假设分析</h2>
      <p className="mb-4 text-xs text-[var(--color-text-muted)]">调整参数即时预览到手变化</p>
      <div className="space-y-4">
        <label className="block" htmlFor="salary-increase-rate">
          <span className={LABEL_STYLE}>调薪幅度 (%)</span>
          <input
            id="salary-increase-rate"
            name="salaryIncreaseRate"
            type="number"
            className={INPUT_STYLE}
            value={value.salaryIncreaseRate}
            onChange={(e) => onChange("salaryIncreaseRate", Number(e.target.value))}
          />
        </label>
        <label className="block" htmlFor="housing-fund-rate">
          <span className={LABEL_STYLE}>公积金比例 (%)</span>
          <input
            id="housing-fund-rate"
            name="housingFundRate"
            type="number"
            className={INPUT_STYLE}
            value={value.housingFundRate}
            onChange={(e) => onChange("housingFundRate", Number(e.target.value))}
          />
        </label>
        <label className="block" htmlFor="scenario-special-deductions">
          <span className={LABEL_STYLE}>专项附加扣除 (元)</span>
          <input
            id="scenario-special-deductions"
            name="specialDeductions"
            type="number"
            className={INPUT_STYLE}
            value={value.specialDeductions}
            onChange={(e) => onChange("specialDeductions", Number(e.target.value))}
          />
        </label>
      </div>
    </aside>
  );
}
