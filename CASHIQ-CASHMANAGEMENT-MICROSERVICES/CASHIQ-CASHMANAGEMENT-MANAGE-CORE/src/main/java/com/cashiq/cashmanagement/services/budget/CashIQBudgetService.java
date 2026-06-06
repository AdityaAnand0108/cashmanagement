package com.cashiq.cashmanagement.services.budget;

import com.cashiq.cashmanagement.dto.BudgetDTO;

import java.util.List;

/**
 * Service interface for budget cap operations.
 * Implementations must not return ResponseEntity — HTTP concerns belong in the controller layer.
 */
public interface CashIQBudgetService {

    /**
     * Creates a new budget for the given user, or updates an existing one if the
     * same category already has a budget.
     *
     * @param userId    The ID of the user.
     * @param budgetDTO The budget details (category, limit, period type, dates).
     */
    void createBudget(Long userId, BudgetDTO budgetDTO);

    /**
     * Updates the limit and period of an existing budget.
     * Throws AccessDeniedException if the budget does not belong to the user.
     *
     * @param userId    The ID of the user requesting the update.
     * @param budgetId  The ID of the budget to update.
     * @param budgetDTO The updated budget details.
     */
    void updateBudget(Long userId, Long budgetId, BudgetDTO budgetDTO);

    /**
     * Deletes an existing budget.
     * Throws AccessDeniedException if the budget does not belong to the user.
     *
     * @param userId   The ID of the user requesting the deletion.
     * @param budgetId The ID of the budget to delete.
     */
    void deleteBudget(Long userId, Long budgetId);

    /**
     * Returns all budgets for a user with live spend and status calculated.
     * Uses a single aggregation query to avoid N+1 database hits.
     *
     * @param userId The ID of the user.
     * @return List of BudgetDTO objects enriched with spentAmount, remainingAmount, and status.
     */
    List<BudgetDTO> getUserBudgets(Long userId);
}
