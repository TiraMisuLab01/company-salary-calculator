import { expect, test } from "@playwright/test";

test("dashboard and compare page are reachable", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "薪资分析可视化应用" })).toBeVisible();
  await page.getByRole("link", { name: "方案对比" }).click();
  await expect(page.getByRole("heading", { name: "方案对比" })).toBeVisible();
});
