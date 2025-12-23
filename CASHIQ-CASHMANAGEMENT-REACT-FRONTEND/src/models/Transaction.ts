export interface TransactionDTO {
    id?: number;
    description: string;
    amount: number;
    category: string;
    date: string; // YYYY-MM-DD
    paymentSource: string;
    type: 'INCOME' | 'EXPENSE' | 'DEPOSIT' | 'WITHDRAW';
}
