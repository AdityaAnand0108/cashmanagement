package com.cashiq.cashmanagement.services.savings;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CashIQSavingGoalAIServiceImpl implements CashIQSavingGoalAIService {

    @Override
    public String getSavingsInsights(Long userId) {
        log.info("Generating AI savings insights for user: {}", userId);
        return "AI Insights for Savings: coming soon";
    }
}
