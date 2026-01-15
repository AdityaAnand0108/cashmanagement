package com.cashiq.cashmanagement.services.income;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CashIQIncomeAIServiceImpl implements CashIQIncomeAIService {

    @Override
    public String getIncomeInsights(Long userId) {
        log.info("Generating AI income insights for user: {}", userId);
        return "AI Insights for Income: coming soon";
    }
}
