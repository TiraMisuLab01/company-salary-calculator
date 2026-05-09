import "fake-indexeddb/auto";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { appDb } from "../../db/app-db";
import App from "../../App";

describe("Entry to dashboard flow", () => {
  beforeEach(async () => {
    await appDb.delete();
    await appDb.open();
    window.history.pushState({}, "", "/entry");
  });

  it("persists a submitted payroll record and shows it on the dashboard", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(screen.getByLabelText("月份"), "2026-05");
    await user.type(screen.getByLabelText("基本工资"), "11308");
    await user.type(screen.getByLabelText("绩效工资"), "4200");
    await user.type(screen.getByLabelText("专项附加扣除"), "1500");
    await user.click(screen.getByRole("button", { name: "保存并查看概览" }));

    expect(await screen.findByText("15508.00")).toBeInTheDocument();
    expect(screen.getByText("11955.97")).toBeInTheDocument();
  });
});
