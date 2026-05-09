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
