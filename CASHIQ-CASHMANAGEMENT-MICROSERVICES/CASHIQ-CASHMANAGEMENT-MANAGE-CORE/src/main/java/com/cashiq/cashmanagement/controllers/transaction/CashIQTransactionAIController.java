package com.cashiq.cashmanagement.controllers.transaction;

import org.springframework.web.bind.annotation.*;
import lombok.extern.slf4j.Slf4j;

/**
 * Controller class for handling AI-related transaction operations.
 */
@RestController
@RequestMapping("/api/ai/transaction")
@CrossOrigin(origins = "*")
@Slf4j
public class CashIQTransactionAIController {

    // Placeholder for AI transaction logic
    @GetMapping("/health")
    public String healthCheck() {
        return "AI Transaction Controller is active";
    }
}
