package com.cashiq.cashmanagement.enums;

/**
 * Enum representing the current status of a debt record.
 */
public enum DebtStatus {
    /**
     * The debt is currently active and has a remaining balance.
     */
    ACTIVE,

    /**
     * The debt has been fully paid or resolved.
     */
    SETTLED,

    /**
     * The debt is pending acknowledgment or processing (optional state).
     */
    PENDING
}
