import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SocialFundBreakdown } from "./SocialFundBreakdown";

describe("SocialFundBreakdown", () => {
  it("uses user-entered total insurance rates instead of hardcoded category splits", () => {
    render(
      <SocialFundBreakdown
        baseSalary="11308"
        performanceSalary="4200"
        salesBonus="0"
        departmentBonus="0"
        socialPersonalRate={10.3}
        socialEmployerRate={25.8}
        housingFundPersonalRate={10}
        housingFundEmployerRate={10}
        socialFundBase="15508"
        housingFundBase="15508"
      />,
    );

    expect(screen.getByText("五险合计")).toBeInTheDocument();
    expect(screen.getByText("4001.06")).toBeInTheDocument();
    expect(screen.getByText("1597.32")).toBeInTheDocument();
    expect(screen.getAllByText("1550.80")).toHaveLength(2);
    expect(screen.queryByText("养老")).not.toBeInTheDocument();
  });
});
