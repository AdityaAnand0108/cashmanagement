import { DebtType, DebtStatus } from '../../models/Debt';
import type { DebtEntryDTO } from '../../models/Debt';

export const calculateDebtMetrics = (debts: DebtEntryDTO[]): number => {
    const totalDebt = debts
        .filter(d => d.debtType === DebtType.OWED_BY_USER && d.status === DebtStatus.ACTIVE)
        .reduce((sum, d) => sum + d.currentBalance, 0);
    
    return totalDebt;
};
