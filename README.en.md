[中文](README.md) | English

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Tech](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vite.dev)
[![Vitest](https://img.shields.io/badge/test-21/21%20passing-brightgreen)]()

# Dongfeng Salary Analytics Tool 🧮

> A locally-stored personal salary analysis & visualization app, purpose-built for Dongfeng Motor's complex campus-recruit compensation structure. Supports multi-profile management, precise social insurance & housing fund calculation, scenario comparison, Excel import/export, and encrypted storage.

<br />

## ✨ Features

### 📊 Dashboard

- **7 KPI Cards**: Gross Pay, Net Take-Home, Income Tax, Personal Social Insurance & Housing Fund, Company Contribution, Annual Package Forecast, Deferred Performance
- **Salary Composition Chart**: Pre-tax / Post-tax overlay columns + Social Insurance & Housing Fund dual columns, one-click perspective toggle
- **Historical Trend Chart**: Gross Pay / Net Take-Home dual mode, with drag-to-zoom
- **Social Insurance & Housing Fund Table**: Category × Company / Individual / Total, with insurance & housing fund base at the bottom
- **Monthly Detail Table**: 13-column complete data, row-level deletion

### 📝 Salary Entry

- Five data sections: Salary Components → Monthly Bonus & Incentives → Social Insurance & Housing Fund Rates & Base → Deductions & Benefits → Net Pay Reconciliation
- **Performance Split**: 80% monthly advance + 20% deferred year-end
- **Quarterly Ratings**: Q1\~Q4 independent entry; the system automatically applies the relevant quarter's rating by month, effective only in settlement months (Mar/Jun/Sep/Dec)
- **Quarterly Incentive**: KPI Base × (1 + Rating Coefficient), A=+50% B=+20% C=0 D=-20%
- **Social Insurance & Housing Fund Rates**: Social insurance individual/company 25.8%, housing fund individual/company — all manually adjustable

### ⚖️ Scenario Comparison

- Current month's actual net pay vs hypothetical scenario, showing only net take-home (clean & intuitive)
- Difference analysis: absolute delta + percentage change + trend arrow
- **Difference Notes**: Stored by month + scenario version, supports view/edit/delete, history traceable & exportable

### 📥 Import & Export

- Excel template download (23 columns), drag-and-drop upload + row-level validation
- One-click export Excel details / PDF report
- Export notes to Excel

### 🔒 Security

- Web Crypto API (PBKDF2 + AES-256-GCM) encrypted storage
- All data stored exclusively in browser IndexedDB — nothing uploaded to any server
- No third-party tracking / no internet required

<br />

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- npm (bundled with Node.js)

### Install

```bash
git clone https://github.com/TiraMisuLab01/company-salary-calculator.git
cd company-salary-calculator
npm install
```

### Develop

```bash
npm run dev
# Open http://127.0.0.1:5173 in your browser, auto-redirects to the entry page
```

### Test

```bash
npm test              # 21 unit & integration tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Build

```bash
npm run build           # Production build
npm run build:exe       # Generate shareable ZIP package
npm run preview          # Preview production build
```

<br />

## 📦 Distributing to Non-Technical Users

Run the packaging script to generate a ZIP:

```powershell
powershell -ExecutionPolicy Bypass -File build-exe.ps1
```

The output file `salary-tool-v1.0.zip` contains:

- `start.bat` — Double-click to launch (auto-opens browser)
- `server.cjs` — Zero-dependency HTTP server
- `dist/` — Production build artifacts
- `使用说明.txt`

Recipients only need Node.js installed — extract and double-click `start.bat` to use.

<br />

## 🗂 Project Structure

```
src/
├── types/salary.ts              # Core data types
├── lib/
│   ├── money.ts                 # decimal money calculations
│   ├── tax-rules.ts             # Income tax rate tables
│   └── payroll/
│       ├── calculate-lantu-salary.ts   # Lantu calculation engine
│       ├── calculate-income-tax.ts     # Income tax computation
│       └── build-scenario-preview.ts   # Hypothetical scenario recalculation
├── services/
│   ├── payroll-record-service.ts # Salary record CRUD
│   ├── scenario-service.ts       # Scenario parameter persistence
│   ├── crypto-service.ts         # Web Crypto encryption
│   ├── excel-import-service.ts   # Excel import & validation
│   └── excel-export-service.ts   # Excel export
├── features/
│   ├── app-shell/               # Navigation layout
│   ├── dashboard/               # Dashboard + KPIs + Charts + Details
│   ├── entry/                   # Salary entry form
│   ├── compare/                 # Scenario comparison + notes
│   ├── import/                  # Excel import
│   ├── settings/                # Settings page
│   └── data/                    # Context Provider
└── db/app-db.ts                 # Dexie/IndexedDB
```

<br />

## 🛠 Tech Stack

| Category    | Technology                                   |
| ----------- | -------------------------------------------- |
| Framework   | React 19                                     |
| Language    | TypeScript 6                                 |
| Build       | Vite 8                                       |
| Styling     | Tailwind CSS 4                               |
| Charts      | ECharts 6                                    |
| Database    | Dexie (IndexedDB)                            |
| Encryption  | Web Crypto API                               |
| Excel       | SheetJS (xlsx)                               |
| PDF         | jsPDF + html2canvas                          |
| Calculation | decimal.js                                   |
| Testing     | Vitest + React Testing Library + Playwright  |

<br />

## 🧪 Test Coverage

```
✓ 21 tests | 11 files passed
```

| Test File                | Content                        |
| ------------------------ | ------------------------------ |
| `payroll-record-service` | Salary record save/read/delete |
| `crypto-service`         | Encrypt/decrypt/wrong key      |
| `excel-import-service`   | Import validation              |
| `AppShell`               | Navigation rendering           |
| `DashboardPage`          | KPI/chart/detail rendering     |
| `EntryDashboardFlow`     | Entry → Dashboard full flow    |
| `ComparePage`            | Scenario comparison + CRUD     |
| `SettingsPage`           | Parameter reset                |
| `SocialFundBreakdown`    | Social insurance & housing fund table |
| `ScenarioService`        | Scenario parameter CRUD        |
| `SalarySummary`          | Salary summary calculation     |

<br />

## 📄 License

MIT License

***

<p align="center">
  <sub>All salary data exists only in your browser's local storage — it is never collected, uploaded, or shared.</sub>
</p>
