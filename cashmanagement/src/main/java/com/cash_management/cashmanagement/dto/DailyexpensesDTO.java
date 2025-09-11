package com.cash_management.cashmanagement.dto;

import com.cash_management.cashmanagement.enums.ExpenseCategory;
import com.cash_management.cashmanagement.enums.PaymentMethods;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DailyexpensesDTO {

    private String expenseName;
    private double amount;
    private LocalDate date;
    private String description;
    private ExpenseCategory category;
    private PaymentMethods paymentMethod;
    private boolean recurring;

}
