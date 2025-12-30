package com.cashiq.cashmanagement.entity;

import com.cashiq.cashmanagement.enums.DebtStatus;
import com.cashiq.cashmanagement.enums.DebtType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Entity representing a Debt or IOU record in the database.
 */
@Entity
@Table(name = "debt_entries")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Debt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The user who owns this debt record.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    /**
     * Type of debt: Owning (OWED_BY_USER) or Owed (OWED_TO_USER).
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "debt_type", nullable = false)
    private DebtType debtType;

    /**
     * Title or description of the debt (e.g., "Student Loan").
     */
    @Column(nullable = false)
    private String title;

    /**
     * Name of the person or entity involved (e.g., "Mike").
     */
    @Column(nullable = true)
    private String counterparty;

    /**
     * The starting amount of the debt.
     */
    @Column(name = "original_amount", nullable = false)
    private BigDecimal originalAmount;

    /**
     * The current remaining balance.
     */
    @Column(name = "current_balance", nullable = false)
    private BigDecimal currentBalance;

    /**
     * Interest rate (optional).
     */
    @Column(name = "interest_rate")
    private BigDecimal interestRate;

    /**
     * Date/Deadline for full repayment.
     */
    @Column(name = "due_date")
    private LocalDate dueDate;

    /**
     * Next scheduled payment date.
     */
    @Column(name = "next_payment_date")
    private LocalDate nextPaymentDate;

    /**
     * Amount for the next scheduled payment.
     */
    @Column(name = "next_payment_amount")
    private BigDecimal nextPaymentAmount;

    /**
     * Current status of the debt (ACTIVE, SETTLED, etc.).
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DebtStatus status = DebtStatus.ACTIVE;
}
