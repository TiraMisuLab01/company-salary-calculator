import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePayrollData } from "../data/PayrollDataProvider";
import type { QuarterlyRating } from "../../types/salary";

const RATINGS: { value: QuarterlyRating; label: string }[] = [
  { value: "", label: "—" },
  { value: "A", label: "A — +50%" },
  { value: "B", label: "B — +20%" },
  { value: "C", label: "C — 基准" },
  { value: "D", label: "D — -20%" },
];

const initialForm = {
  month: "",
  baseSalary: "",
  performanceSalary: "",
  performancePrepayRate: "80",
  salesBonus: "0",
  q1Rating: "" as QuarterlyRating,
  q2Rating: "" as QuarterlyRating,
  q3Rating: "" as QuarterlyRating,
  q4Rating: "" as QuarterlyRating,
  quarterlyBase: "",
  departmentBonus: "0",
  patentBonus: "0",
  specialDeductions: "0",
  socialPersonalRate: "10.3",
  socialEmployerRate: "25.8",
  housingFundPersonalRate: "10",
  housingFundEmployerRate: "10",
  socialFundBase: "",
  housingFundBase: "",
  yearEndBonusMonths: "2",
  mealSubsidy: "300",
  housingSubsidy: "0",
  actualNetIncome: "",
};

type FormField = keyof typeof initialForm;

const INPUT = "w-full rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors";
const SEL = "w-full rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-colors";
const FORM_LABEL = "mb-1.5 block text-xs font-medium text-[var(--color-text-secondary)]";
const SECTION = "rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4 sm:p-5";
const BTN = "rounded-lg bg-[var(--color-accent)] px-6 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-[var(--color-accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-primary)]";
const HELPER = "ml-1 text-[var(--color-text-muted)] font-normal";

export function EntryPage() {
  const navigate = useNavigate();
  const { addPayrollRecord } = usePayrollData();
  const [form, setForm] = useState(initialForm);

  const handleChange = (field: FormField, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addPayrollRecord(form as any);
    navigate("/dashboard");
  };

  const prepayAmount = form.performanceSalary && form.performancePrepayRate
    ? (Number(form.performanceSalary) * Number(form.performancePrepayRate) / 100).toFixed(2)
    : "0.00";
  const deferredAmount = form.performanceSalary
    ? (Number(form.performanceSalary) - Number(prepayAmount)).toFixed(2)
    : "0.00";

  return (
    <div className="mx-auto max-w-2xl space-y-5 sm:space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]">薪资录入</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">按特定薪资结构录入月度工资、奖金、五险一金与福利。</p>
      </div>
      <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
        <div className={SECTION}>
          <h2 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">工资构成</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block" htmlFor="entry-month">
              <span className={FORM_LABEL}>月份</span>
              <input id="entry-month" className={INPUT} placeholder="2026-05" value={form.month} onChange={(e) => handleChange("month", e.target.value)} />
            </label>
            <label className="block" htmlFor="entry-baseSalary">
              <span className={FORM_LABEL}>固定薪资<span className={HELPER}>(70%部分)</span></span>
              <input id="entry-baseSalary" className={INPUT} value={form.baseSalary} onChange={(e) => handleChange("baseSalary", e.target.value)} />
            </label>
            <label className="block" htmlFor="entry-performanceSalary">
              <span className={FORM_LABEL}>绩效薪资(全额)<span className={HELPER}>(30%部分)</span></span>
              <input id="entry-performanceSalary" className={INPUT} value={form.performanceSalary} onChange={(e) => handleChange("performanceSalary", e.target.value)} />
            </label>
            <label className="block" htmlFor="entry-performancePrepayRate">
              <span className={FORM_LABEL}>绩效预发比例 (%)</span>
              <input id="entry-performancePrepayRate" className={INPUT} value={form.performancePrepayRate} onChange={(e) => handleChange("performancePrepayRate", e.target.value)} />
            </label>
          </div>
          {form.performanceSalary ? (
            <div className="mt-3 flex gap-4 rounded-lg bg-[var(--color-bg-primary)] px-3 py-2 text-xs">
              <span className="text-[var(--color-text-muted)]">当月实发绩效：<span className="tabular-nums text-[var(--color-accent)]">{prepayAmount}</span></span>
              <span className="text-[var(--color-text-muted)]">递延至年终：<span className="tabular-nums text-[var(--color-amber)]">{deferredAmount}</span></span>
            </div>
          ) : null}
        </div>

        <div className={SECTION}>
          <h2 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">月度奖金与激励</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block" htmlFor="entry-salesBonus">
              <span className={FORM_LABEL}>销量奖金</span>
              <input id="entry-salesBonus" className={INPUT} placeholder="2000" value={form.salesBonus} onChange={(e) => handleChange("salesBonus", e.target.value)} />
            </label>
            <label className="block" htmlFor="entry-quarterlyBase">
              <span className={FORM_LABEL}>季度激励 KPI 基数</span>
              <input id="entry-quarterlyBase" className={INPUT} value={form.quarterlyBase} onChange={(e) => handleChange("quarterlyBase", e.target.value)} />
            </label>
            <label className="block" htmlFor="entry-departmentBonus">
              <span className={FORM_LABEL}>部门/项目奖金</span>
              <input id="entry-departmentBonus" className={INPUT} placeholder="0" value={form.departmentBonus} onChange={(e) => handleChange("departmentBonus", e.target.value)} />
            </label>
            <label className="block" htmlFor="entry-patentBonus">
              <span className={FORM_LABEL}>专利奖金</span>
              <input id="entry-patentBonus" className={INPUT} placeholder="0" value={form.patentBonus} onChange={(e) => handleChange("patentBonus", e.target.value)} />
            </label>
          </div>

          <div className="mt-4 border-t border-[var(--color-border-default)] pt-4">
            <span className="mb-3 block text-xs font-medium text-[var(--color-text-secondary)]">四季度绩效评级 (当月所在季度自动选用)</span>
            <div className="grid grid-cols-4 gap-3">
              {(["q1", "q2", "q3", "q4"] as const).map((q, i) => (
                <label key={q} className="block" htmlFor={`entry-${q}Rating`}>
                  <span className="mb-1.5 block text-xs text-[var(--color-text-muted)]">Q{i + 1} ({(i * 3 + 1)}–{(i + 1) * 3}月)</span>
                  <select id={`entry-${q}Rating`} className={SEL} value={form[`${q}Rating` as FormField]} onChange={(e) => handleChange(`${q}Rating` as FormField, e.target.value)}>
                    {RATINGS.map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className={SECTION}>
          <h2 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">五险一金比例与基数</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block" htmlFor="entry-socialPersonalRate">
              <span className={FORM_LABEL}>五险 — 个人总比例 (%)</span>
              <input id="entry-socialPersonalRate" className={INPUT} value={form.socialPersonalRate} onChange={(e) => handleChange("socialPersonalRate", e.target.value)} />
            </label>
            <label className="block" htmlFor="entry-socialEmployerRate">
              <span className={FORM_LABEL}>五险 — 公司总比例 (%)</span>
              <input id="entry-socialEmployerRate" className={INPUT} value={form.socialEmployerRate} onChange={(e) => handleChange("socialEmployerRate", e.target.value)} />
            </label>
            <label className="block" htmlFor="entry-housingFundPersonalRate">
              <span className={FORM_LABEL}>公积金 — 个人比例 (%)</span>
              <input id="entry-housingFundPersonalRate" className={INPUT} value={form.housingFundPersonalRate} onChange={(e) => handleChange("housingFundPersonalRate", e.target.value)} />
            </label>
            <label className="block" htmlFor="entry-housingFundEmployerRate">
              <span className={FORM_LABEL}>公积金 — 公司比例 (%)</span>
              <input id="entry-housingFundEmployerRate" className={INPUT} value={form.housingFundEmployerRate} onChange={(e) => handleChange("housingFundEmployerRate", e.target.value)} />
            </label>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 border-t border-[var(--color-border-default)] pt-4">
            <label className="block" htmlFor="entry-socialFundBase">
              <span className={FORM_LABEL}>社保缴纳基数<span className={HELPER}>(留空自动)</span></span>
              <input id="entry-socialFundBase" className={INPUT} placeholder="留空自动计算" value={form.socialFundBase} onChange={(e) => handleChange("socialFundBase", e.target.value)} />
            </label>
            <label className="block" htmlFor="entry-housingFundBase">
              <span className={FORM_LABEL}>公积金缴纳基数<span className={HELPER}>(留空同社保)</span></span>
              <input id="entry-housingFundBase" className={INPUT} placeholder="留空同社保基数" value={form.housingFundBase} onChange={(e) => handleChange("housingFundBase", e.target.value)} />
            </label>
          </div>
        </div>

        <div className={SECTION}>
          <h2 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">扣除与福利</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block" htmlFor="entry-specialDeductions">
              <span className={FORM_LABEL}>专项附加扣除</span>
              <input id="entry-specialDeductions" className={INPUT} placeholder="0" value={form.specialDeductions} onChange={(e) => handleChange("specialDeductions", e.target.value)} />
            </label>
            <label className="block" htmlFor="entry-mealSubsidy">
              <span className={FORM_LABEL}>餐补<span className={HELPER}>(300)</span></span>
              <input id="entry-mealSubsidy" className={INPUT} value={form.mealSubsidy} onChange={(e) => handleChange("mealSubsidy", e.target.value)} />
            </label>
            <label className="block" htmlFor="entry-housingSubsidy">
              <span className={FORM_LABEL}>人才公寓/住房补贴</span>
              <input id="entry-housingSubsidy" className={INPUT} placeholder="0" value={form.housingSubsidy} onChange={(e) => handleChange("housingSubsidy", e.target.value)} />
            </label>
            <label className="block" htmlFor="entry-yearEndBonusMonths">
              <span className={FORM_LABEL}>年终奖月数<span className={HELPER}>(默认2)</span></span>
              <input id="entry-yearEndBonusMonths" className={INPUT} value={form.yearEndBonusMonths} onChange={(e) => handleChange("yearEndBonusMonths", e.target.value)} />
            </label>
          </div>
        </div>
        <div className={SECTION}>
          <h2 className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">实发核对</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block" htmlFor="entry-actualNetIncome">
              <span className={FORM_LABEL}>
                当月实发工资
                <span className="text-[var(--color-rose)]"> *</span>
                <span className={HELPER}>(必填，实际银行到账金额)</span>
              </span>
              <input id="entry-actualNetIncome" className={INPUT} placeholder="" required value={form.actualNetIncome} onChange={(e) => handleChange("actualNetIncome", e.target.value)} />
            </label>
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" className={BTN}>保存并查看概览</button>
        </div>
      </form>
    </div>
  );
}
