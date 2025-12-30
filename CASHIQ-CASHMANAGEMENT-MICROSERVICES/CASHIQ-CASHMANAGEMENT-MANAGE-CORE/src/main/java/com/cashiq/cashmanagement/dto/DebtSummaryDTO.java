package com.cashiq.cashmanagement.dto;

import java.math.BigDecimal;

/**
 * DTO for summarizing debt totals for a user.
 * Used for the top-level cards in the UI.
 */
public class DebtSummaryDTO {

    /**
     * Total amount owed by the user to others (Liabilities).
     */
    private BigDecimal totalOwedByUser;

    /**
     * Total amount owed to the user by others (Assets).
     */
    private BigDecimal totalOwedToUser;

    // Constructors
    public DebtSummaryDTO() {
    }

    public DebtSummaryDTO(BigDecimal totalOwedByUser, BigDecimal totalOwedToUser) {
        this.totalOwedByUser = totalOwedByUser;
        this.totalOwedToUser = totalOwedToUser;
    }

    // Getters and Setters

    public BigDecimal getTotalOwedByUser() {
        return totalOwedByUser;
    }

    public void setTotalOwedByUser(BigDecimal totalOwedByUser) {
        this.totalOwedByUser = totalOwedByUser;
    }

    public BigDecimal getTotalOwedToUser() {
        return totalOwedToUser;
    }

    public void setTotalOwedToUser(BigDecimal totalOwedToUser) {
        this.totalOwedToUser = totalOwedToUser;
    }
}
