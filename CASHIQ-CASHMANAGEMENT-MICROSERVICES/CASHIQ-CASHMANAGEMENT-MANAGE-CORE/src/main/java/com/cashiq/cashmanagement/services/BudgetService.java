package com.cashiq.cashmanagement.services;

import com.cashiq.cashmanagement.dto.BudgetDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface BudgetService {
    ResponseEntity<?> createBudget(Long userId, BudgetDTO budgetDTO);

    ResponseEntity<?> updateBudget(Long userId, Long budgetId, BudgetDTO budgetDTO);

    ResponseEntity<?> deleteBudget(Long userId, Long budgetId);

    ResponseEntity<List<BudgetDTO>> getUserBudgets(Long userId);
}
