import { beforeEach, describe, expect, it } from "vitest";
import { getStoredScenario, saveStoredScenario } from "./scenario-service";

describe("scenario-service", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns defaults when no persisted scenario exists", () => {
    expect(getStoredScenario()).toEqual({
      salaryIncreaseRate: 0,
      housingFundRate: 10,
      specialDeductions: 0,
    });
  });

  it("persists the current scenario for a later refresh", () => {
    saveStoredScenario({
      salaryIncreaseRate: 20,
      housingFundRate: 12,
      specialDeductions: 2000,
    });

    expect(getStoredScenario()).toEqual({
      salaryIncreaseRate: 20,
      housingFundRate: 12,
      specialDeductions: 2000,
    });
  });
});
