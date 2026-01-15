package com.cashiq.cashmanagement.services.debt;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CashIQDebtAIServiceImpl implements CashIQDebtAIService {

    @Override
    public String getDebtInsights(Long userId) {
        log.info("Generating AI debt insights for user: {}", userId);
        return "AI Insights for Debt: coming soon";
    }
}
