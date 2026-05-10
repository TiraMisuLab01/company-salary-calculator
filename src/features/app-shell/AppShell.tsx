import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { label: "概览仪表盘", to: "/dashboard" },
  { label: "薪资录入", to: "/entry" },
  { label: "Excel 导入", to: "/import" },
  { label: "方案对比", to: "/compare" },
  { label: "设置", to: "/settings" },
];

export function AppShell() {
  return (
    <div className="flex min-h-dvh flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <header className="sticky top-0 z-50 border-b border-[var(--color-border-default)] bg-[var(--color-bg-primary)]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent)] text-sm font-bold text-white">薪</span>
            <h1 className="text-base font-semibold tracking-tight sm:text-lg">薪资分析可视化应用</h1>
          </div>
          <span className="rounded-full bg-[var(--color-accent-subtle)] px-3 py-1 text-xs font-medium text-[var(--color-accent)]">
            v1.0
          </span>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-0 lg:flex-row lg:gap-6">
        <nav className="shrink-0 border-b border-[var(--color-border-default)] lg:w-56 lg:border-b-0 lg:border-r lg:pt-6" aria-label="主导航">
          <ul className="flex gap-1 overflow-x-auto px-4 py-2 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-3 lg:py-0">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 whitespace-nowrap ${
                      isActive
                        ? "bg-[var(--color-accent-subtle)] text-[var(--color-accent)]"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)]"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <main className="min-w-0 flex-1 pb-12 pt-4 sm:pt-6 lg:pt-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
