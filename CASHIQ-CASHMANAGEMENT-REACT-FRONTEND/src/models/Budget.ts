import { CategoryType } from "./CategoryType";

export interface BudgetDTO {
    id?: number;
    userId?: number;
    category: CategoryType;
    limitAmount: number;
    startDate?: string;
    endDate?: string;
    periodType?: 'MONTHLY' | 'CUSTOM';
    spentAmount?: number;
    remainingAmount?: number;
    status?: string;
}
