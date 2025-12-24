package com.cashiq.cashmanagement.controllers;

import com.cashiq.cashmanagement.dto.ExpenseAnalysisResponseDTO;
import com.cashiq.cashmanagement.services.AiCategorizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import lombok.extern.slf4j.Slf4j;

/**
 * Controller class for handling expense analysis operations.
 */
@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173") // Adjust port if needed, React usually runs on 5173 or 3000
@Slf4j
public class ExpenseAnalysisController {

    private final AiCategorizationService aiCategorizationService;

    @Autowired
    public ExpenseAnalysisController(AiCategorizationService aiCategorizationService) {
        this.aiCategorizationService = aiCategorizationService;
    }

    /**
     * Analyzes the given expense description and returns the insights.
     *
     * @param request The request containing the expense description.
     * @return The insights.
     */
    @PostMapping("/analyze")
    public ResponseEntity<ExpenseAnalysisResponseDTO> analyzeExpense(@RequestBody Map<String, String> request) {
        String description = request.get("description");
        log.info("Received expense analysis request for description: {}", description);
        if (description == null || description.isEmpty()) {
            log.warn("Description is empty for expense analysis");
            return ResponseEntity.badRequest().build();
        }

        try {
            ExpenseAnalysisResponseDTO response = aiCategorizationService.analyzeExpense(description);
            if (response == null) {
                log.error("Analysis service returned null response");
                return ResponseEntity.internalServerError().build();
            }
            log.info("Successfully analyzed expense. Category: {}, Confidence: {}", response.getCategory(),
                    response.getConfidence());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error analyzing expense", e);
            throw e;
        }
    }
}
