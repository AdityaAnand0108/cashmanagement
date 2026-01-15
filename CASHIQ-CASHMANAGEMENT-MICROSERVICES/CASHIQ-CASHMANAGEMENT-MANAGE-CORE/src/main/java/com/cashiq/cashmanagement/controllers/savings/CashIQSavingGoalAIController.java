package com.cashiq.cashmanagement.controllers.savings;

import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

/**
 * Controller class for handling AI-related savings operations.
 */
@RestController
@RequestMapping("/api/ai/savings")
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class CashIQSavingGoalAIController {

    // Placeholder for AI savings logic
    @GetMapping("/health")
    public String healthCheck() {
        return "AI Savings Controller is active";
    }
}
