import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { PayrollRecord } from "../../types/salary";
import { deletePayrollRecord, listPayrollRecords, savePayrollRecord, type PayrollRecordInput } from "../../services/payroll-record-service";

interface PayrollDataContextValue {
  payrollRecords: PayrollRecord[];
  latestPayrollRecord?: PayrollRecord;
  addPayrollRecord: (input: PayrollRecordInput) => Promise<PayrollRecord>;
  removePayrollRecord: (id: string) => Promise<void>;
}

const PayrollDataContext = createContext<PayrollDataContextValue | undefined>(undefined);

export function PayrollDataProvider({ children }: { children: ReactNode }) {
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([]);

  useEffect(() => {
    void listPayrollRecords().then(setPayrollRecords);
  }, []);

  const value = useMemo<PayrollDataContextValue>(
    () => ({
      payrollRecords,
      latestPayrollRecord: payrollRecords[0],
      addPayrollRecord: async (input) => {
        const record = await savePayrollRecord(input);
        setPayrollRecords((current) => [record, ...current].sort((left, right) => right.month.localeCompare(left.month)));
        return record;
      },
      removePayrollRecord: async (id) => {
        await deletePayrollRecord(id);
        setPayrollRecords((current) => current.filter((r) => r.id !== id));
      },
    }),
    [payrollRecords],
  );

  return <PayrollDataContext.Provider value={value}>{children}</PayrollDataContext.Provider>;
}

export function usePayrollData() {
  const context = useContext(PayrollDataContext);

  if (!context) {
    throw new Error("usePayrollData 必须在 PayrollDataProvider 内使用");
  }

  return context;
}
