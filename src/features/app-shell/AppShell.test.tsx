import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppShell } from "./AppShell";

describe("AppShell", () => {
  it("renders the salary analytics navigation", () => {
    render(<AppShell />);

    expect(screen.getByRole("heading", { name: "薪资分析可视化应用" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "概览仪表盘" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "薪资录入" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Excel 导入" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "方案对比" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "设置" })).toBeInTheDocument();
  });
});
