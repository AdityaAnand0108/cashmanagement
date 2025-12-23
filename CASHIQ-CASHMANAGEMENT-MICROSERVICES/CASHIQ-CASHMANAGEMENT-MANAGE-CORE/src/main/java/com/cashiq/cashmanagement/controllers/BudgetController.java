package com.cashiq.cashmanagement.controllers;

import com.cashiq.cashmanagement.dto.BudgetDTO;
import com.cashiq.cashmanagement.services.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "http://localhost:3000") // Adjust for frontend port
@Slf4j
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @PostMapping("/add/{userId}")
    public ResponseEntity<?> addBudget(@PathVariable Long userId, @RequestBody BudgetDTO budgetDTO) {
        log.info("Request to add budget for user: {} with details: {}", userId, budgetDTO);
        return budgetService.createBudget(userId, budgetDTO);
    }

    @PutMapping("/update/{userId}/{budgetId}")
    public ResponseEntity<?> updateBudget(@PathVariable Long userId, @PathVariable Long budgetId,
            @RequestBody BudgetDTO budgetDTO) {
        log.info("Request to update budget: {} for user: {} with details: {}", budgetId, userId, budgetDTO);
        return budgetService.updateBudget(userId, budgetId, budgetDTO);
    }

    @DeleteMapping("/delete/{userId}/{budgetId}")
    public ResponseEntity<?> deleteBudget(@PathVariable Long userId, @PathVariable Long budgetId) {
        log.info("Request to delete budget: {} for user: {}", budgetId, userId);
        return budgetService.deleteBudget(userId, budgetId);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BudgetDTO>> getUserBudgets(@PathVariable Long userId) {
        log.info("Fetching budgets for user: {}", userId);
        return budgetService.getUserBudgets(userId);
    }
}
