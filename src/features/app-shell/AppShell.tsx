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
