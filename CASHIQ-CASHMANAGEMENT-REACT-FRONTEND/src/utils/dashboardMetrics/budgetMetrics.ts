import type { BudgetDTO } from '../../models/Budget';
import { formatCurrency } from '../../utils/CurrencyUtils';

export interface BudgetMetrics {
    safeToSpend: number;
    safeToSpendSubtext: string;
    safeToSpendClass: 'positive' | 'warning' | 'danger' | 'neutral';
}

export const calculateBudgetMetrics = (budgets: BudgetDTO[], monthlyExpense: number): BudgetMetrics => {
    const totalBudgetLimit = budgets.reduce((sum, b) => sum + b.limitAmount, 0);
    const safeToSpend = totalBudgetLimit - monthlyExpense;

    // Safe-to-Spend Context
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysRemaining = Math.max(1, daysInMonth - currentDay + 1);

    let safeToSpendSubtext = 'Budget exceeded';
    let safeToSpendClass: 'positive' | 'warning' | 'danger' | 'neutral' = 'danger';

    if (safeToSpend >= 0) {
        const dailySafeSpend = safeToSpend / daysRemaining;
        safeToSpendSubtext = `You can spend ${formatCurrency(dailySafeSpend)} / day`;
        safeToSpendClass = 'positive';
    }

    return {
        safeToSpend,
        safeToSpendSubtext,
        safeToSpendClass
    };
};
