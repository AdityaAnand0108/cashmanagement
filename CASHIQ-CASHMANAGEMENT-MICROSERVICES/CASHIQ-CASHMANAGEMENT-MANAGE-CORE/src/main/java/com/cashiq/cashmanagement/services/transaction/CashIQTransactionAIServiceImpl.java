package com.cashiq.cashmanagement.services.transaction;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CashIQTransactionAIServiceImpl implements CashIQTransactionAIService {

    @Override
    public String getTransactionInsights(Long userId) {
        log.info("Generating AI transaction insights for user: {}", userId);
        return "AI Insights for Transaction: coming soon";
    }
}
