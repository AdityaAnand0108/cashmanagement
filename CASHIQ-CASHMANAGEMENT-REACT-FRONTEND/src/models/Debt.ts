/**
 * Enum representing the type of debt.
 * OWED_BY_USER: Money the user owes (Liabilities).
 * OWED_TO_USER: Money owed to the user (Assets).
 */
export const DebtType = {
    OWED_BY_USER: 'OWED_BY_USER',
    OWED_TO_USER: 'OWED_TO_USER'
} as const;

export type DebtType = typeof DebtType[keyof typeof DebtType];

/**
 * Enum representing the status of the debt.
 */
export const DebtStatus = {
    ACTIVE: 'ACTIVE',
    SETTLED: 'SETTLED',
    PENDING: 'PENDING'
} as const;

export type DebtStatus = typeof DebtStatus[keyof typeof DebtStatus];

/**
 * Interface representing a Debt or IOU entry.
 * Matches the backend DebtEntryDTO.
 */
export interface DebtEntryDTO {
    id?: number;
    userId?: number;
    debtType: DebtType;
    title: string;
    counterparty?: string;
    originalAmount: number;
    currentBalance: number;
    interestRate?: number;
    dueDate?: string; // ISO Date String YYYY-MM-DD
    nextPaymentDate?: string; // ISO Date String YYYY-MM-DD
    nextPaymentAmount?: number;
    status: DebtStatus;
}

/**
 * Interface for Debt Summary totals.
 * Matches backend DebtSummaryDTO.
 */
export interface DebtSummaryDTO {
    totalOwedByUser: number;
    totalOwedToUser: number;
}
