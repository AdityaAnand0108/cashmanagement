export interface TransactionDTO {
    description: string;
    amount: number;
    category: string;
    date: string; // YYYY-MM-DD
    paymentSource: string;
    type: 'INCOME' | 'EXPENSE';
}
