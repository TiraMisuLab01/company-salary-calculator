export const MONTHLY_TAX_THRESHOLD = 5000;

export const MONTHLY_TAX_BRACKETS = [
  { upTo: 3000, rate: 0.03, quickDeduction: 0 },
  { upTo: 12000, rate: 0.1, quickDeduction: 210 },
  { upTo: 25000, rate: 0.2, quickDeduction: 1410 },
  { upTo: 35000, rate: 0.25, quickDeduction: 2660 },
  { upTo: 55000, rate: 0.3, quickDeduction: 4410 },
  { upTo: 80000, rate: 0.35, quickDeduction: 7160 },
  { upTo: Infinity, rate: 0.45, quickDeduction: 15160 },
] as const;
