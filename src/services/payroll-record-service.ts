import { appDb } from "../db/app-db";
import { calculateLantuSalary } from "../lib/payroll/calculate-lantu-salary";
import { decryptJson, encryptJson } from "./crypto-service";
import type { PayrollRecord, QuarterlyRating } from "../types/salary";

const DEFAULT_PROFILE_ID = "default-profile";
const LOCAL_STORAGE_PASSWORD = "salary-analytics-local";

export interface PayrollRecordInput {
  month: string;
  baseSalary: string;
  performanceSalary: string;
  performancePrepayRate: string;
  salesBonus: string;
  q1Rating: QuarterlyRating;
  q2Rating: QuarterlyRating;
  q3Rating: QuarterlyRating;
  q4Rating: QuarterlyRating;
  quarterlyBase: string;
  departmentBonus: string;
  patentBonus: string;
  specialDeductions: string;
  socialPersonalRate: string;
  socialEmployerRate: string;
  housingFundPersonalRate: string;
  housingFundEmployerRate: string;
  socialFundBase: string;
  housingFundBase: string;
  yearEndBonusMonths: string;
  mealSubsidy: string;
  housingSubsidy: string;
  actualNetIncome: string;
}

function buildPayrollRecord(input: PayrollRecordInput): PayrollRecord {
  const timestamp = new Date().toISOString();
  const summary = calculateLantuSalary(input);

  return {
    id: crypto.randomUUID(),
    month: input.month,
    baseSalary: input.baseSalary || "0",
    performanceSalary: input.performanceSalary || "0",
    performancePrepayRate: input.performancePrepayRate || "80",
    salesBonus: input.salesBonus || "0",
    q1Rating: input.q1Rating || "",
    q2Rating: input.q2Rating || "",
    q3Rating: input.q3Rating || "",
    q4Rating: input.q4Rating || "",
    quarterlyBase: input.quarterlyBase || "0",
    departmentBonus: input.departmentBonus || "0",
    patentBonus: input.patentBonus || "0",
    specialDeductions: input.specialDeductions || "0",
    socialPersonalRate: input.socialPersonalRate || "0",
    socialEmployerRate: input.socialEmployerRate || "0",
    housingFundPersonalRate: input.housingFundPersonalRate || "0",
    housingFundEmployerRate: input.housingFundEmployerRate || "0",
    socialFundBase: input.socialFundBase || "",
    housingFundBase: input.housingFundBase || "",
    yearEndBonusMonths: input.yearEndBonusMonths || "0",
    mealSubsidy: input.mealSubsidy || "0",
    housingSubsidy: input.housingSubsidy || "0",
    grossIncome: summary.grossIncome,
    tax: summary.incomeTax,
    netIncome: summary.netIncome,
    personalSocialFundTotal: summary.personalSocialFundTotal,
    employerContribution: summary.employerContribution,
    deferredPerformance: summary.deferredPerformance,
    quarterlyIncentive: summary.quarterlyIncentive,
    taxableIncome: summary.taxableIncome,
    actualNetIncome: input.actualNetIncome || "",
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

export async function deletePayrollRecord(id: string) {
  await appDb.transaction("rw", appDb.encryptedBlobs, appDb.payrollIndexes, async () => {
    await appDb.encryptedBlobs.delete(id);
    await appDb.payrollIndexes.delete(id);
  });
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
