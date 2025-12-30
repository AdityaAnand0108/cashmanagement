package com.cashiq.cashmanagement.dto;

import com.cashiq.cashmanagement.enums.DebtStatus;
import com.cashiq.cashmanagement.enums.DebtType;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * DTO carrying data for a single Debt/IOU entry.
 * Transferred between frontend and backend.
 */
public class DebtEntryDTO {

    private Long id;
    private Long userId;
    private DebtType debtType;
    private String title;
    private String counterparty;
    private BigDecimal originalAmount;
    private BigDecimal currentBalance;
    private BigDecimal interestRate;
    private LocalDate dueDate;
    private LocalDate nextPaymentDate;
    private BigDecimal nextPaymentAmount;
    private DebtStatus status;

    // Constructors
    public DebtEntryDTO() {
    }

    public DebtEntryDTO(Long id, Long userId, DebtType debtType, String title, String counterparty,
            BigDecimal originalAmount, BigDecimal currentBalance, BigDecimal interestRate, LocalDate dueDate,
            LocalDate nextPaymentDate, BigDecimal nextPaymentAmount, DebtStatus status) {
        this.id = id;
        this.userId = userId;
        this.debtType = debtType;
        this.title = title;
        this.counterparty = counterparty;
        this.originalAmount = originalAmount;
        this.currentBalance = currentBalance;
        this.interestRate = interestRate;
        this.dueDate = dueDate;
        this.nextPaymentDate = nextPaymentDate;
        this.nextPaymentAmount = nextPaymentAmount;
        this.status = status;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public DebtType getDebtType() {
        return debtType;
    }

    public void setDebtType(DebtType debtType) {
        this.debtType = debtType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCounterparty() {
        return counterparty;
    }

    public void setCounterparty(String counterparty) {
        this.counterparty = counterparty;
    }

    public BigDecimal getOriginalAmount() {
        return originalAmount;
    }

    public void setOriginalAmount(BigDecimal originalAmount) {
        this.originalAmount = originalAmount;
    }

    public BigDecimal getCurrentBalance() {
        return currentBalance;
    }

    public void setCurrentBalance(BigDecimal currentBalance) {
        this.currentBalance = currentBalance;
    }

    public BigDecimal getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(BigDecimal interestRate) {
        this.interestRate = interestRate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getNextPaymentDate() {
        return nextPaymentDate;
    }

    public void setNextPaymentDate(LocalDate nextPaymentDate) {
        this.nextPaymentDate = nextPaymentDate;
    }

    public BigDecimal getNextPaymentAmount() {
        return nextPaymentAmount;
    }

    public void setNextPaymentAmount(BigDecimal nextPaymentAmount) {
        this.nextPaymentAmount = nextPaymentAmount;
    }

    public DebtStatus getStatus() {
        return status;
    }

    public void setStatus(DebtStatus status) {
        this.status = status;
    }
}
