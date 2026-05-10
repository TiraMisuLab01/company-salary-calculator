interface KpiCardsProps {
  values: {
    grossIncome: string;
    netIncome: string;
    tax: string;
    personalSocialFundTotal: string;
    employerContribution: string;
    annualPackage: string;
    deferredPerformance?: string;
  };
}

const CARD_STYLE = "rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4 transition-shadow duration-200 hover:shadow-lg hover:shadow-[var(--color-accent)]/5";

export function KpiCards({ values }: KpiCardsProps) {
  const cards = [
    { label: "应发合计", value: values.grossIncome, color: "text-[var(--color-text-primary)]" },
    { label: "税后到手", value: values.netIncome, color: "text-[var(--color-emerald)]" },
    { label: "个税", value: values.tax, color: "text-[var(--color-amber)]" },
    { label: "个人五险一金", value: values.personalSocialFundTotal, color: "text-[var(--color-accent)]" },
    { label: "公司缴纳", value: values.employerContribution, color: "text-[var(--color-text-secondary)]" },
    { label: "年包预测", value: values.annualPackage, color: "text-[var(--color-accent)]" },
    { label: "递延绩效(月)", value: values.deferredPerformance || "0.00", color: "text-[var(--color-amber)]" },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
      {cards.map((card) => (
        <article key={card.label} className={CARD_STYLE}>
          <h2 className="text-xs font-medium tracking-wide text-[var(--color-text-muted)] uppercase">{card.label}</h2>
          <p className={`mt-1.5 text-lg font-bold tracking-tight tabular-nums xl:text-xl ${card.color}`}>{card.value}</p>
        </article>
      ))}
    </section>
  );
}
