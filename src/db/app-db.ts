import Dexie, { type Table } from "dexie";
import type { Profile } from "../types/salary";

export interface EncryptedBlob {
  id: string;
  scope: "profile" | "payroll" | "scenario";
  profileId: string;
  payload: string;
  iv: string;
  salt: string;
  createdAt: string;
  updatedAt: string;
}

export class SalaryAnalyticsDb extends Dexie {
  profiles!: Table<Profile, string>;
  encryptedBlobs!: Table<EncryptedBlob, string>;
  payrollIndexes!: Table<{ id: string; profileId: string; month: string }, string>;

  constructor() {
    super("salary-analytics-db");

    this.version(1).stores({
      profiles: "id, updatedAt",
      encryptedBlobs: "id, profileId, scope, updatedAt",
      payrollIndexes: "id, profileId, month",
    });
  }
}

export const appDb = new SalaryAnalyticsDb();
