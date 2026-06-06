package com.cashiq.cashmanagement.controllers.budget;

import com.cashiq.cashmanagement.dto.BudgetDTO;
import com.cashiq.cashmanagement.services.budget.CashIQBudgetService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for budget cap operations.
 * CORS is handled globally by SecurityConfig — no @CrossOrigin needed here.
 * ResponseEntity wrapping lives in the controller so the service layer stays
 * free of HTTP concerns.
 */
@RestController
@RequestMapping("/api/budget")
@RequiredArgsConstructor
@Slf4j
public class CashIQBudgetController {

    private final CashIQBudgetService budgetService;

    /**
     * Creates or updates a budget cap for the given user.
     * If a budget for the same category already exists it is overwritten.
     *
     * @param userId    The ID of the user.
     * @param budgetDTO The budget details (category, limit amount, period type).
     * @return 200 OK with a confirmation message.
     */
    @PostMapping("/add/{userId}")
    public ResponseEntity<String> addBudget(@PathVariable Long userId, @RequestBody BudgetDTO budgetDTO) {
        log.info("Request to add budget for user: {}", userId);
        budgetService.createBudget(userId, budgetDTO);
        return ResponseEntity.ok("Budget saved successfully");
    }

    /**
     * Updates the limit and period of an existing budget.
     *
     * @param userId    The ID of the user who owns the budget.
     * @param budgetId  The ID of the budget to update.
     * @param budgetDTO The updated budget details.
     * @return 200 OK with a confirmation message.
     */
    @PutMapping("/update/{userId}/{budgetId}")
    public ResponseEntity<String> updateBudget(@PathVariable Long userId, @PathVariable Long budgetId,
            @RequestBody BudgetDTO budgetDTO) {
        log.info("Request to update budget: {} for user: {}", budgetId, userId);
        budgetService.updateBudget(userId, budgetId, budgetDTO);
        return ResponseEntity.ok("Budget updated");
    }

    /**
     * Deletes a budget cap.
     *
     * @param userId   The ID of the user who owns the budget.
     * @param budgetId The ID of the budget to delete.
     * @return 200 OK with a confirmation message.
     */
    @DeleteMapping("/delete/{userId}/{budgetId}")
    public ResponseEntity<String> deleteBudget(@PathVariable Long userId, @PathVariable Long budgetId) {
        log.info("Request to delete budget: {} for user: {}", budgetId, userId);
        budgetService.deleteBudget(userId, budgetId);
        return ResponseEntity.ok("Budget deleted successfully");
    }

    /**
     * Returns all budgets for a user with live spend and status included.
     *
     * @param userId The ID of the user.
     * @return 200 OK with a list of BudgetDTO objects.
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BudgetDTO>> getUserBudgets(@PathVariable Long userId) {
        log.info("Fetching budgets for user: {}", userId);
        return ResponseEntity.ok(budgetService.getUserBudgets(userId));
    }
}
