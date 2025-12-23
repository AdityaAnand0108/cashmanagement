package com.cashiq.cashmanagement.controllers;

import com.cashiq.cashmanagement.services.AiInsightService;
import com.cashiq.cashmanagement.entity.Users;
import com.cashiq.cashmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/ai/insights")
@CrossOrigin(origins = "http://localhost:5173")
public class AiInsightController {

    private final AiInsightService aiInsightService;
    private final UserRepository userRepository;

    @Autowired
    public AiInsightController(AiInsightService aiInsightService, UserRepository userRepository) {
        this.aiInsightService = aiInsightService;
        this.userRepository = userRepository;
    }

    @PostMapping("/analyze")
    public ResponseEntity<?> analyze(@RequestBody Map<String, String> request) {
        String query = request.get("query");
        if (query == null || query.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Query cannot be empty");
        }

        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Optional<Users> userOpt = userRepository.findByUsername(username);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body("User not found");
        }

        try {
            String response = aiInsightService.getInsights(userOpt.get().getId(), query);
            return ResponseEntity.ok(Map.of("response", response));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error generating insights: " + e.getMessage());
        }
    }
}
