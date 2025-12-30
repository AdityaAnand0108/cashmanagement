package com.cashiq.cashmanagement.enums;

/**
 * Enum representing the type of debt.
 * Defines whether the debt is owed by the user (Payable) or owed to the user
 * (Receivable).
 */
public enum DebtType {
    /**
     * Money the user owes to someone else (e.g., Loan, Split Bill).
     */
    OWED_BY_USER,

    /**
     * Money someone else owes to the user (e.g., IOU In).
     */
    OWED_TO_USER
}
