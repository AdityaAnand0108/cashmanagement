package com.cash_management.cashmanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class DailyexpensesDTO {

    private String expenseName;
    private double amount;
    private LocalDate date;
    private String description;
    private String category;
    private String paymentMethod;
    private boolean recurring;

}
