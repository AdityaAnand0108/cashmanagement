package com.cash_management.cashmanagement.entities;

import com.cash_management.cashmanagement.enums.ExpenseCategory;
import com.cash_management.cashmanagement.enums.PaymentMethod;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
@Entity
@Getter
@Setter
@Table(name = "dailyexpenses")
public class DailyExpense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dailyexpensesId;

    @Column(nullable = false)
    private String expenseName;

    @Column(nullable = false)
    private double amount;

    @Column(nullable = false)
    private LocalDate date;

    private String description;

    @Enumerated(EnumType.STRING)
    private ExpenseCategory category;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    private boolean recurring;

    @ManyToOne
    @JoinColumn(name = "date", referencedColumnName = "date", insertable = false, updatable = false)
    private Spending spending;

}
