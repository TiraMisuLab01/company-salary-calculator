import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DashboardPage } from "./DashboardPage";

describe("DashboardPage", () => {
  it("renders KPI cards and chart containers", () => {
    render(<DashboardPage />);

    expect(screen.getByText("税前总额")).toBeInTheDocument();
    expect(screen.getByText("税后到手")).toBeInTheDocument();
    expect(screen.getByTestId("salary-composition-chart")).toBeInTheDocument();
    expect(screen.getByTestId("history-trend-chart")).toBeInTheDocument();
  });
});
