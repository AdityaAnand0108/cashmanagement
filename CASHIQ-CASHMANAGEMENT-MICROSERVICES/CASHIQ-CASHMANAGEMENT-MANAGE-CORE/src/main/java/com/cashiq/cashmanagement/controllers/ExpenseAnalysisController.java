package com.cashiq.cashmanagement.controllers;

import com.cashiq.cashmanagement.dto.ExpenseAnalysisResponseDTO;
import com.cashiq.cashmanagement.services.AiCategorizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:5173") // Adjust port if needed, React usually runs on 5173 or 3000
public class ExpenseAnalysisController {

    private final AiCategorizationService aiCategorizationService;

    @Autowired
    public ExpenseAnalysisController(AiCategorizationService aiCategorizationService) {
        this.aiCategorizationService = aiCategorizationService;
    }

    @PostMapping("/analyze")
    public ResponseEntity<ExpenseAnalysisResponseDTO> analyzeExpense(@RequestBody Map<String, String> request) {
        String description = request.get("description");
        if (description == null || description.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        ExpenseAnalysisResponseDTO response = aiCategorizationService.analyzeExpense(description);
        if (response == null) {
            return ResponseEntity.internalServerError().build();
        }

        return ResponseEntity.ok(response);
    }
}
