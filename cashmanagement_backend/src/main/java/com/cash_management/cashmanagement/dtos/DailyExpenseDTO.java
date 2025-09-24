package com.cash_management.cashmanagement.dtos;

import com.cash_management.cashmanagement.enums.ExpenseCategory;
import com.cash_management.cashmanagement.enums.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DailyExpenseDTO {

    private String expenseName;
    private double amount;
    private LocalDate date;
    private String description;
    private ExpenseCategory category;
    private PaymentMethod paymentMethod;
    private boolean recurring;

}
