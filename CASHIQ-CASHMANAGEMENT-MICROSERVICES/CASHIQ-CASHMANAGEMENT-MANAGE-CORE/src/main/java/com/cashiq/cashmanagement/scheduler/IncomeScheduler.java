package com.cashiq.cashmanagement.scheduler;

import com.cashiq.cashmanagement.entity.Income;
import com.cashiq.cashmanagement.entity.Transaction;
import com.cashiq.cashmanagement.enums.PayementFrequency;
import com.cashiq.cashmanagement.enums.TransactionType;
import com.cashiq.cashmanagement.repository.IncomeRepository;
import com.cashiq.cashmanagement.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class IncomeScheduler {

    private final IncomeRepository incomeRepository;
    private final TransactionRepository transactionRepository;

    // Runs every minute
    @Scheduled(cron = "0 * * * * ?")
    @Transactional
    public void processScheduledIncomes() {
        log.info("Income Scheduler triggered at: {}", java.time.LocalDateTime.now());
        LocalDate today = LocalDate.now();
        List<Income> allIncomes = incomeRepository.findAll();

        for (Income income : allIncomes) {
            if (income.getNextPayDay() != null && income.getNextPayDay().isEqual(today)) {
                // 1. Create Transaction
                createTransactionFromIncome(income, today);

                // 2. Update Next Pay Day
                updateNextPayDay(income);

                // 3. Save updates
                incomeRepository.save(income);
            }
        }
    }

    private void createTransactionFromIncome(Income income, LocalDate date) {
        Transaction transaction = new Transaction();
        transaction.setAmount(income.getAmount());
        transaction.setDescription("Auto-generated income: " + income.getName());
        transaction.setCategory("Salary"); // Or "Income"
        transaction.setPaymentSource(income.getName());
        transaction.setDate(date);
        transaction.setType(TransactionType.INCOME);
        transaction.setUser(income.getUser());

        transactionRepository.save(transaction);
        System.out.println("Generated transaction for income: " + income.getName());
    }

    private void updateNextPayDay(Income income) {
        if (income.getFrequency() == null)
            return;

        LocalDate current = income.getNextPayDay();
        LocalDate next = current;

        switch (income.getFrequency()) {
            case WEEKLY:
                next = current.plusWeeks(1);
                break;
            case BIWEEKLY:
                next = current.plusWeeks(2);
                break;
            case MONTHLY:
                next = current.plusMonths(1);
                break;
            case ONE_TIME:
                // For one-time, maybe we don't update or set to null?
                // Leaving it as is implies it triggers once and stays there?
                // Or user deletes it. Let's set it to null to prevent re-triggering.
                next = null;
                break;
        }
        income.setNextPayDay(next);
    }
}
