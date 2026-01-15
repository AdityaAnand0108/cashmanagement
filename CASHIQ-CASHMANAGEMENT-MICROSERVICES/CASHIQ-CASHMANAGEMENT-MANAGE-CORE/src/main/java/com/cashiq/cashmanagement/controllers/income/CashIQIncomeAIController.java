package com.cashiq.cashmanagement.controllers.income;

import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

/**
 * Controller class for handling AI-related income operations.
 */
@RestController
@RequestMapping("/api/ai/income")
@CrossOrigin(origins = "*")
@Slf4j
public class CashIQIncomeAIController {

    // Placeholder for AI income logic
    @GetMapping("/health")
    public String healthCheck() {
        return "AI Income Controller is active";
    }
}
