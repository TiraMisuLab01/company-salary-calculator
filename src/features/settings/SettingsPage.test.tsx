import "fake-indexeddb/auto";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { saveStoredScenario } from "../../services/scenario-service";
import { PayrollDataProvider } from "../data/PayrollDataProvider";
import { ScenarioProvider } from "../data/ScenarioProvider";
import { SettingsPage } from "./SettingsPage";

describe("SettingsPage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("resets persisted scenario settings to defaults", async () => {
    const user = userEvent.setup();
    saveStoredScenario({
      salaryIncreaseRate: 20,
      housingFundRate: 12,
      specialDeductions: 2000,
    });

    render(
      <PayrollDataProvider>
        <ScenarioProvider>
          <SettingsPage />
        </ScenarioProvider>
      </PayrollDataProvider>,
    );

    expect(screen.getByText("20%")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "重置假设参数" }));

    expect(screen.getByText("0%")).toBeInTheDocument();
    expect(screen.getByText("10%")).toBeInTheDocument();
    expect(screen.getByText("0 元")).toBeInTheDocument();
  });
});
