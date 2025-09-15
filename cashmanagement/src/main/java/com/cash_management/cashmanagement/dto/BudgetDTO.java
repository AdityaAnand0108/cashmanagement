package com.cash_management.cashmanagement.dto;

import com.cash_management.cashmanagement.enums.ExpenseCategory;
import lombok.Data;

@Data
public class BudgetDTO {

    private Long id;
    private Double amount;
    private ExpenseCategory category;
    private String month;

}
