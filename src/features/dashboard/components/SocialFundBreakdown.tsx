interface SocialFundBreakdownProps {
  baseSalary: string;
  performanceSalary: string;
  salesBonus: string;
  departmentBonus: string;
  socialPersonalRate: number;
  socialEmployerRate: number;
  housingFundPersonalRate: number;
  housingFundEmployerRate: number;
  socialFundBase: string;
  housingFundBase: string;
}

interface InsuranceRow {
  name: string;
  employer: number;
  personal: number;
}

const TH = "py-2 pr-4 text-left text-xs font-medium text-[var(--color-text-muted)]";
const TD = "py-2 pr-4 text-sm tabular-nums text-right";
const TD_BOLD = "py-2 pr-4 text-sm font-bold tabular-nums text-right text-[var(--color-text-primary)]";
const TD_GREEN = "py-3 pr-4 text-sm font-bold tabular-nums text-right text-[var(--color-emerald)]";

export function SocialFundBreakdown(props: SocialFundBreakdownProps) {
  const sBase = props.socialFundBase
    ? Number(props.socialFundBase)
    : Number(props.baseSalary) + Number(props.performanceSalary) + Number(props.salesBonus) + Number(props.departmentBonus);
  const hBase = props.housingFundBase
    ? Number(props.housingFundBase)
    : sBase;

  const spRate = props.socialPersonalRate / 100;
  const seRate = props.socialEmployerRate / 100;
  const hpRate = props.housingFundPersonalRate / 100;
  const heRate = props.housingFundEmployerRate / 100;

  const socialEmployer = sBase * seRate;
  const socialPersonal = sBase * spRate;
  const housingEmployer = hBase * heRate;
  const housingPersonal = hBase * hpRate;

  const rows: InsuranceRow[] = [
    {
      name: "五险合计",
      employer: socialEmployer,
      personal: socialPersonal,
    },
    {
      name: "公积金",
      employer: housingEmployer,
      personal: housingPersonal,
    },
  ];

  const totalEmployer = rows.reduce((s, r) => s + r.employer, 0);
  const totalPersonal = rows.reduce((s, r) => s + r.personal, 0);

  return (
    <section data-testid="social-fund-breakdown" className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] p-4">
      <h2 className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">五险一金分类统计</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-border-default)]">
              <th className={TH}>险种</th>
              <th className={`${TH} text-right`}>公司缴纳</th>
              <th className={`${TH} text-right`}>个人缴纳</th>
              <th className={`${TH} text-right`}>合计入账</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-b border-[var(--color-border-default)] last:border-0">
                <td className="py-2.5 pr-4 text-sm font-medium text-[var(--color-text-primary)]">{r.name}</td>
                <td className={TD}>{r.employer.toFixed(2)}</td>
                <td className={TD}>{r.personal.toFixed(2)}</td>
                <td className={TD}>{(r.employer + r.personal).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-[var(--color-border-strong)]">
              <td className="py-3 pr-4 text-sm font-bold text-[var(--color-text-primary)]">合计</td>
              <td className={TD_BOLD}>{totalEmployer.toFixed(2)}</td>
              <td className={TD_BOLD}>{totalPersonal.toFixed(2)}</td>
              <td className={TD_GREEN}>{(totalEmployer + totalPersonal).toFixed(2)}</td>
            </tr>
            <tr className="text-[var(--color-text-muted)]">
              <td colSpan={4} className="pb-1 pt-2 pr-4 text-right text-xs">
                五险 {sBase.toFixed(2)} × 公司 {props.socialEmployerRate}% = {socialEmployer.toFixed(2)} · 个人 {props.socialPersonalRate}% = {socialPersonal.toFixed(2)}　|　公积金 {hBase.toFixed(2)} × 公司 {props.housingFundEmployerRate}% = {housingEmployer.toFixed(2)} · 个人 {props.housingFundPersonalRate}% = {housingPersonal.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
