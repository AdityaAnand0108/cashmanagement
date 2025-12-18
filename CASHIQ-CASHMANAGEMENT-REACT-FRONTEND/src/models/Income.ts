import { PaymentFrequency } from './PaymentFrequency';

export interface IncomeDTO {
    id?: number;
    name: string;
    amount: number;
    icon: string;
    frequency: PaymentFrequency;
    nextPayDay: string; // YYYY-MM-DD
    isFixed: boolean;
    userId?: number;
}
