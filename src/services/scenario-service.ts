export interface ScenarioSettings {
  salaryIncreaseRate: number;
  housingFundRate: number;
  specialDeductions: number;
}

const SCENARIO_STORAGE_KEY = "salary-analytics-current-scenario";

export const DEFAULT_SCENARIO_SETTINGS: ScenarioSettings = {
  salaryIncreaseRate: 0,
  housingFundRate: 10,
  specialDeductions: 0,
};

function normalizeNumber(value: unknown, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function getStoredScenario(): ScenarioSettings {
  const rawValue = window.localStorage.getItem(SCENARIO_STORAGE_KEY);

  if (!rawValue) {
    return { ...DEFAULT_SCENARIO_SETTINGS };
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<ScenarioSettings>;

    return {
      salaryIncreaseRate: normalizeNumber(parsed.salaryIncreaseRate, DEFAULT_SCENARIO_SETTINGS.salaryIncreaseRate),
      housingFundRate: normalizeNumber(parsed.housingFundRate, DEFAULT_SCENARIO_SETTINGS.housingFundRate),
      specialDeductions: normalizeNumber(parsed.specialDeductions, DEFAULT_SCENARIO_SETTINGS.specialDeductions),
    };
  } catch {
    return { ...DEFAULT_SCENARIO_SETTINGS };
  }
}

export function saveStoredScenario(settings: ScenarioSettings) {
  window.localStorage.setItem(SCENARIO_STORAGE_KEY, JSON.stringify(settings));
}

export function hasStoredScenario() {
  return window.localStorage.getItem(SCENARIO_STORAGE_KEY) !== null;
}
