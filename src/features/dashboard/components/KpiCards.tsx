interface KpiCardsProps {
  values: {
    grossIncome: string;
    netIncome: string;
    tax: string;
    personalSocialFundTotal: string;
    employerContribution: string;
    annualPackage: string;
  };
}

export function KpiCards({ values }: KpiCardsProps) {
  const cards = [
    { label: "税前总额", value: values.grossIncome },
    { label: "税后到手", value: values.netIncome },
    { label: "个税", value: values.tax },
    { label: "个人五险一金", value: values.personalSocialFundTotal },
    { label: "公司缴纳", value: values.employerContribution },
    { label: "年包预测", value: values.annualPackage },
  ];

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
