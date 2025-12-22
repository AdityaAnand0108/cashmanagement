package com.cashiq.cashmanagement.controllers;

import com.cashiq.cashmanagement.dto.BudgetDTO;
import com.cashiq.cashmanagement.services.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "http://localhost:3000") // Adjust for frontend port
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    @PostMapping("/add/{userId}")
    public ResponseEntity<?> addBudget(@PathVariable Long userId, @RequestBody BudgetDTO budgetDTO) {
        return budgetService.createBudget(userId, budgetDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BudgetDTO>> getUserBudgets(@PathVariable Long userId) {
        return budgetService.getUserBudgets(userId);
    }
}
