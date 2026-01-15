package com.cashiq.cashmanagement.controllers.expense;

import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

/**
 * Controller class for handling AI-related expense operations.
 */
@RestController
@RequestMapping("/api/ai/expenses")
@CrossOrigin(origins = "http://localhost:5173")
@Slf4j
public class CashIQExpenseAnalysisAIController {

    // Placeholder for AI expense logic
    @GetMapping("/health")
    public String healthCheck() {
        return "AI Expense Controller is active";
    }
}
