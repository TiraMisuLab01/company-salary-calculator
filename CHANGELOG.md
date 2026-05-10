# Changelog

## [1.0.0] - 2026-05-10

### 新增

#### 岚图薪资分析系统 MVP

**核心计算引擎**
- 岚图专用薪资计算引擎 (`calculate-lantu-salary`)，支持固定薪资(70%)+绩效(30%)拆分、80%预发+20%递延年终、销量奖金、季度激励、部门/项目奖金、专利奖金
- 社保公积金完全按岚图实际政策：社保个人10.3%/公司25.8%，公积金个人/公司各10%，基数默认15508（第一年），独立可配
- 个税按2018年后七级超额累进税率标准计算

**录入表单**
- 五分区：工资构成、月度奖金与激励、五险一金比例与基数、扣除与福利、实发核对
- 四季度绩效评级独立录入(Q1-Q4)，系统按月份自动选用所在季度评级
- 季度绩效 KPI 基数独立可配(默认12600)，评级系数 A=+50%, B=+20%, C=0, D=-20%
- 季度激励仅在核算月发放(3/6/9/12月)
- 当月实发工资字段，用于与实际到账金额核对

**仪表盘**
- 7项KPI卡片：应发合计、税后到手、个税、个人五险一金、公司缴纳、年包预测、递延绩效(月)
- 月度薪资构成图表：税前/税后重叠柱状图 + 五险一金(公司/个人双柱)双视角切换
- 历史趋势与时间轴：税前总额/税后到手双模式切换，dataZoom 滑动缩放
- 五险一金分类统计表格：险种×公司/个人/合计，按法定权重拆分，底部标注实际入账金额
- 月度明细表：12列(月份、固定、实发绩效、递延、销量奖金、部门、评级、应发、个税、五险一金、计算到手、实际到手)，支持行级删除
- 假设分析面板：调薪幅度/公积金比例/专项附加扣除，实时联动 KPI 和图表
- 对比摘要：实发到手 vs 假设到手差异

**方案对比**
- 当月实发工资 vs 假设方案双卡对比
- 差异分析：绝对差值 + 百分比变化 + 增减趋势箭头
- 按月份+方案版本号存储备注，支持增删改查
- 历史备注记录表格，支持按时间范围导出 Excel

**Excel 导入**
- 23 列导入模板下载，覆盖全部岚图薪资字段
- 拖拽上传 + 行级校验 + 预览确认

**设置**
- 安全与解锁说明（Web Crypto 加密存储）
- 规则版本展示（个税起征点、税率包、地区规则）
- 假设参数重置 + Excel 导出
- 本地记录数统计

**UI/UX**
- OLED 暗色主题，蓝色主调 + 语义色(翡翠到手/琥珀个税/玫瑰负数)
- Tailwind CSS 4 + 自定义 CSS 变量体系
- 侧栏式导航(大屏) + 横向滚动导航(小屏)
- 根路径自动重定向至录入页(`/`→`/entry`)
- 桌面一键启动脚本(`SalaryTool.bat`)

**测试**
- 20 项 Vitest 单元/集成测试全通过
- 覆盖录入→仪表盘流程、方案对比页、备注增删改、record CRUD、删除

### 文件结构
```
src/
├── types/salary.ts          # 核心数据类型
├── lib/
│   ├── money.ts             # decimal 金额计算
│   ├── tax-rules.ts         # 个税税率表
│   └── payroll/
│       ├── calculate-lantu-salary.ts    # 岚图计算引擎
│       ├── calculate-income-tax.ts      # 个税计算
│       ├── calculate-salary-summary.ts  # 通用薪资汇总
│       ├── calculate-social-fund.ts     # 社保计算
│       └── build-scenario-preview.ts    # 假设方案重算
├── services/
│   ├── payroll-record-service.ts  # 工资记录 CRUD
│   ├── scenario-service.ts        # 假设参数持久化
│   ├── crypto-service.ts          # Web Crypto 加密
│   ├── excel-import-service.ts    # Excel 导入解析
│   └── excel-export-service.ts    # Excel 导出
├── features/
│   ├── app-shell/             # 导航布局
│   ├── dashboard/             # 仪表盘 + KPI + 图表 + 明细表
│   ├── entry/                 # 薪资录入表单
│   ├── compare/               # 方案对比 + 备注
│   ├── import/                # Excel 导入
│   ├── settings/              # 设置页
│   └── data/                  # PayrollDataProvider + ScenarioProvider
└── db/app-db.ts              # Dexie/IndexedDB 数据库
```

### 技术栈
React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · ECharts · Dexie · SheetJS · decimal.js · Vitest · React Router 7
