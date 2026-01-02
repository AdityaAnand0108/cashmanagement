import type { TransactionDTO } from '../../models/Transaction';


export interface ExpenseMetrics {
    monthlyExpense: number;
    expenseSubtext: string;
}

export const calculateExpenseMetrics = (transactions: TransactionDTO[]): ExpenseMetrics => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let expenseSum = 0;

    transactions.forEach(t => {
        const tDate = new Date(t.date);
        const tMonth = tDate.getMonth();
        const tYear = tDate.getFullYear();

        if (t.type === 'EXPENSE' && tMonth === currentMonth && tYear === currentYear) {
            expenseSum += Math.abs(t.amount);
        }
    });

    // Expense Context
    const currentDay = now.getDate();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const expenseSubtext = `Day ${currentDay} of ${daysInMonth} • Spent so far`;

    return {
        monthlyExpense: expenseSum,
        expenseSubtext
    };
};
