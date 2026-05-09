import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

vi.mock("echarts-for-react", () => ({
  default: (props: { ["data-testid"]?: string }) =>
    React.createElement("div", { "data-testid": props["data-testid"] ?? "mock-echart" }),
}));
