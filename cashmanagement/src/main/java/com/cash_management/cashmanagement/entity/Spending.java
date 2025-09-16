package com.cash_management.cashmanagement.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "spending_by_date")
public class Spending {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private LocalDate date;

    @OneToMany
    @JoinColumn(name = "date", referencedColumnName = "date")
    private List<Dailyexpenses> dailyexpenses;

    private Double totalSpending;
}