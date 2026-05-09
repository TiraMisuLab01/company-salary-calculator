import { appDb } from "../db/app-db";
import { calculateSalarySummary } from "../lib/payroll/calculate-salary-summary";
import { decryptJson, encryptJson } from "./crypto-service";
import type { PayrollRecord } from "../types/salary";

const DEFAULT_PROFILE_ID = "default-profile";
const LOCAL_STORAGE_PASSWORD = "salary-analytics-local";

export interface PayrollRecordInput {
  month: string;
  baseSalary: string;
  performanceSalary: string;
  bonus: string;
  subsidy: string;
  stockIncome: string;
  specialDeductions: string;
}

function buildPayrollRecord(input: PayrollRecordInput): PayrollRecord {
  const timestamp = new Date().toISOString();
  const socialFundBase = (
    Number(input.baseSalary) +
    Number(input.performanceSalary) +
    Number(input.bonus) +
    Number(input.subsidy) +
    Number(input.stockIncome)
  ).toFixed(2);
  const summary = calculateSalarySummary({
    ...input,
    socialFundBase,
    housingFundRate: "0.10",
    socialRates: {
      pension: "0.08",
      medical: "0.02",
      unemployment: "0.005",
    },
  });

  return {
    id: crypto.randomUUID(),
    month: input.month,
    baseSalary: input.baseSalary,
    performanceSalary: input.performanceSalary,
    bonus: input.bonus,
    subsidy: input.subsidy,
    stockIncome: input.stockIncome,
    specialDeductions: input.specialDeductions,
    grossIncome: summary.grossIncome,
    tax: summary.incomeTax,
    netIncome: summary.netIncome,
    personalSocialFundTotal: summary.personalSocialFundTotal,
    taxableIncome: summary.taxableIncome,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export async function savePayrollRecord(input: PayrollRecordInput) {
  const record = buildPayrollRecord(input);
  const encrypted = await encryptJson(record, LOCAL_STORAGE_PASSWORD);

  await appDb.transaction("rw", appDb.encryptedBlobs, appDb.payrollIndexes, async () => {
    await appDb.encryptedBlobs.put({
      id: record.id,
      scope: "payroll",
      profileId: DEFAULT_PROFILE_ID,
      payload: encrypted.ciphertext,
      iv: encrypted.iv,
      salt: encrypted.salt,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });

    await appDb.payrollIndexes.put({
      id: record.id,
      profileId: DEFAULT_PROFILE_ID,
      month: record.month,
    });
  });

  return record;
}

export async function listPayrollRecords() {
  const indexes = await appDb.payrollIndexes.orderBy("month").reverse().toArray();

  return Promise.all(
    indexes.map(async (index) => {
      const blob = await appDb.encryptedBlobs.get(index.id);
      if (!blob) {
        throw new Error(`缺少工资记录密文: ${index.id}`);
      }

      return decryptJson<PayrollRecord>(
        {
          ciphertext: blob.payload,
          iv: blob.iv,
          salt: blob.salt,
        },
        LOCAL_STORAGE_PASSWORD,
      );
    }),
  );
}
