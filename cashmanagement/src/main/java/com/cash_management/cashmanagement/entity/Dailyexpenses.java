package com.cash_management.cashmanagement.entity;

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

    private String category;

    private String paymentMethod;

    private boolean recurring;

}
