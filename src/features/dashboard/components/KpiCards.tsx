const cards = [
  { label: "税前总额", value: "15,508" },
  { label: "税后到手", value: "11,955.97" },
  { label: "个税", value: "372.89" },
  { label: "个人五险一金", value: "3,179.14" },
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
