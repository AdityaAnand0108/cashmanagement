package com.cash_management.cashmanagement.entity;

import com.cash_management.cashmanagement.enums.ExpenseCategory;
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
public class Dailyexpenses {

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

    private String paymentMethod;

    private boolean recurring;

}
