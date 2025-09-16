package com.cash_management.cashmanagement.dtos;

import com.cash_management.cashmanagement.enums.ExpenseCategory;
import lombok.Data;

@Data
public class BudgetResponseDTO {

    private Long id;
    private Double amount;
    private ExpenseCategory category;
    private String month;

}
