import "fake-indexeddb/auto";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PayrollDataProvider } from "../data/PayrollDataProvider";
import { ScenarioProvider } from "../data/ScenarioProvider";
import { DashboardPage } from "./DashboardPage";

describe("DashboardPage", () => {
  it("renders KPI cards, chart containers, social fund breakdown, detail table and comparison summary", () => {
    render(
      <PayrollDataProvider>
        <ScenarioProvider>
          <DashboardPage />
        </ScenarioProvider>
      </PayrollDataProvider>,
    );

    expect(screen.getByText("应发合计")).toBeInTheDocument();
    expect(screen.getAllByText("税后到手").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("递延绩效(月)")).toBeInTheDocument();
    expect(screen.getByTestId("salary-composition-chart")).toBeInTheDocument();
    expect(screen.getByTestId("history-trend-chart")).toBeInTheDocument();
    expect(screen.getByTestId("social-fund-breakdown")).toBeInTheDocument();
    expect(screen.getByTestId("detail-table")).toBeInTheDocument();
    expect(screen.getByText("月度明细")).toBeInTheDocument();
  });
});
