package com.cashiq.cashmanagement.services.implementation;

import com.cashiq.cashmanagement.dto.ExpenseAnalysisResponseDTO;
import com.cashiq.cashmanagement.services.AiCategorizationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class AiCategorizationServiceImpl implements AiCategorizationService {

    // The URL of your running Python Server
    private final String PYTHON_API_URL = "http://127.0.0.1:5000/predict";

    // Tool to make HTTP calls
    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public ExpenseAnalysisResponseDTO analyzeExpense(String userDescription) {
        // 1. Prepare the data to send (JSON Payload)
        // We act like the client now (sending data TO Python)
        log.info("Preparing to send expense analysis request to Python service for: {}", userDescription);
        Map<String, String> request = new HashMap<>();
        request.put("description", userDescription);

        try {
            // 2. Send POST request and map the result to our DTO class
            ExpenseAnalysisResponseDTO response = restTemplate.postForObject(
                    PYTHON_API_URL,
                    request,
                    ExpenseAnalysisResponseDTO.class);
            log.info("Received response from Python service: {}", response);
            return response;
        } catch (Exception e) {
            // If Python is offline, we catch the error so Java doesn't crash
            log.error("AI Service Error connecting to Python API: {}", e.getMessage());
            System.err.println("AI Service Error: " + e.getMessage());
            return null;
        }
    }
}
