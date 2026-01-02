import type { TransactionDTO } from '../../models/Transaction';
import { formatCurrency } from '../../utils/CurrencyUtils';

export interface IncomeMetrics {
    monthlyIncome: number;
    incomeTitle: string;
    incomeSubtext: {
        text: string;
        type: 'positive' | 'warning' | 'neutral';
    };
}

export const calculateIncomeMetrics = (transactions: TransactionDTO[]): IncomeMetrics => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const prevDate = new Date();
    prevDate.setMonth(currentMonth - 1);
    const prevMonth = prevDate.getMonth();
    const prevYear = prevDate.getFullYear();

    let incomeSum = 0;
    let prevIncomeSum = 0;
    const incomeSources = new Set<string>();

    transactions.forEach(t => {
        const tDate = new Date(t.date);
        const tMonth = tDate.getMonth();
        const tYear = tDate.getFullYear();

        if (t.type === 'INCOME') {
            if (tMonth === currentMonth && tYear === currentYear) {
                incomeSum += t.amount;
                // Use paymentSource or fallback to description (as per original logic)
                if (t.paymentSource) incomeSources.add(t.paymentSource);
            } else if (tMonth === prevMonth && tYear === prevYear) {
                prevIncomeSum += t.amount;
            }
        }
    });

    // Subtext Logic
    let subText = 'This month';
    let subType: 'positive' | 'warning' | 'neutral' = 'neutral';

    if (prevIncomeSum > 0) {
        const diff = incomeSum - prevIncomeSum;
        if (diff > 0) {
            subText = `↑ ${formatCurrency(diff)} more than last month`;
            subType = 'positive';
        } else if (diff < 0) {
            subText = `↓ ${formatCurrency(Math.abs(diff))} less than last month`;
            subType = 'warning';
        } else {
            subText = 'Consistent with last month';
        }
    } else if (incomeSum > 0 && prevIncomeSum === 0) {
        subText = 'Good start to the month';
        subType = 'positive';
    }

    // Title Logic
    let title = 'Monthly Income';
    if (incomeSources.size === 1) {
        title = 'Primary Income';
    } else if (incomeSources.size > 1) {
        title = 'Multiple Income Sources';
    }

    return {
        monthlyIncome: incomeSum,
        incomeTitle: title,
        incomeSubtext: { text: subText, type: subType }
    };
};
