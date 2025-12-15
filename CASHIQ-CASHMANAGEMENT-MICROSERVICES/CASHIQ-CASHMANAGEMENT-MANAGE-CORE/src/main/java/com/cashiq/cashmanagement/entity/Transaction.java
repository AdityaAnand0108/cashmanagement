package com.cashiq.cashmanagercore.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description; // The original text: "Starbucks $5"

    private Double amount;      // 5.0
    private String category;    // "Food & Drink"
    private LocalDate date;     // 2025-12-15
    private String paymentSource; // "UPI"

    // We default to "EXPENSE" for now, but you can change this logic later
    private String type = "EXPENSE";
}