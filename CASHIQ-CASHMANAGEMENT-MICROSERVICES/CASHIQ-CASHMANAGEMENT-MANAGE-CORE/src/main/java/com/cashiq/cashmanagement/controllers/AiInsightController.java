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
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/ai/insights")
@CrossOrigin(origins = "http://localhost:5173")
@Slf4j
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
        log.info("Received analysis request for query: {}", query);
        if (query == null || query.trim().isEmpty()) {
            log.warn("Query is empty");
            return ResponseEntity.badRequest().body("Query cannot be empty");
        }

        // Get authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        log.debug("Authenticated user: {}", username);
        Optional<Users> userOpt = userRepository.findByUsername(username);

        if (userOpt.isEmpty()) {
            log.warn("User not found for username: {}", username);
            return ResponseEntity.status(401).body("User not found");
        }

        try {
            String response = aiInsightService.getInsights(userOpt.get().getId(), query);
            log.info("Successfully generated insights for user: {}", username);
            return ResponseEntity.ok(Map.of("response", response));
        } catch (Exception e) {
            log.error("Error generating insights for user: {}", username, e);
            return ResponseEntity.internalServerError().body("Error generating insights: " + e.getMessage());
        }
    }
}
