export interface Scenario {
  id: string;
  name: string;
  salaryIncreaseRate: number;
  housingFundRate: number;
  specialDeductions: number;
}

export function createScenario(input: Scenario) {
  return input;
}
