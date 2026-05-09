import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ComparePage } from "./ComparePage";

describe("ComparePage", () => {
  it("renders baseline and candidate scenarios", () => {
    render(<ComparePage />);

    expect(screen.getByRole("heading", { name: "方案对比" })).toBeInTheDocument();
    expect(screen.getByText("基准方案")).toBeInTheDocument();
    expect(screen.getByText("调薪 10%")).toBeInTheDocument();
  });
});
