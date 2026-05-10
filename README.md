[English](README.en.md)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Tech](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vite.dev)
[![Vitest](https://img.shields.io/badge/test-21/21%20passing-brightgreen)]()

# 东风薪资分析工具 🧮

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
