package com.cashiq.cashmanagement.services.budget;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CashIQBudgetAIServiceImpl implements CashIQBudgetAIService {

    @Override
    public String getBudgetInsights(Long userId) {
        log.info("Generating AI budget insights for user: {}", userId);
        return "AI Insights for Budget: coming soon";
    }
}
