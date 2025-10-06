package com.cash_management.cashmanagement.dtos;

import com.cash_management.cashmanagement.enums.ExpenseCategory;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ExpenseCategoryRestrictionDTO {

    private ExpenseCategory category;
    private Double maxAmount;
}
