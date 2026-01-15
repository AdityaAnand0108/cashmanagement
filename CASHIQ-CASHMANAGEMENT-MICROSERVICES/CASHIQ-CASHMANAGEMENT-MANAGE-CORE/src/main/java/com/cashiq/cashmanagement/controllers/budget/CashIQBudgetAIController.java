package com.cashiq.cashmanagement.controllers.budget;

import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

/**
 * Controller class for handling AI-related budget operations.
 */
@RestController
@RequestMapping("/api/ai/budget")
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class CashIQBudgetAIController {

    // Placeholder for AI budget logic
    @GetMapping("/health")
    public String healthCheck() {
        return "AI Budget Controller is active";
    }
}
