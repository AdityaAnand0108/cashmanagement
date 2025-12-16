package com.cashiq.cashmanagement.entity;

import com.cashiq.cashmanagement.enums.TransactionType;
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

    private String description;

    private Double amount;

    private String category;

    private LocalDate date;

    private String paymentSource;

    private TransactionType type;
}