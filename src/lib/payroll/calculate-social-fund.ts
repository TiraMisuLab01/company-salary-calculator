import { money, moneyString } from "../money";

export function calculateSocialFund(input: {
  socialFundBase: string;
  housingFundRate: string;
  socialRates: { pension: string; medical: string; unemployment: string };
}) {
  const base = money(input.socialFundBase);
  const pension = base.mul(input.socialRates.pension);
  const medical = base.mul(input.socialRates.medical);
  const unemployment = base.mul(input.socialRates.unemployment);
  const housingFund = base.mul(input.housingFundRate);
  const total = pension.plus(medical).plus(unemployment).plus(housingFund);

  return {
    pension: moneyString(pension),
    medical: moneyString(medical),
    unemployment: moneyString(unemployment),
    housingFund: moneyString(housingFund),
    total: moneyString(total),
  };
}
