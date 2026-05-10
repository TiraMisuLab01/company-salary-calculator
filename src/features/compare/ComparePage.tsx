import { useState } from "react";
import * as XLSX from "xlsx";
import { buildScenarioPreviewRecord } from "../../lib/payroll/build-scenario-preview";
import { usePayrollData } from "../data/PayrollDataProvider";
import { useScenario } from "../data/ScenarioProvider";

const CARD = "rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4 sm:p-5";
const LABEL = "text-xs text-[var(--color-text-muted)]";
const INPUT = "w-full rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors resize-y";

const NOTES_KEY = "salary-analytics-compare-notes";

interface NoteEntry {
  note: string;
  scenarioVer: string;
  updatedAt: string;
}

function loadNotes(): Record<string, NoteEntry> {
  try {
    return JSON.parse(window.localStorage.getItem(NOTES_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveNotes(notes: Record<string, NoteEntry>) {
  try {
    window.localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch { /* noop */ }
}

function makeScenarioVer(scenario: { salaryIncreaseRate: number; housingFundRate: number; specialDeductions: number }) {
  return `${scenario.salaryIncreaseRate}-${scenario.housingFundRate}-${scenario.specialDeductions}`;
}

export function ComparePage() {
  const { latestPayrollRecord } = usePayrollData();
  const { scenario, hasPersistedScenario } = useScenario();
  const [allNotes, setAllNotes] = useState<Record<string, NoteEntry>>(loadNotes);
  const [editingMonth, setEditingMonth] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const scenarioVer = makeScenarioVer(scenario);
  const month = latestPayrollRecord?.month || "";
  const noteKey = `${month}_${scenarioVer}`;
  const currentNote = allNotes[noteKey];

  if (!latestPayrollRecord) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">方案对比</h1>
        <div className="rounded-xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-surface)] p-6 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">先录入或导入至少一条工资记录，再查看实发方案与假设方案的差异。</p>
        </div>
      </div>
    );
  }

  const previewRecord = buildScenarioPreviewRecord({
    record: latestPayrollRecord,
    scenario,
    hasPersistedScenario,
  });

  const actualNet = latestPayrollRecord.actualNetIncome || "";
  const previewNet = previewRecord.netIncome;
  const hasActual = actualNet !== "" && Number(actualNet) > 0;

  const absDelta = hasActual ? (Number(previewNet) - Number(actualNet)).toFixed(2) : "0.00";
  const pctDelta = hasActual && Number(actualNet) > 0
    ? ((Number(previewNet) - Number(actualNet)) / Number(actualNet) * 100).toFixed(1)
    : "0.0";
  const isPositive = Number(absDelta) >= 0;
  const arrow = isPositive ? "↑" : "↓";

  const handleSaveNote = () => {
    const updated = {
      ...allNotes,
      [noteKey]: {
        note: editValue,
        scenarioVer,
        updatedAt: new Date().toISOString(),
      },
    };
    setAllNotes(updated);
    saveNotes(updated);
    setEditingMonth(null);
  };

  const handleDeleteNote = () => {
    const updated = { ...allNotes };
    delete updated[noteKey];
    setAllNotes(updated);
    saveNotes(updated);
    setEditingMonth(null);
  };

  const handleStartEdit = () => {
    setEditValue(currentNote?.note || "");
    setEditingMonth(noteKey);
  };

  const handleExportNotes = () => {
    const rows = Object.entries(allNotes).map(([key, entry]) => {
      const [m, , ver] = key.split("_");
      return { 月份: m, 方案版本: ver || "", 备注: entry.note, 最后更新: entry.updatedAt };
    });
    const sheet = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "备注");
    XLSX.writeFile(wb, "compare-notes.xlsx");
  };

  const sortedNoteEntries = Object.entries(allNotes).sort((a, b) => {
    const ma = a[0].split("_")[0];
    const mb = b[0].split("_")[0];
    return mb.localeCompare(ma);
  });

  return (
    <div className="space-y-5 sm:space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">方案对比</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          调薪 {scenario.salaryIncreaseRate}% · 公积金 {scenario.housingFundRate}% · 专项附加扣除 {scenario.specialDeductions} 元
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <article className={CARD}>
          <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">当月实发工资</h2>
          {hasActual ? (
            <div className="mt-4">
              <span className={LABEL}>税后到手</span>
              <p className="text-2xl font-bold tabular-nums tracking-tight text-[var(--color-text-primary)]">{Number(actualNet).toFixed(2)}</p>
            </div>
          ) : (
            <p className="mt-4 text-xs text-[var(--color-text-muted)]">未录入当月实发工资</p>
          )}
        </article>
        <article className={`${CARD} border-[var(--color-accent)]/30 ring-1 ring-[var(--color-accent)]/10`}>
          <h2 className="text-sm font-semibold text-[var(--color-accent)]">假设方案</h2>
          <div className="mt-4">
            <span className={LABEL}>税后到手</span>
            <p className="text-2xl font-bold tabular-nums tracking-tight text-[var(--color-emerald)]">{previewNet}</p>
          </div>
        </article>
      </div>
      {hasActual ? (
        <>
          <div className={CARD}>
            <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">差异分析</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <span className={LABEL}>绝对差值</span>
                <p className={`mt-1 text-xl font-bold tabular-nums tracking-tight ${isPositive ? "text-[var(--color-emerald)]" : "text-[var(--color-rose)]"}`}>
                  {arrow} {isPositive ? "+" : ""}{absDelta}
                </p>
              </div>
              <div>
                <span className={LABEL}>百分比变化</span>
                <p className={`mt-1 text-xl font-bold tabular-nums tracking-tight ${isPositive ? "text-[var(--color-emerald)]" : "text-[var(--color-rose)]"}`}>
                  {arrow} {isPositive ? "+" : ""}{pctDelta}%
                </p>
              </div>
              <div>
                <span className={LABEL}>备注</span>
                {currentNote && editingMonth !== noteKey ? (
                  <div className="mt-1 flex items-center gap-2">
                    <span className="truncate text-xs text-[var(--color-text-secondary)]">{currentNote.note.slice(0, 30)}{currentNote.note.length > 30 ? "…" : ""}</span>
                  </div>
                ) : null}
              </div>
            </div>
            {editingMonth === noteKey ? (
              <div className="mt-3 space-y-2">
                <textarea className={INPUT} rows={3} placeholder="输入差异分析说明…" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                <div className="flex gap-2">
                  <button type="button" className="rounded-lg bg-[var(--color-accent)] px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)]" onClick={handleSaveNote}>保存备注</button>
                  <button type="button" className="rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-4 py-1.5 text-xs text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-hover)]" onClick={() => setEditingMonth(null)}>取消</button>
                  {currentNote ? (
                    <button type="button" className="rounded-lg px-4 py-1.5 text-xs text-[var(--color-rose)] transition-colors hover:bg-[var(--color-rose)]/10" onClick={handleDeleteNote}>删除</button>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="mt-3 flex gap-2">
                <button type="button" className="rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-4 py-1.5 text-xs text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-hover)]" onClick={handleStartEdit}>
                  {currentNote ? "编辑备注" : "添加备注"}
                </button>
              </div>
            )}
          </div>

          {sortedNoteEntries.length > 0 ? (
            <div className={CARD}>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">历史备注记录</h2>
                <button type="button" className="rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-3 py-1 text-xs text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-hover)]" onClick={handleExportNotes}>导出 Excel</button>
              </div>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[var(--color-border-default)] text-[var(--color-text-muted)]">
                      <th className="py-2 pr-3 text-left">月份</th>
                      <th className="py-2 pr-3 text-left">方案版本</th>
                      <th className="py-2 pr-3 text-left">备注内容</th>
                      <th className="py-2 pr-3 text-left">更新时间</th>
                      <th className="py-2 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedNoteEntries.map(([key, entry]) => {
                      const [m, , ver] = key.split("_");
                      const isCurrent = key === noteKey;
                      return (
                        <tr key={key} className={`border-b border-[var(--color-border-default)] last:border-0 ${isCurrent ? "bg-[var(--color-accent-subtle)]" : ""}`}>
                          <td className="py-2 pr-3 font-medium text-[var(--color-text-primary)]">{m}{isCurrent ? " (当前)" : ""}</td>
                          <td className="py-2 pr-3 text-[var(--color-text-secondary)]">{ver || "—"}</td>
                          <td className="py-2 pr-3 max-w-xs truncate text-[var(--color-text-secondary)]">{entry.note}</td>
                          <td className="py-2 pr-3 text-[var(--color-text-muted)]">{new Date(entry.updatedAt).toLocaleDateString("zh-CN")}</td>
                          <td className="py-2 text-right">
                            <button
                              type="button"
                              className="rounded px-2 py-1 text-xs text-[var(--color-rose)] transition-colors hover:bg-[var(--color-rose)]/10"
                              onClick={() => {
                                const updated = { ...allNotes };
                                delete updated[key];
                                setAllNotes(updated);
                                saveNotes(updated);
                                if (editingMonth === key) setEditingMonth(null);
                              }}
                            >
                              删除
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
