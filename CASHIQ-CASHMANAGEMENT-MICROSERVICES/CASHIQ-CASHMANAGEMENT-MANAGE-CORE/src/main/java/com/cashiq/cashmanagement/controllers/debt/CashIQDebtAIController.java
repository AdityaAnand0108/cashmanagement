package com.cashiq.cashmanagement.controllers.debt;

import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

/**
 * Controller class for handling AI-related debt operations.
 */
@RestController
@RequestMapping("/api/ai/debts")
@CrossOrigin(origins = "*", maxAge = 3600)
@Slf4j
public class CashIQDebtAIController {

    // Placeholder for AI debt logic
    @GetMapping("/health")
    public String healthCheck() {
        return "AI Debt Controller is active";
    }
}
