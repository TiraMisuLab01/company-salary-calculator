import { useState } from "react";
import type { PayrollRecord } from "../../../types/salary";
import { usePayrollData } from "../../data/PayrollDataProvider";

interface DetailTableProps {
  records: PayrollRecord[];
}

const TH_STYLE = "py-2.5 pr-3 text-left text-xs font-medium text-[var(--color-text-muted)] whitespace-nowrap";
const TD_STYLE = "py-2.5 pr-3 text-sm tabular-nums text-[var(--color-text-secondary)] whitespace-nowrap";
const BTN_DEL = "rounded px-2 py-1 text-xs text-[var(--color-rose)] transition-colors duration-150 hover:bg-[var(--color-rose)]/10";

export function DetailTable({ records }: DetailTableProps) {
  const { removePayrollRecord } = usePayrollData();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (records.length === 0) {
    return (
      <section data-testid="detail-table" className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4">
        <h2 className="mb-2 text-sm font-semibold text-[var(--color-text-primary)]">月度明细</h2>
        <p className="text-xs text-[var(--color-text-muted)]">暂无数据，请先录入或导入工资记录。</p>
      </section>
    );
  }

  const handleDelete = async (id: string) => {
    if (deletingId) return;
    setDeletingId(id);
    try {
      await removePayrollRecord(id);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section data-testid="detail-table" className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4">
      <h2 className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">月度明细</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-border-default)]">
              <th className={TH_STYLE}>月份</th>
              <th className={TH_STYLE}>固定薪资</th>
              <th className={TH_STYLE}>实发绩效</th>
              <th className={TH_STYLE}>递延绩效</th>
              <th className={TH_STYLE}>销量奖金</th>
              <th className={TH_STYLE}>部门奖金</th>
              <th className={TH_STYLE}>当季评级</th>
              <th className={TH_STYLE}>应发合计</th>
              <th className={TH_STYLE}>个税</th>
              <th className={TH_STYLE}>五险一金</th>
              <th className={TH_STYLE}>计算到手</th>
              <th className={TH_STYLE}>实际到手</th>
              <th className={TH_STYLE}>操作</th>
            </tr>
          </thead>
          <tbody>
            {[...records].reverse().map((record) => {
              const prepaidPerf = record.performancePrepayRate
                ? (Number(record.performanceSalary) * Number(record.performancePrepayRate) / 100).toFixed(2)
                : "0.00";
              const monthNum = Number(record.month.replace(/[^0-9]/g, "").slice(-2)) || 1;
              const quarterRatings = [record.q1Rating, record.q2Rating, record.q3Rating, record.q4Rating];
              const quarterIdx = monthNum <= 3 ? 0 : monthNum <= 6 ? 1 : monthNum <= 9 ? 2 : 3;
              const thisQuarterRating = quarterRatings[quarterIdx] || "—";
              const actualNet = record.actualNetIncome && Number(record.actualNetIncome) > 0
                ? Number(record.actualNetIncome).toFixed(2)
                : "—";
              return (
                <tr key={record.id} className="border-b border-[var(--color-border-default)] last:border-0">
                  <td className={TD_STYLE}>{record.month}</td>
                  <td className={TD_STYLE}>{record.baseSalary}</td>
                  <td className={TD_STYLE}>{prepaidPerf}</td>
                  <td className="py-2.5 pr-3 text-sm tabular-nums text-[var(--color-amber)]">{record.deferredPerformance}</td>
                  <td className={TD_STYLE}>{record.salesBonus}</td>
                  <td className={TD_STYLE}>{record.departmentBonus}</td>
                  <td className={TD_STYLE}>{thisQuarterRating}</td>
                  <td className="py-2.5 pr-3 text-sm font-medium tabular-nums text-[var(--color-text-primary)]">{record.grossIncome}</td>
                  <td className="py-2.5 pr-3 text-sm tabular-nums text-[var(--color-amber)]">{record.tax}</td>
                  <td className="py-2.5 pr-3 text-sm tabular-nums text-[var(--color-accent)]">{record.personalSocialFundTotal}</td>
                  <td className="py-2.5 pr-3 text-sm font-semibold tabular-nums text-[var(--color-emerald)]">{record.netIncome}</td>
                  <td className={`py-2.5 pr-3 text-sm font-semibold tabular-nums ${actualNet !== "—" ? "text-[var(--color-emerald)]" : "text-[var(--color-text-muted)]"}`}>{actualNet}</td>
                  <td className="py-2.5 pr-3">
                    <button type="button" className={BTN_DEL} disabled={deletingId === record.id} onClick={() => { void handleDelete(record.id); }}>
                      {deletingId === record.id ? "…" : "删除"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
