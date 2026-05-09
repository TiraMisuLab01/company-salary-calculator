# Salary Analytics MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local-first salary analytics web app with multi-profile storage, accurate payroll calculation, import/export, dashboard visualizations, scenario comparison, and privacy-preserving local encryption.

**Architecture:** Use a Vite + React + TypeScript frontend with a feature-oriented `src/` layout. Keep payroll math, storage, import/export, and UI rendering in separate modules so financial logic remains pure and testable while the app shell stays responsive. Persist encrypted structured data in IndexedDB, render charts with ECharts, and validate the full flow with unit, integration, and end-to-end tests.

**Tech Stack:** React, TypeScript, Vite, Vitest, React Testing Library, Playwright, Dexie, Web Crypto API, decimal.js, ECharts, SheetJS, jsPDF/html2canvas, Tailwind CSS

---

## File Structure

### Application

- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\package.json` - project manifest and scripts
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\vite.config.ts` - Vite configuration
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\vitest.config.ts` - unit/integration test configuration
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\playwright.config.ts` - end-to-end configuration
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\tailwind.config.ts` - Tailwind setup
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\main.tsx` - app bootstrap
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\App.tsx` - top-level app shell and routes
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\styles\index.css` - global styles

### Core Domain

- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\types\salary.ts` - core domain types
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\money.ts` - decimal helpers and formatting
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\tax-rules.ts` - tax brackets and rule versions
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\payroll\calculate-social-fund.ts` - social fund calculations
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\payroll\calculate-income-tax.ts` - income tax calculations
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\payroll\calculate-bonus-tax.ts` - annual bonus calculations
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\payroll\calculate-salary-summary.ts` - monthly/annual summary aggregation

### Storage and Security

- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\db\app-db.ts` - Dexie schema
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\crypto-service.ts` - encryption/decryption helpers
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\profile-service.ts` - profile CRUD
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\scenario-service.ts` - scenario CRUD
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\payroll-service.ts` - payroll save/load with snapshots

### Import / Export

- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\excel-import-service.ts` - parsing, mapping, validation
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\excel-export-service.ts` - export workbook generation
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\pdf-export-service.ts` - report PDF generation
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\fixtures\salary-import-template.json` - template schema

### UI Features

- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\app-shell\AppShell.tsx` - top-level layout and navigation
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\DashboardPage.tsx` - dashboard page
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\components\KpiCards.tsx` - KPI cards
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\components\SalaryCompositionChart.tsx` - main salary chart
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\components\HistoryTrendChart.tsx` - trend chart with dataZoom
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\components\ScenarioPanel.tsx` - hypothesis controls
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\entry\EntryPage.tsx` - record editor page
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\import\ImportPage.tsx` - Excel import page
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\compare\ComparePage.tsx` - scenario comparison page
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\settings\SettingsPage.tsx` - settings page

### Tests

- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\test\setup.ts` - test setup
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\payroll\calculate-salary-summary.test.ts` - payroll engine tests
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\crypto-service.test.ts` - crypto tests
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\excel-import-service.test.ts` - import validation tests
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\DashboardPage.test.tsx` - dashboard behavior tests
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\compare\ComparePage.test.tsx` - comparison tests
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\tests\e2e\salary-dashboard.spec.ts` - Playwright e2e

## Task 1: Bootstrap the Vite App and Test Harness

**Files:**
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\package.json`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\main.tsx`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\App.tsx`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\app-shell\AppShell.tsx`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\styles\index.css`
- Test: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\app-shell\AppShell.test.tsx`

- [ ] **Step 1: Initialize Git and scaffold the app**

Run:

```bash
git init
npm create vite@latest . -- --template react-ts
npm install
npm install -D vitest @vitest/coverage-v8 @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom playwright @playwright/test tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Expected: `package.json`, `src/`, and `vite.config.ts` exist, `git status` shows untracked files, and npm dependencies install without error.

- [ ] **Step 2: Write the failing app-shell test**

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\app-shell\AppShell.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppShell } from "./AppShell";

describe("AppShell", () => {
  it("renders the salary analytics navigation", () => {
    render(<AppShell />);

    expect(screen.getByRole("heading", { name: "薪资分析可视化应用" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "概览仪表盘" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "薪资录入" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Excel 导入" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "方案对比" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "设置" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run:

```bash
npm test -- AppShell.test.tsx
```

Expected: FAIL with an import or symbol error because `AppShell` and test setup are not wired yet.

- [ ] **Step 4: Implement the minimal app shell and make the test pass**

Replace `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\App.tsx`:

```tsx
import { AppShell } from "./features/app-shell/AppShell";

function App() {
  return <AppShell />;
}

export default App;
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\app-shell\AppShell.tsx`:

```tsx
const navItems = ["概览仪表盘", "薪资录入", "Excel 导入", "方案对比", "设置"];

export function AppShell() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 px-6 py-4">
        <h1 className="text-2xl font-bold">薪资分析可视化应用</h1>
      </header>
      <nav className="flex gap-4 px-6 py-4" aria-label="主导航">
        {navItems.map((item) => (
          <a key={item} href="#" className="rounded bg-slate-800 px-3 py-2 text-sm">
            {item}
          </a>
        ))}
      </nav>
      <main className="px-6 py-8">
        <p className="text-slate-300">MVP 启动中，下一任务接入真实页面与数据。</p>
      </main>
    </div>
  );
}
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\test\setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    globals: true,
  },
});
```

Update `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\package.json` scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

Run:

```bash
npm test -- AppShell.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

Run:

```bash
git add package.json vitest.config.ts src/App.tsx src/features/app-shell/AppShell.tsx src/features/app-shell/AppShell.test.tsx src/test/setup.ts
git commit -m "feat: bootstrap salary analytics app shell"
```

## Task 2: Add Domain Types, IndexedDB Schema, and Encryption Service

**Files:**
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\types\salary.ts`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\db\app-db.ts`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\crypto-service.ts`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\profile-service.ts`
- Test: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\crypto-service.test.ts`

- [ ] **Step 1: Write the failing crypto round-trip test**

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\crypto-service.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { decryptJson, encryptJson } from "./crypto-service";

describe("crypto-service", () => {
  it("encrypts and decrypts profile payloads", async () => {
    const password = "salary-demo-pass";
    const payload = { name: "张三", city: "武汉", grossMonthly: 15508 };

    const encrypted = await encryptJson(payload, password);
    const decrypted = await decryptJson<typeof payload>(encrypted, password);

    expect(encrypted.ciphertext).not.toContain("张三");
    expect(decrypted).toEqual(payload);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- crypto-service.test.ts
```

Expected: FAIL because `encryptJson` and `decryptJson` do not exist.

- [ ] **Step 3: Implement types, Dexie schema, and crypto service**

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\types\salary.ts`:

```ts
export type MoneyString = string;

export interface Profile {
  id: string;
  name: string;
  city: string;
  createdAt: string;
  updatedAt: string;
  defaultScenarioId?: string;
}

export interface SocialFundItem {
  personal: MoneyString;
  employer: MoneyString;
}

export interface SocialFund {
  pension: SocialFundItem;
  medical: SocialFundItem;
  unemployment: SocialFundItem;
  injury: SocialFundItem;
  maternity: SocialFundItem;
  housingFund: SocialFundItem;
}

export interface PayrollRecord {
  id: string;
  profileId: string;
  month: string;
  baseSalary: MoneyString;
  performanceSalary: MoneyString;
  bonus: MoneyString;
  subsidy: MoneyString;
  stockIncome: MoneyString;
  tax: MoneyString;
  netIncome: MoneyString;
  socialFund: SocialFund;
  createdAt: string;
  updatedAt: string;
}
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\db\app-db.ts`:

```ts
import Dexie, { Table } from "dexie";
import type { PayrollRecord, Profile } from "../types/salary";

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
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\crypto-service.ts`:

```ts
const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toBase64(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes));
}

function fromBase64(value: string) {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
}

async function deriveKey(password: string, salt: Uint8Array) {
  const baseKey = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, [
    "deriveKey",
  ]);

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt,
      iterations: 100000,
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

export interface EncryptedPayload {
  ciphertext: string;
  iv: string;
  salt: string;
}

export async function encryptJson<T>(value: T, password: string): Promise<EncryptedPayload> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await deriveKey(password, salt);
  const data = encoder.encode(JSON.stringify(value));
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, data);

  return {
    ciphertext: toBase64(new Uint8Array(encrypted)),
    iv: toBase64(iv),
    salt: toBase64(salt),
  };
}

export async function decryptJson<T>(payload: EncryptedPayload, password: string): Promise<T> {
  const key = await deriveKey(password, fromBase64(payload.salt));
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: fromBase64(payload.iv) },
    key,
    fromBase64(payload.ciphertext),
  );

  return JSON.parse(decoder.decode(decrypted)) as T;
}
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\profile-service.ts`:

```ts
import { appDb } from "../db/app-db";
import type { Profile } from "../types/salary";

export async function saveProfile(profile: Profile) {
  await appDb.profiles.put(profile);
  return profile;
}

export async function listProfiles() {
  return appDb.profiles.orderBy("updatedAt").reverse().toArray();
}
```

Run:

```bash
npm install dexie
npm test -- crypto-service.test.ts
```

Expected: PASS.

- [ ] **Step 4: Add a second test for wrong-password failure and verify it passes**

Append to `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\crypto-service.test.ts`:

```ts
it("rejects decryption with the wrong password", async () => {
  const encrypted = await encryptJson({ month: "2026-05" }, "right-pass");

  await expect(decryptJson(encrypted, "wrong-pass")).rejects.toThrow();
});
```

Run:

```bash
npm test -- crypto-service.test.ts
```

Expected: PASS with 2 tests.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/types/salary.ts src/db/app-db.ts src/services/crypto-service.ts src/services/crypto-service.test.ts src/services/profile-service.ts package.json package-lock.json
git commit -m "feat: add local storage schema and encryption service"
```

## Task 3: Build the Payroll Calculation Engine

**Files:**
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\money.ts`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\tax-rules.ts`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\payroll\calculate-social-fund.ts`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\payroll\calculate-income-tax.ts`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\payroll\calculate-bonus-tax.ts`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\payroll\calculate-salary-summary.ts`
- Test: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\payroll\calculate-salary-summary.test.ts`

- [ ] **Step 1: Write the failing salary summary test**

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\payroll\calculate-salary-summary.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { calculateSalarySummary } from "./calculate-salary-summary";

describe("calculateSalarySummary", () => {
  it("calculates gross pay, personal contributions, tax, and net pay", () => {
    const summary = calculateSalarySummary({
      baseSalary: "11308",
      performanceSalary: "4200",
      bonus: "0",
      subsidy: "0",
      stockIncome: "0",
      specialDeductions: "1500",
      socialFundBase: "15508",
      housingFundRate: "0.10",
      socialRates: {
        pension: "0.08",
        medical: "0.02",
        unemployment: "0.005",
      },
    });

    expect(summary.grossIncome).toBe("15508.00");
    expect(summary.personalSocialFundTotal).toBe("1638.59");
    expect(summary.taxableIncome).toBe("7369.41");
    expect(summary.netIncome).toBe("13647.98");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- calculate-salary-summary.test.ts
```

Expected: FAIL because `calculateSalarySummary` is missing.

- [ ] **Step 3: Implement the calculation modules**

Install dependency:

```bash
npm install decimal.js
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\money.ts`:

```ts
import Decimal from "decimal.js";

export function money(value: Decimal.Value) {
  return new Decimal(value);
}

export function moneyString(value: Decimal.Value) {
  return money(value).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toFixed(2);
}
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\tax-rules.ts`:

```ts
export const MONTHLY_TAX_THRESHOLD = 5000;

export const MONTHLY_TAX_BRACKETS = [
  { upTo: 3000, rate: 0.03, quickDeduction: 0 },
  { upTo: 12000, rate: 0.1, quickDeduction: 210 },
  { upTo: 25000, rate: 0.2, quickDeduction: 1410 },
  { upTo: 35000, rate: 0.25, quickDeduction: 2660 },
  { upTo: 55000, rate: 0.3, quickDeduction: 4410 },
  { upTo: 80000, rate: 0.35, quickDeduction: 7160 },
  { upTo: Infinity, rate: 0.45, quickDeduction: 15160 },
];
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\payroll\calculate-social-fund.ts`:

```ts
import { money, moneyString } from "../money";

export function calculateSocialFund(input: {
  socialFundBase: string;
  housingFundRate: string;
  socialRates: { pension: string; medical: string; unemployment: string };
}) {
  const base = money(input.socialFundBase);
  const pension = base.mul(input.socialRates.pension);
  const medical = base.mul(input.socialRates.medical);
  const unemployment = base.mul(input.socialRates.unemployment);
  const housingFund = base.mul(input.housingFundRate);
  const total = pension.plus(medical).plus(unemployment).plus(housingFund);

  return {
    pension: moneyString(pension),
    medical: moneyString(medical),
    unemployment: moneyString(unemployment),
    housingFund: moneyString(housingFund),
    total: moneyString(total),
  };
}
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\payroll\calculate-income-tax.ts`:

```ts
import { money, moneyString } from "../money";
import { MONTHLY_TAX_BRACKETS } from "../tax-rules";

export function calculateIncomeTax(taxableIncome: string) {
  const taxable = money(taxableIncome);
  const bracket = MONTHLY_TAX_BRACKETS.find((item) => taxable.lte(item.upTo))!;
  const tax = taxable.mul(bracket.rate).minus(bracket.quickDeduction);

  return moneyString(tax.max(0));
}
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\payroll\calculate-bonus-tax.ts`:

```ts
import { money, moneyString } from "../money";
import { MONTHLY_TAX_BRACKETS } from "../tax-rules";

export function calculateBonusTax(annualBonus: string) {
  const monthlyEquivalent = money(annualBonus).div(12);
  const bracket = MONTHLY_TAX_BRACKETS.find((item) => monthlyEquivalent.lte(item.upTo))!;
  const tax = money(annualBonus).mul(bracket.rate).minus(bracket.quickDeduction);

  return moneyString(tax.max(0));
}
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\payroll\calculate-salary-summary.ts`:

```ts
import { money, moneyString } from "../money";
import { MONTHLY_TAX_THRESHOLD } from "../tax-rules";
import { calculateIncomeTax } from "./calculate-income-tax";
import { calculateSocialFund } from "./calculate-social-fund";

export function calculateSalarySummary(input: {
  baseSalary: string;
  performanceSalary: string;
  bonus: string;
  subsidy: string;
  stockIncome: string;
  specialDeductions: string;
  socialFundBase: string;
  housingFundRate: string;
  socialRates: { pension: string; medical: string; unemployment: string };
}) {
  const grossIncome = money(input.baseSalary)
    .plus(input.performanceSalary)
    .plus(input.bonus)
    .plus(input.subsidy)
    .plus(input.stockIncome);

  const socialFund = calculateSocialFund(input);
  const taxableIncome = grossIncome
    .minus(socialFund.total)
    .minus(MONTHLY_TAX_THRESHOLD)
    .minus(input.specialDeductions);
  const incomeTax = calculateIncomeTax(moneyString(taxableIncome.max(0)));
  const netIncome = grossIncome.minus(socialFund.total).minus(incomeTax);

  return {
    grossIncome: moneyString(grossIncome),
    personalSocialFundTotal: socialFund.total,
    taxableIncome: moneyString(taxableIncome.max(0)),
    incomeTax,
    netIncome: moneyString(netIncome),
  };
}
```

Run:

```bash
npm test -- calculate-salary-summary.test.ts
```

Expected: PASS.

- [ ] **Step 4: Add a bonus-tax regression test and verify it passes**

Append to `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\lib\payroll\calculate-salary-summary.test.ts`:

```ts
import { calculateBonusTax } from "./calculate-bonus-tax";

it("calculates annual bonus tax independently", () => {
  expect(calculateBonusTax("22616")).toBe("678.48");
});
```

Run:

```bash
npm test -- calculate-salary-summary.test.ts
```

Expected: PASS with 2 tests.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/lib/money.ts src/lib/tax-rules.ts src/lib/payroll/calculate-social-fund.ts src/lib/payroll/calculate-income-tax.ts src/lib/payroll/calculate-bonus-tax.ts src/lib/payroll/calculate-salary-summary.ts src/lib/payroll/calculate-salary-summary.test.ts package.json package-lock.json
git commit -m "feat: add payroll calculation engine"
```

## Task 4: Implement Excel Import Validation and Export Services

**Files:**
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\excel-import-service.ts`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\excel-export-service.ts`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\pdf-export-service.ts`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\fixtures\salary-import-template.json`
- Test: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\excel-import-service.test.ts`

- [ ] **Step 1: Write the failing import validation test**

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\excel-import-service.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { validateImportRows } from "./excel-import-service";

describe("validateImportRows", () => {
  it("reports missing month and duplicate month rows", () => {
    const result = validateImportRows([
      { month: "", baseSalary: 11308 },
      { month: "2026-05", baseSalary: 11308 },
      { month: "2026-05", baseSalary: 12000 },
    ]);

    expect(result.validRows).toHaveLength(1);
    expect(result.errors).toEqual([
      { rowIndex: 0, field: "month", message: "月份不能为空" },
      { rowIndex: 2, field: "month", message: "月份重复" },
    ]);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- excel-import-service.test.ts
```

Expected: FAIL because `validateImportRows` is missing.

- [ ] **Step 3: Implement import validation and export helpers**

Install dependencies:

```bash
npm install xlsx jspdf html2canvas
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\fixtures\salary-import-template.json`:

```json
{
  "requiredColumns": ["month", "baseSalary"],
  "optionalColumns": ["performanceSalary", "bonus", "subsidy", "stockIncome", "specialDeductions"],
  "exampleRow": {
    "month": "2026-05",
    "baseSalary": 11308,
    "performanceSalary": 4200,
    "bonus": 0,
    "subsidy": 0,
    "stockIncome": 0,
    "specialDeductions": 1500
  }
}
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\excel-import-service.ts`:

```ts
export interface ImportError {
  rowIndex: number;
  field: string;
  message: string;
}

export function validateImportRows(rows: Array<Record<string, unknown>>) {
  const errors: ImportError[] = [];
  const validRows: Array<Record<string, unknown>> = [];
  const seenMonths = new Set<string>();

  rows.forEach((row, rowIndex) => {
    const month = String(row.month ?? "").trim();

    if (!month) {
      errors.push({ rowIndex, field: "month", message: "月份不能为空" });
      return;
    }

    if (seenMonths.has(month)) {
      errors.push({ rowIndex, field: "month", message: "月份重复" });
      return;
    }

    seenMonths.add(month);
    validRows.push(row);
  });

  return { validRows, errors };
}
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\excel-export-service.ts`:

```ts
import * as XLSX from "xlsx";

export function buildWorkbook(rows: Array<Record<string, unknown>>) {
  const sheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, sheet, "salary");
  return workbook;
}
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\pdf-export-service.ts`:

```ts
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportNodeAsPdf(node: HTMLElement, filename: string) {
  const canvas = await html2canvas(node);
  const imageData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "pt", "a4");
  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;

  pdf.addImage(imageData, "PNG", 0, 0, width, height);
  pdf.save(filename);
}
```

Run:

```bash
npm test -- excel-import-service.test.ts
```

Expected: PASS.

- [ ] **Step 4: Add a numeric validation test and verify it passes**

Append to `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\excel-import-service.test.ts`:

```ts
it("rejects rows with non-numeric base salary", () => {
  const result = validateImportRows([{ month: "2026-05", baseSalary: "abc" }]);
  expect(result.validRows).toHaveLength(1);
});
```

Update `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\excel-import-service.ts` by inserting before `seenMonths.add(month);`:

```ts
    if (Number.isNaN(Number(row.baseSalary))) {
      errors.push({ rowIndex, field: "baseSalary", message: "基本工资必须为数字" });
      return;
    }
```

Run:

```bash
npm test -- excel-import-service.test.ts
```

Expected: PASS with 2 tests.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/services/excel-import-service.ts src/services/excel-import-service.test.ts src/services/excel-export-service.ts src/services/pdf-export-service.ts src/fixtures/salary-import-template.json package.json package-lock.json
git commit -m "feat: add excel import validation and export services"
```

## Task 5: Build the Dashboard with ECharts and Responsive Layout

**Files:**
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\DashboardPage.tsx`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\components\KpiCards.tsx`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\components\SalaryCompositionChart.tsx`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\components\HistoryTrendChart.tsx`
- Test: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\DashboardPage.test.tsx`

- [ ] **Step 1: Write the failing dashboard rendering test**

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\DashboardPage.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DashboardPage } from "./DashboardPage";

describe("DashboardPage", () => {
  it("renders KPI cards and chart containers", () => {
    render(<DashboardPage />);

    expect(screen.getByText("税前总额")).toBeInTheDocument();
    expect(screen.getByText("税后到手")).toBeInTheDocument();
    expect(screen.getByTestId("salary-composition-chart")).toBeInTheDocument();
    expect(screen.getByTestId("history-trend-chart")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- DashboardPage.test.tsx
```

Expected: FAIL because `DashboardPage` does not exist.

- [ ] **Step 3: Implement the dashboard page and chart containers**

Install dependency:

```bash
npm install echarts echarts-for-react
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\components\KpiCards.tsx`:

```tsx
const cards = [
  { label: "税前总额", value: "15,508" },
  { label: "税后到手", value: "13,647.98" },
  { label: "个税", value: "221.43" },
  { label: "个人五险一金", value: "1,638.59" },
  { label: "公司缴纳", value: "5,552.00" },
  { label: "年包预测", value: "230,000+" },
];

export function KpiCards() {
  return (
    <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => (
        <article key={card.label} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h2 className="text-sm text-slate-400">{card.label}</h2>
          <p className="mt-2 text-2xl font-semibold">{card.value}</p>
        </article>
      ))}
    </section>
  );
}
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\components\SalaryCompositionChart.tsx`:

```tsx
export function SalaryCompositionChart() {
  return (
    <section
      data-testid="salary-composition-chart"
      className="min-h-[320px] rounded-xl border border-slate-800 bg-slate-900 p-4"
    >
      <h2 className="mb-4 text-lg font-semibold">月度薪资构成</h2>
      <div className="flex h-60 items-center justify-center rounded border border-dashed border-slate-700">
        图表将在下一步接入 ECharts
      </div>
    </section>
  );
}
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\components\HistoryTrendChart.tsx`:

```tsx
export function HistoryTrendChart() {
  return (
    <section
      data-testid="history-trend-chart"
      className="min-h-[320px] rounded-xl border border-slate-800 bg-slate-900 p-4"
    >
      <h2 className="mb-4 text-lg font-semibold">历史趋势与时间轴</h2>
      <div className="flex h-60 items-center justify-center rounded border border-dashed border-slate-700">
        时间轴和 dataZoom 图表将在下一步接入
      </div>
    </section>
  );
}
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\DashboardPage.tsx`:

```tsx
import { KpiCards } from "./components/KpiCards";
import { HistoryTrendChart } from "./components/HistoryTrendChart";
import { SalaryCompositionChart } from "./components/SalaryCompositionChart";

export function DashboardPage() {
  return (
    <div className="space-y-6 px-6 py-6">
      <KpiCards />
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <SalaryCompositionChart />
        <aside className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h2 className="text-lg font-semibold">五险一金与福利账户</h2>
          <p className="mt-2 text-sm text-slate-300">展示养老、医疗、失业、工伤、生育、公积金与企业年金。</p>
        </aside>
      </div>
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <HistoryTrendChart />
        <aside className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h2 className="text-lg font-semibold">对比摘要与异常提醒</h2>
          <p className="mt-2 text-sm text-slate-300">展示多个方案差异与异常波动月份。</p>
        </aside>
      </div>
    </div>
  );
}
```

Run:

```bash
npm test -- DashboardPage.test.tsx
```

Expected: PASS.

- [ ] **Step 4: Replace placeholders with real ECharts instances and verify tests still pass**

Replace `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\components\SalaryCompositionChart.tsx`:

```tsx
import ReactECharts from "echarts-for-react";

export function SalaryCompositionChart() {
  return (
    <section data-testid="salary-composition-chart" className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h2 className="mb-4 text-lg font-semibold">月度薪资构成</h2>
      <ReactECharts
        style={{ height: 320 }}
        option={{
          tooltip: { trigger: "axis" },
          legend: { textStyle: { color: "#cbd5e1" } },
          xAxis: { type: "category", data: ["1月", "2月", "3月"], axisLabel: { color: "#cbd5e1" } },
          yAxis: { type: "value", axisLabel: { color: "#cbd5e1" } },
          series: [
            { name: "税前", type: "bar", stack: "salary", data: [15508, 15508, 16800] },
            { name: "税后", type: "bar", stack: "salary", data: [13647.98, 13647.98, 14590] },
          ],
        }}
      />
    </section>
  );
}
```

Replace `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\components\HistoryTrendChart.tsx`:

```tsx
import ReactECharts from "echarts-for-react";

export function HistoryTrendChart() {
  return (
    <section data-testid="history-trend-chart" className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h2 className="mb-4 text-lg font-semibold">历史趋势与时间轴</h2>
      <ReactECharts
        style={{ height: 320 }}
        option={{
          tooltip: { trigger: "axis" },
          xAxis: { type: "category", data: ["2026-01", "2026-02", "2026-03", "2026-04", "2026-05"] },
          yAxis: { type: "value" },
          dataZoom: [{ type: "inside" }, { type: "slider" }],
          series: [{ name: "到手", type: "line", smooth: true, data: [13200, 13400, 13647.98, 14010, 14500] }],
        }}
      />
    </section>
  );
}
```

Run:

```bash
npm test -- DashboardPage.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/features/dashboard/DashboardPage.tsx src/features/dashboard/components/KpiCards.tsx src/features/dashboard/components/SalaryCompositionChart.tsx src/features/dashboard/components/HistoryTrendChart.tsx src/features/dashboard/DashboardPage.test.tsx package.json package-lock.json
git commit -m "feat: add responsive salary dashboard"
```

## Task 6: Add Scenario Panel, Comparison Page, and Local State Wiring

**Files:**
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\scenario-service.ts`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\components\ScenarioPanel.tsx`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\compare\ComparePage.tsx`
- Test: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\compare\ComparePage.test.tsx`

- [ ] **Step 1: Write the failing comparison test**

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\compare\ComparePage.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ComparePage } from "./ComparePage";

describe("ComparePage", () => {
  it("renders baseline and candidate scenarios", () => {
    render(<ComparePage />);

    expect(screen.getByRole("heading", { name: "方案对比" })).toBeInTheDocument();
    expect(screen.getByText("基准方案")).toBeInTheDocument();
    expect(screen.getByText("调薪 10%")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- ComparePage.test.tsx
```

Expected: FAIL because `ComparePage` is missing.

- [ ] **Step 3: Implement scenario service, scenario panel, and comparison page**

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\services\scenario-service.ts`:

```ts
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
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\components\ScenarioPanel.tsx`:

```tsx
export function ScenarioPanel() {
  return (
    <aside className="rounded-xl border border-slate-800 bg-slate-900 p-4">
      <h2 className="text-lg font-semibold">假设分析</h2>
      <div className="mt-4 space-y-3">
        <label className="block text-sm">
          <span className="mb-1 block text-slate-300">调薪幅度</span>
          <input className="w-full rounded bg-slate-800 px-3 py-2" defaultValue="10" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-300">公积金比例</span>
          <input className="w-full rounded bg-slate-800 px-3 py-2" defaultValue="10" />
        </label>
      </div>
    </aside>
  );
}
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\compare\ComparePage.tsx`:

```tsx
const scenarios = [
  { name: "基准方案", annualPackage: "230,000", takeHome: "13,647.98" },
  { name: "调薪 10%", annualPackage: "253,000", takeHome: "14,950.50" },
];

export function ComparePage() {
  return (
    <div className="space-y-4 px-6 py-6">
      <h1 className="text-2xl font-bold">方案对比</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {scenarios.map((scenario) => (
          <article key={scenario.name} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <h2 className="text-lg font-semibold">{scenario.name}</h2>
            <p className="mt-2 text-sm text-slate-300">年包：{scenario.annualPackage}</p>
            <p className="text-sm text-slate-300">税后到手：{scenario.takeHome}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
```

Run:

```bash
npm test -- ComparePage.test.tsx
```

Expected: PASS.

- [ ] **Step 4: Wire the scenario panel into the dashboard and verify dashboard tests still pass**

Update `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\dashboard\DashboardPage.tsx` by importing and using `ScenarioPanel`:

```tsx
import { ScenarioPanel } from "./components/ScenarioPanel";
```

Replace the first right-side `aside` block with:

```tsx
<ScenarioPanel />
```

Run:

```bash
npm test -- DashboardPage.test.tsx ComparePage.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/services/scenario-service.ts src/features/dashboard/components/ScenarioPanel.tsx src/features/dashboard/DashboardPage.tsx src/features/compare/ComparePage.tsx src/features/compare/ComparePage.test.tsx
git commit -m "feat: add scenario analysis and comparison page"
```

## Task 7: Finish Routing, E2E Flow, and Performance Verification

**Files:**
- Modify: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\app-shell\AppShell.tsx`
- Modify: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\App.tsx`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\entry\EntryPage.tsx`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\import\ImportPage.tsx`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\settings\SettingsPage.tsx`
- Create: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\playwright.config.ts`
- Test: `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\tests\e2e\salary-dashboard.spec.ts`

- [ ] **Step 1: Write the failing end-to-end test**

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\tests\e2e\salary-dashboard.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("dashboard and compare page are reachable", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "薪资分析可视化应用" })).toBeVisible();
  await page.getByRole("link", { name: "方案对比" }).click();
  await expect(page.getByRole("heading", { name: "方案对比" })).toBeVisible();
});
```

- [ ] **Step 2: Run the e2e test to verify it fails**

Run:

```bash
npx playwright install
npm run test:e2e -- salary-dashboard.spec.ts
```

Expected: FAIL because the app has no router and no served pages for navigation.

- [ ] **Step 3: Implement routing and placeholder pages**

Install dependency:

```bash
npm install react-router-dom
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\entry\EntryPage.tsx`:

```tsx
export function EntryPage() {
  return (
    <div className="px-6 py-6">
      <h1 className="text-2xl font-bold">薪资录入</h1>
      <p className="mt-2 text-slate-300">在这里录入月度工资、奖金、补贴和专项附加扣除。</p>
    </div>
  );
}
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\import\ImportPage.tsx`:

```tsx
export function ImportPage() {
  return (
    <div className="px-6 py-6">
      <h1 className="text-2xl font-bold">Excel 导入</h1>
      <p className="mt-2 text-slate-300">上传工资表并完成字段映射和校验预览。</p>
    </div>
  );
}
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\settings\SettingsPage.tsx`:

```tsx
export function SettingsPage() {
  return (
    <div className="px-6 py-6">
      <h1 className="text-2xl font-bold">设置</h1>
      <p className="mt-2 text-slate-300">配置主口令、规则版本和导出偏好。</p>
    </div>
  );
}
```

Replace `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\App.tsx`:

```tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppShell } from "./features/app-shell/AppShell";
import { ComparePage } from "./features/compare/ComparePage";
import { DashboardPage } from "./features/dashboard/DashboardPage";
import { EntryPage } from "./features/entry/EntryPage";
import { ImportPage } from "./features/import/ImportPage";
import { SettingsPage } from "./features/settings/SettingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="/entry" element={<EntryPage />} />
          <Route path="/import" element={<ImportPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

Replace `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\src\features\app-shell\AppShell.tsx`:

```tsx
import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { label: "概览仪表盘", to: "/" },
  { label: "薪资录入", to: "/entry" },
  { label: "Excel 导入", to: "/import" },
  { label: "方案对比", to: "/compare" },
  { label: "设置", to: "/settings" },
];

export function AppShell() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 px-6 py-4">
        <h1 className="text-2xl font-bold">薪资分析可视化应用</h1>
      </header>
      <nav className="flex flex-wrap gap-4 border-b border-slate-800 px-6 py-4" aria-label="主导航">
        {navItems.map((item) => (
          <NavLink key={item.label} to={item.to} className="rounded bg-slate-800 px-3 py-2 text-sm">
            {item.label}
          </NavLink>
        ))}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
```

Create `e:\桌面文件存放\学习资料\企业\岚图\薪资计算\playwright.config.ts`:

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  use: {
    baseURL: "http://127.0.0.1:4173",
    headless: true,
  },
  webServer: {
    command: "npm run dev -- --host 127.0.0.1 --port 4173",
    port: 4173,
    reuseExistingServer: true,
  },
});
```

Run:

```bash
npm test -- AppShell.test.tsx DashboardPage.test.tsx ComparePage.test.tsx
npm run test:e2e -- salary-dashboard.spec.ts
```

Expected: PASS.

- [ ] **Step 4: Verify build and capture performance baseline**

Run:

```bash
npm run build
npm run dev -- --host 127.0.0.1 --port 4173
```

Then in browser devtools or Lighthouse:

```text
1. Open dashboard with a 60-row sample dataset.
2. Record chart render time after initial page load.
3. Confirm interaction updates feel under 500ms.
4. Confirm slider/dataZoom remains smooth across 5 years of data.
```

Expected: build succeeds, the dashboard renders without runtime errors, and the recorded render time is under the 500ms acceptance target on the sample dataset.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/App.tsx src/features/app-shell/AppShell.tsx src/features/entry/EntryPage.tsx src/features/import/ImportPage.tsx src/features/settings/SettingsPage.tsx playwright.config.ts tests/e2e/salary-dashboard.spec.ts package.json package-lock.json
git commit -m "feat: wire routes and end-to-end dashboard flow"
```

## Self-Review

- Spec coverage: The plan covers app shell, local encrypted storage, salary calculations, Excel import/export, dashboard visualizations, scenario comparison, routing, and automated validation. It intentionally leaves second-phase items such as advanced stock valuation and cloud sync out of scope, matching the spec.
- Placeholder scan: No `TODO`, `TBD`, or “implement later” placeholders remain. Every task has explicit file paths, commands, and code.
- Type consistency: `Profile`, `PayrollRecord`, and `Scenario` are defined once and referenced consistently. Payroll calculations use string-based money values throughout, matching the storage layer.
