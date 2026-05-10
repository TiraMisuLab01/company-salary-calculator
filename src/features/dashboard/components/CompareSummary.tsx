interface CompareSummaryProps {
  baseNetIncome: string;
  previewNetIncome: string;
  scenarioSalaryIncreaseRate: number;
  scenarioHousingFundRate: number;
  scenarioSpecialDeductions: number;
  hasScenario: boolean;
}

export function CompareSummary({
  baseNetIncome,
  previewNetIncome,
  scenarioSalaryIncreaseRate,
  scenarioHousingFundRate,
  scenarioSpecialDeductions,
  hasScenario,
}: CompareSummaryProps) {
  if (!hasScenario) {
    return (
      <aside className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4">
        <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">对比摘要</h2>
        <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-muted)]">调整右侧假设参数后，此处将展示实发与假设方案的差异。</p>
      </aside>
    );
  }

  const delta = (Number(previewNetIncome) - Number(baseNetIncome)).toFixed(2);
  const deltaNum = Number(delta);
  const isPositive = deltaNum >= 0;

  return (
    <aside className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4">
      <h2 className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">对比摘要</h2>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-[var(--color-text-muted)]">调薪幅度</span>
          <span className="tabular-nums text-[var(--color-text-secondary)]">{scenarioSalaryIncreaseRate}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--color-text-muted)]">公积金比例</span>
          <span className="tabular-nums text-[var(--color-text-secondary)]">{scenarioHousingFundRate}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--color-text-muted)]">专项附加扣除</span>
          <span className="tabular-nums text-[var(--color-text-secondary)]">{scenarioSpecialDeductions} 元</span>
        </div>
        <div className="my-2 border-t border-[var(--color-border-default)]" />
        <div className="flex justify-between">
          <span className="text-[var(--color-text-muted)]">实发到手</span>
          <span className="tabular-nums text-[var(--color-text-primary)]">{baseNetIncome}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--color-text-muted)]">假设到手</span>
          <span className="tabular-nums text-[var(--color-text-primary)]">{previewNetIncome}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>到手变化</span>
          <span className={`tabular-nums ${isPositive ? "text-[var(--color-emerald)]" : "text-[var(--color-rose)]"}`}>
            {isPositive ? "+" : ""}{delta}
          </span>
        </div>
      </div>
    </aside>
  );
}
