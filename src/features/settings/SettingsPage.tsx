import * as XLSX from "xlsx";
import { buildWorkbook } from "../../services/excel-export-service";
import { DEFAULT_SCENARIO_SETTINGS } from "../../services/scenario-service";
import { MONTHLY_TAX_THRESHOLD } from "../../lib/tax-rules";
import { usePayrollData } from "../data/PayrollDataProvider";
import { useScenario } from "../data/ScenarioProvider";

const SECTION = "rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4 sm:p-5";
const BTN_PRIMARY = "rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--color-accent-hover)]";
const BTN_SECONDARY = "rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-4 py-2 text-sm text-[var(--color-text-secondary)] transition-colors duration-150 hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)]";

export function SettingsPage() {
  const { payrollRecords } = usePayrollData();
  const { scenario, updateScenario } = useScenario();

  const summaryItems = [
    { label: "调薪幅度", value: `${scenario.salaryIncreaseRate}%` },
    { label: "公积金比例", value: `${scenario.housingFundRate}%` },
    { label: "专项附加扣除", value: `${scenario.specialDeductions} 元` },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-5 sm:space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">设置</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">管理加密密钥、当前假设参数、规则版本和导出偏好。</p>
      </div>

      <div className={SECTION}>
        <h2 className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">安全与解锁</h2>
        <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">本地数据使用 Web Crypto 加密存储，密钥在本机生成。切换设备或清除浏览器数据后需重新设置主口令。</p>
        <div className="mt-3">
          <label className="block" htmlFor="master-password">
            <span className="mb-1 block text-xs font-medium text-[var(--color-text-secondary)]">主口令</span>
          </label>
          <input id="master-password" type="password" className="w-full max-w-xs rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm text-[var(--color-text-muted)]" placeholder="当前使用自动生成密钥" disabled />
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">MVP 阶段使用自动生成本地密钥，暂不支持自定义口令。</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {summaryItems.map((item) => (
          <article key={item.label} className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4">
            <h2 className="text-xs font-medium text-[var(--color-text-muted)]">{item.label}</h2>
            <p className="mt-1.5 text-xl font-bold tabular-nums text-[var(--color-text-primary)]">{item.value}</p>
          </article>
        ))}
      </div>

      <div className={SECTION}>
        <h2 className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">规则版本</h2>
        <div className="grid gap-2 text-xs">
          <div className="flex justify-between">
            <span className="text-[var(--color-text-muted)]">个税起征点</span>
            <span className="tabular-nums text-[var(--color-text-secondary)]">{MONTHLY_TAX_THRESHOLD.toLocaleString()} 元/月</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-text-muted)]">规则包版本</span>
            <span className="text-[var(--color-text-secondary)]">2024 标准税率表</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--color-text-muted)]">地区默认规则</span>
            <span className="text-[var(--color-text-secondary)]">全国通用</span>
          </div>
        </div>
      </div>

      <div className={SECTION}>
        <h2 className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">偏好操作</h2>
        <div className="flex flex-wrap gap-3">
          <button type="button" className={BTN_SECONDARY} onClick={() => updateScenario(DEFAULT_SCENARIO_SETTINGS)}>重置假设参数</button>
          <button type="button" className={BTN_PRIMARY} onClick={() => { const wb = buildWorkbook(payrollRecords); XLSX.writeFile(wb, "salary-records.xlsx"); }}>导出 Excel</button>
        </div>
        <p className="mt-3 text-xs text-[var(--color-text-muted)]">本地工资记录数：{payrollRecords.length}</p>
      </div>
    </div>
  );
}
