package com.cash_management.cashmanagement.services;

import com.cash_management.cashmanagement.dtos.ExpenseCategoryRestrictionDTO;
import com.cash_management.cashmanagement.enums.ExpenseCategory;

public interface ExpenseCategoryRestrictionService {

    ExpenseCategoryRestrictionDTO setRestriction(ExpenseCategoryRestrictionDTO dto);

    ExpenseCategoryRestrictionDTO getRestrictionByCategory(ExpenseCategory category);

}