import "fake-indexeddb/auto";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { appDb } from "../../db/app-db";
import { savePayrollRecord } from "../../services/payroll-record-service";
import { saveStoredScenario } from "../../services/scenario-service";
import { PayrollDataProvider } from "../data/PayrollDataProvider";
import { ScenarioProvider } from "../data/ScenarioProvider";
import { ComparePage } from "./ComparePage";

describe("ComparePage", () => {
  beforeEach(async () => {
    await appDb.delete();
    await appDb.open();
    window.localStorage.clear();
  });

  it("renders actual salary vs scenario comparison with difference analysis", async () => {
    await savePayrollRecord({
      month: "2026-05",
      baseSalary: "11308",
      performanceSalary: "4200",
      performancePrepayRate: "80",
      salesBonus: "0",
      q1Rating: "",
      q2Rating: "",
      q3Rating: "",
      q4Rating: "",
      quarterlyBase: "12600",
      departmentBonus: "0",
      patentBonus: "0",
      specialDeductions: "1500",
      socialPersonalRate: "10.3",
      socialEmployerRate: "25.8",
      housingFundPersonalRate: "10",
      housingFundEmployerRate: "10",
      socialFundBase: "",
      housingFundBase: "",
      yearEndBonusMonths: "2",
      mealSubsidy: "300",
      housingSubsidy: "0",
      actualNetIncome: "11500",
    });
    saveStoredScenario({
      salaryIncreaseRate: 20,
      housingFundRate: 12,
      specialDeductions: 2000,
    });

    render(
      <PayrollDataProvider>
        <ScenarioProvider>
          <ComparePage />
        </ScenarioProvider>
      </PayrollDataProvider>,
    );

    expect(screen.getByRole("heading", { name: "方案对比" })).toBeInTheDocument();
    expect(await screen.findByText("当月实发工资")).toBeInTheDocument();
    expect(screen.getByText("假设方案")).toBeInTheDocument();
    expect(screen.getByText("差异分析")).toBeInTheDocument();
    expect(screen.getByText("11500.00")).toBeInTheDocument();
    expect(screen.getByText("绝对差值")).toBeInTheDocument();
    expect(screen.getByText("百分比变化")).toBeInTheDocument();
    expect(screen.getByText("备注")).toBeInTheDocument();
    expect(screen.getByText("添加备注")).toBeInTheDocument();
  });

  it("shows placeholder when no actual salary recorded", async () => {
    await savePayrollRecord({
      month: "2026-05",
      baseSalary: "11308",
      performanceSalary: "4200",
      performancePrepayRate: "80",
      salesBonus: "0",
      q1Rating: "",
      q2Rating: "",
      q3Rating: "",
      q4Rating: "",
      quarterlyBase: "12600",
      departmentBonus: "0",
      patentBonus: "0",
      specialDeductions: "1500",
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
    });

    render(
      <PayrollDataProvider>
        <ScenarioProvider>
          <ComparePage />
        </ScenarioProvider>
      </PayrollDataProvider>,
    );

    expect(await screen.findByText("未录入当月实发工资")).toBeInTheDocument();
  });

  it("can add, edit and delete a note", async () => {
    const user = userEvent.setup();

    await savePayrollRecord({
      month: "2026-05",
      baseSalary: "11308",
      performanceSalary: "4200",
      performancePrepayRate: "80",
      salesBonus: "0",
      q1Rating: "",
      q2Rating: "",
      q3Rating: "",
      q4Rating: "",
      quarterlyBase: "12600",
      departmentBonus: "0",
      patentBonus: "0",
      specialDeductions: "1500",
      socialPersonalRate: "10.3",
      socialEmployerRate: "25.8",
      housingFundPersonalRate: "10",
      housingFundEmployerRate: "10",
      socialFundBase: "",
      housingFundBase: "",
      yearEndBonusMonths: "2",
      mealSubsidy: "300",
      housingSubsidy: "0",
      actualNetIncome: "11500",
    });

    render(
      <PayrollDataProvider>
        <ScenarioProvider>
          <ComparePage />
        </ScenarioProvider>
      </PayrollDataProvider>,
    );

    await user.click(await screen.findByText("添加备注"));

    const textarea = screen.getByPlaceholderText("输入差异分析说明…");
    await user.type(textarea, "测试备注内容");

    await user.click(screen.getByText("保存备注"));

    await screen.findAllByText("测试备注内容");
    expect(screen.getAllByText("测试备注内容").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("编辑备注")).toBeInTheDocument();
    expect(screen.getByText("历史备注记录")).toBeInTheDocument();
    expect(screen.getByText("导出 Excel")).toBeInTheDocument();

    await user.click(screen.getByText("编辑备注"));
    await user.click(screen.getAllByText("删除")[0]);

    expect(screen.queryByText("测试备注内容")).not.toBeInTheDocument();
  });
});
