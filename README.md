# 东风薪资分析工具 🧮 &nbsp;|&nbsp; Dongfeng Salary Analytics Tool 🧮

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Tech](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vite.dev)
[![Vitest](https://img.shields.io/badge/test-21/21%20passing-brightgreen)]()



---

<details open>
<summary><b>🇨🇳 简体中文</b></summary>

<br />

> 一款数据存储在本地的个人薪资分析可视化应用，专为东风汽车体系复杂的校招薪资结构设计，支持多档案管理、五险一金精确计算、方案对比、Excel 导入导出与加密存储。

<br />

## ✨ 功能

### 📊 仪表盘

- **7 项 KPI 卡片**：应发合计、税后到手、个税、个人五险一金、公司缴纳、年包预测、递延绩效
- **薪资构成图**：税前/税后重叠柱 + 五险一金双柱，一键切换视角
- **历史趋势图**：税前总额 / 税后到手双模式，支持拖拽缩放
- **五险一金统计表**：险种 × 公司/个人/合计，底部展示社保公积金基数
- **月度明细表**：13 列完整数据，支持行级删除

### 📝 薪资录入

- 五大数据分区：工资构成 → 月度奖金与激励 → 五险一金比例与基数 → 扣除与福利 → 实发核对
- **绩效拆分**：80% 当月预发 + 20% 递延年终
- **四季度评级**：Q1\~Q4 独立录入，系统按月份自动选用所在季度评级，仅在核算月（3/6/9/12）生效
- **季度激励**：KPI 基数 ×（1 + 评级系数），A=+50% B=+20% C=0 D=-20%
- **五险一金比例**：社保 个人 / 公司 25.8%，公积金 个人/公司，全部可手动调整

### ⚖️ 方案对比

- 当月实发工资 vs 假设方案，仅展示税后到手（简洁直观）
- 差异分析：绝对差值 + 百分比变化 + 趋势箭头
- **差异备注**：按月+方案版本号关联存储，支持查看/编辑/删除，历史记录可追溯、可导出

### 📥 导入导出

- Excel 模板下载（23 列），拖拽上传 + 行级校验
- 一键导出 Excel 明细 / PDF 报告
- 备注记录导出 Excel

### 🔒 安全

- Web Crypto API（PBKDF2 + AES-256-GCM）加密存储
- 所有数据仅存浏览器 IndexedDB，不上传任何服务器
- 无第三方追踪 / 无需联网

<br />

## 🚀 快速开始

### 前提条件

- [Node.js](https://nodejs.org/zh-cn/) ≥ 18
- npm（随 Node.js 安装）

### 安装

```bash
git clone https://github.com/TiraMisuLab01/company-salary-calculator.git
cd company-salary-calculator
npm install
```

### 开发

```bash
npm run dev
# 浏览器打开 http://127.0.0.1:5173，自动跳转录入页
```

### 测试

```bash
npm test              # 21 项单元/集成测试
npm run test:watch    # 监视模式
npm run test:coverage # 覆盖率
```

### 构建

```bash
npm run build           # 生产构建
npm run build:exe       # 生成可分享的 ZIP 包
npm run preview          # 预览生产构建
```

<br />

## 📦 分发给非技术人员

运行打包脚本生成 ZIP：

```powershell
powershell -ExecutionPolicy Bypass -File build-exe.ps1
```

输出文件 `salary-tool-v1.0.zip` 包含：

- `start.bat` — 双击启动（自动打开浏览器）
- `server.cjs` — 零依赖 HTTP 服务器
- `dist/` — 生产构建产物
- `使用说明.txt`

接收方只需安装 Node.js，解压后双击 `start.bat` 即可使用。

<br />

## 🗂 项目结构

```
src/
├── types/salary.ts              # 核心数据类型
├── lib/
│   ├── money.ts                 # decimal 金额计算
│   ├── tax-rules.ts             # 个税税率表
│   └── payroll/
│       ├── calculate-lantu-salary.ts   # 岚图计算引擎
│       ├── calculate-income-tax.ts     # 个税计算
│       └── build-scenario-preview.ts   # 假设方案重算
├── services/
│   ├── payroll-record-service.ts # 工资记录 CRUD
│   ├── scenario-service.ts       # 假设参数持久化
│   ├── crypto-service.ts         # Web Crypto 加密
│   ├── excel-import-service.ts   # Excel 导入/校验
│   └── excel-export-service.ts   # Excel 导出
├── features/
│   ├── app-shell/               # 导航布局
│   ├── dashboard/               # 仪表盘 + KPI + 图表 + 明细
│   ├── entry/                   # 薪资录入表单
│   ├── compare/                 # 方案对比 + 备注
│   ├── import/                  # Excel 导入
│   ├── settings/                # 设置页
│   └── data/                    # Context Provider
└── db/app-db.ts                 # Dexie/IndexedDB
```

<br />

## 🛠 技术栈

| 类别    | 技术                                          |
| ----- | ------------------------------------------- |
| 框架    | React 19                                    |
| 语言    | TypeScript 6                                |
| 构建    | Vite 8                                      |
| 样式    | Tailwind CSS 4                              |
| 图表    | ECharts 6                                   |
| 数据库   | Dexie (IndexedDB)                           |
| 加密    | Web Crypto API                              |
| Excel | SheetJS (xlsx)                              |
| PDF   | jsPDF + html2canvas                         |
| 计算    | decimal.js                                  |
| 测试    | Vitest + React Testing Library + Playwright |

<br />

## 🧪 测试覆盖

```
✓ 21 tests | 11 files passed
```

| 测试文件                     | 内容           |
| ------------------------ | ------------ |
| `payroll-record-service` | 工资记录保存/读取/删除 |
| `crypto-service`         | 加密/解密/错误密钥   |
| `excel-import-service`   | 导入校验         |
| `AppShell`               | 导航渲染         |
| `DashboardPage`          | KPI/图表/明细渲染  |
| `EntryDashboardFlow`     | 录入→仪表盘完整流程   |
| `ComparePage`            | 方案对比 + 备注增删改 |
| `SettingsPage`           | 参数重置         |
| `SocialFundBreakdown`    | 五险一金表格       |
| `ScenarioService`        | 假设参数 CRUD    |
| `SalarySummary`          | 薪资汇总计算       |

<br />

## 📄 许可

MIT License

***

<p align="center">
  <sub>所有薪资数据仅存在于浏览器本地，不会被收集、上传或分享。</sub>
</p>

</details>

<details>
<summary><b>🇬🇧 English</b></summary>

<br />

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

</details>
