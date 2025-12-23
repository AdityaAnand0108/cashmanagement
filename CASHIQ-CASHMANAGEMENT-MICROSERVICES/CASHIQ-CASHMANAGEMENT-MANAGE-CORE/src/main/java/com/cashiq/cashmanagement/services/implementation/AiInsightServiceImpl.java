package com.cashiq.cashmanagement.services.implementation;

import com.cashiq.cashmanagement.entity.Budget;
import com.cashiq.cashmanagement.entity.Income;
import com.cashiq.cashmanagement.entity.Transaction;
import com.cashiq.cashmanagement.entity.Users;
import com.cashiq.cashmanagement.repository.BudgetRepository;
import com.cashiq.cashmanagement.repository.IncomeRepository;
import com.cashiq.cashmanagement.repository.TransactionRepository;
import com.cashiq.cashmanagement.repository.UserRepository;
import com.cashiq.cashmanagement.services.AiInsightService;
import org.springframework.ai.chat.client.ChatClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AiInsightServiceImpl implements AiInsightService {

    private final ChatClient chatClient;
    private final TransactionRepository transactionRepository;
    private final BudgetRepository budgetRepository;
    private final IncomeRepository incomeRepository;
    private final UserRepository userRepository;

    @Autowired
    public AiInsightServiceImpl(ChatClient.Builder chatClientBuilder,
            TransactionRepository transactionRepository,
            BudgetRepository budgetRepository,
            IncomeRepository incomeRepository,
            UserRepository userRepository) {
        this.chatClient = chatClientBuilder.build();
        this.transactionRepository = transactionRepository;
        this.budgetRepository = budgetRepository;
        this.incomeRepository = incomeRepository;
        this.userRepository = userRepository;
    }

    @Override
    public String getInsights(Long userId, String query) {
        log.info("Generating insights for user: {} with query: {}", userId, query);
        // 1. Fetch user's financial data
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Transaction> transactions = transactionRepository.findAllByUser(user);
        // Note: Assuming findByUserId exists or finding all and filtering.
        // ideally fetching limited recent ones would be better but for MVP fetching all
        // user txns.
        // If findByUserId doesn't exist, we might need to adjust or use existing
        // methods.

        List<Budget> budgets = budgetRepository.findByUsersId(userId);
        List<Income> incomes = incomeRepository.findByUserId(userId);

        // 2. Build Context
        StringBuilder context = new StringBuilder();
        context.append(
                "You are a helpful AI financial assistant. Analyze the following user financial data to answer their question.\n\n");

        context.append("--- INCOMES ---\n");
        if (incomes.isEmpty()) {
            context.append("No income sources recorded.\n");
        } else {
            for (Income inc : incomes) {
                context.append(String.format("- Source: %s, Amount: %.2f\n", inc.getName(), inc.getAmount()));
            }
        }

        context.append("\n--- BUDGETS ---\n");
        if (budgets.isEmpty()) {
            context.append("No budgets set.\n");
        } else {
            for (Budget b : budgets) {
                context.append(String.format("- Category: %s, Limit: %.2f\n", b.getCategory(), b.getLimitAmount()));
            }
        }

        context.append("\n--- RECENT TRANSACTIONS ---\n");
        if (transactions.isEmpty()) {
            context.append("No transactions recorded.\n");
        } else {
            // Limit to last 20 for context window efficiency
            int count = 0;
            // Assuming transactions are already sorted or we take first 20.
            // Ideally we should sort by date DESC in the repo query.
            for (Transaction t : transactions) {
                if (count++ > 20)
                    break;
                context.append(String.format("- Date: %s, Amount: %.2f, Category: %s, Source: %s, Type: %s\n",
                        t.getDate(), t.getAmount(), t.getCategory(), t.getPaymentSource(), t.getType()));
            }
        }

        context.append("\n--- USER QUESTION ---\n");
        context.append(query);

        log.debug("Built context for AI: {}", context);

        // 3. Call AI
        String response = chatClient.prompt()
                .user(context.toString())
                .call()
                .content();

        log.info("Received insights from AI");
        return response;
    }
}
