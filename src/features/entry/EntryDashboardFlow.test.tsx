import "fake-indexeddb/auto";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { appDb } from "../../db/app-db";
import App from "../../App";

const FLOW_TIMEOUT = 12000;

describe("Entry to dashboard flow", () => {
  beforeEach(async () => {
    await appDb.delete();
    await appDb.open();
    window.localStorage.clear();
    window.location.hash = "#/entry";
  });

  it("persists a lantu payroll record and shows it on the dashboard", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText("月份"), "2026-05");
    await user.clear(screen.getByLabelText(/固定薪资/));
    await user.type(screen.getByLabelText(/固定薪资/), "11308");
    await user.clear(screen.getByLabelText(/绩效薪资\(全额\)/));
    await user.type(screen.getByLabelText(/绩效薪资\(全额\)/), "4200");

    const specialDeductionInput = document.getElementById("entry-specialDeductions") as HTMLInputElement;
    await user.clear(specialDeductionInput);
    await user.type(specialDeductionInput, "1500");

    const actualNetInput = document.getElementById("entry-actualNetIncome") as HTMLInputElement;
    await user.clear(actualNetInput);
    await user.type(actualNetInput, "11955.97");

    await user.click(screen.getByRole("button", { name: "保存并查看概览" }));

    await waitFor(() => {
      expect(screen.queryAllByText("14968.00").length).toBeGreaterThanOrEqual(1);
    }, { timeout: FLOW_TIMEOUT });
  }, FLOW_TIMEOUT + 3000);

  it("recalculates dashboard values from scenario inputs and restores them after remount", async () => {
    const user = userEvent.setup();
    const firstRender = render(<App />);

    await user.type(screen.getByLabelText("月份"), "2026-05");
    await user.clear(screen.getByLabelText(/固定薪资/));
    await user.type(screen.getByLabelText(/固定薪资/), "11308");
    await user.clear(screen.getByLabelText(/绩效薪资\(全额\)/));
    await user.type(screen.getByLabelText(/绩效薪资\(全额\)/), "4200");

    const specialDeductionInput = document.getElementById("entry-specialDeductions") as HTMLInputElement;
    await user.clear(specialDeductionInput);
    await user.type(specialDeductionInput, "1500");

    const actualNetInput = document.getElementById("entry-actualNetIncome") as HTMLInputElement;
    await user.clear(actualNetInput);
    await user.type(actualNetInput, "11955.97");

    await user.click(screen.getByRole("button", { name: "保存并查看概览" }));

    const salaryIncreaseRateInput = await screen.findByLabelText("调薪幅度 (%)");
    await user.clear(salaryIncreaseRateInput);
    await user.type(salaryIncreaseRateInput, "20");

    const housingFundRateInput = screen.getByLabelText("公积金比例 (%)");
    await user.clear(housingFundRateInput);
    await user.type(housingFundRateInput, "12");

    const scenarioSpecialDeductionInput = document.getElementById("scenario-special-deductions") as HTMLInputElement;
    await user.clear(scenarioSpecialDeductionInput);
    await user.type(scenarioSpecialDeductionInput, "2000");

    await waitFor(() => {
      expect(screen.queryAllByText("17901.60").length).toBeGreaterThanOrEqual(1);
    }, { timeout: FLOW_TIMEOUT });

    firstRender.unmount();
    window.location.hash = "#/dashboard";
    render(<App />);

    expect(await screen.findByDisplayValue("20")).toBeInTheDocument();
    expect(screen.getByDisplayValue("12")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2000")).toBeInTheDocument();
  }, FLOW_TIMEOUT + 3000);
});
