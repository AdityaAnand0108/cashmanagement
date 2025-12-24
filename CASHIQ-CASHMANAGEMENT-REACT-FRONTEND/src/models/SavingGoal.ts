export interface SavingGoalDTO {
    id?: number;
    userId: number;
    goalName: string;
    targetAmount: number;
    currentAmount?: number;
    targetDate: string; // ISO Date string
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}
