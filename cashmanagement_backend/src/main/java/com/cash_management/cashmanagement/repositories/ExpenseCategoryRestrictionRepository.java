package com.cash_management.cashmanagement.repositories;

import com.cash_management.cashmanagement.enums.ExpenseCategory;
import com.cash_management.cashmanagement.entities.ExpenseCategoryRestriction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseCategoryRestrictionRepository extends JpaRepository<ExpenseCategoryRestriction, Long> {
    ExpenseCategoryRestriction findByCategory(ExpenseCategory category);
}