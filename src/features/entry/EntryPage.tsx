import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePayrollData } from "../data/PayrollDataProvider";

const initialForm = {
  month: "",
  baseSalary: "",
  performanceSalary: "",
  bonus: "0",
  subsidy: "0",
  stockIncome: "0",
  specialDeductions: "0",
};

export function EntryPage() {
  const navigate = useNavigate();
  const { addPayrollRecord } = usePayrollData();
  const [form, setForm] = useState(initialForm);

  const handleChange = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addPayrollRecord(form);
    navigate("/");
  };

  return (
    <div className="px-6 py-6">
      <h1 className="text-2xl font-bold">薪资录入</h1>
      <p className="mt-2 text-slate-300">在这里录入月度工资、奖金、补贴和专项附加扣除。</p>
      <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <label className="block text-sm" htmlFor="month">
          <span className="mb-1 block text-slate-300">月份</span>
          <input
            id="month"
            name="month"
            className="w-full rounded bg-slate-800 px-3 py-2"
            value={form.month}
            onChange={(event) => handleChange("month", event.target.value)}
          />
        </label>
        <label className="block text-sm" htmlFor="baseSalary">
          <span className="mb-1 block text-slate-300">基本工资</span>
          <input
            id="baseSalary"
            name="baseSalary"
            className="w-full rounded bg-slate-800 px-3 py-2"
            value={form.baseSalary}
            onChange={(event) => handleChange("baseSalary", event.target.value)}
          />
        </label>
        <label className="block text-sm" htmlFor="performanceSalary">
          <span className="mb-1 block text-slate-300">绩效工资</span>
          <input
            id="performanceSalary"
            name="performanceSalary"
            className="w-full rounded bg-slate-800 px-3 py-2"
            value={form.performanceSalary}
            onChange={(event) => handleChange("performanceSalary", event.target.value)}
          />
        </label>
        <label className="block text-sm" htmlFor="specialDeductions">
          <span className="mb-1 block text-slate-300">专项附加扣除</span>
          <input
            id="specialDeductions"
            name="specialDeductions"
            className="w-full rounded bg-slate-800 px-3 py-2"
            value={form.specialDeductions}
            onChange={(event) => handleChange("specialDeductions", event.target.value)}
          />
        </label>
        <label className="block text-sm" htmlFor="bonus">
          <span className="mb-1 block text-slate-300">奖金</span>
          <input
            id="bonus"
            name="bonus"
            className="w-full rounded bg-slate-800 px-3 py-2"
            value={form.bonus}
            onChange={(event) => handleChange("bonus", event.target.value)}
          />
        </label>
        <label className="block text-sm" htmlFor="subsidy">
          <span className="mb-1 block text-slate-300">补贴</span>
          <input
            id="subsidy"
            name="subsidy"
            className="w-full rounded bg-slate-800 px-3 py-2"
            value={form.subsidy}
            onChange={(event) => handleChange("subsidy", event.target.value)}
          />
        </label>
        <label className="block text-sm" htmlFor="stockIncome">
          <span className="mb-1 block text-slate-300">股票/期权</span>
          <input
            id="stockIncome"
            name="stockIncome"
            className="w-full rounded bg-slate-800 px-3 py-2"
            value={form.stockIncome}
            onChange={(event) => handleChange("stockIncome", event.target.value)}
          />
        </label>
        <div className="flex items-end">
          <button type="submit" className="rounded bg-sky-500 px-4 py-2 font-medium text-slate-950">
            保存并查看概览
          </button>
        </div>
      </form>
    </div>
  );
}
