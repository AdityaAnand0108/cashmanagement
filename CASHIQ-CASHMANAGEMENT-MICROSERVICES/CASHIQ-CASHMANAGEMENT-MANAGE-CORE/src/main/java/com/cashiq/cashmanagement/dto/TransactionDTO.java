package com.cashiq.cashmanagement.dto;

import com.cashiq.cashmanagement.enums.TransactionType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TransactionDTO {

    private String description;

    private Double amount;

    private String category;

    private LocalDate date;

    private String paymentSource;

    private TransactionType type;

}
