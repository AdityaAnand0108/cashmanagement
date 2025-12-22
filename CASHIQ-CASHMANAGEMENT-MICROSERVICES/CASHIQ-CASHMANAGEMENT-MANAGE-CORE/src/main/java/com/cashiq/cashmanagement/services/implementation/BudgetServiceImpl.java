package com.cashiq.cashmanagement.services.implementation;

import com.cashiq.cashmanagement.dto.BudgetDTO;
import com.cashiq.cashmanagement.entity.Budget;
import com.cashiq.cashmanagement.entity.Transaction;
import com.cashiq.cashmanagement.entity.Users;
import com.cashiq.cashmanagement.repository.BudgetRepository;
import com.cashiq.cashmanagement.repository.TransactionRepository;
import com.cashiq.cashmanagement.repository.UserRepository;
import com.cashiq.cashmanagement.services.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BudgetServiceImpl implements BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public ResponseEntity<?> createBudget(Long userId, BudgetDTO budgetDTO) {
        Optional<Users> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        // Check if budget for this category already exists?
        // Logic: For now, we allow overwriting or maybe we should block.
        // Let's check if there is an active budget for this category.
        Optional<Budget> existing = budgetRepository.findByUsersIdAndCategory(userId, budgetDTO.getCategory());
        Budget budget;
        if (existing.isPresent()) {
            budget = existing.get();
        } else {
            budget = new Budget();
            budget.setUsers(userOpt.get());
            budget.setCategory(budgetDTO.getCategory());
        }

        budget.setLimitAmount(budgetDTO.getLimitAmount());

        LocalDate start, end;
        if ("CUSTOM".equalsIgnoreCase(budgetDTO.getPeriodType())) {
            start = budgetDTO.getStartDate();
            end = budgetDTO.getEndDate();
        } else {
            // Default Monthly: First day to last day of current month
            LocalDate now = LocalDate.now();
            start = now.with(TemporalAdjusters.firstDayOfMonth());
            end = now.with(TemporalAdjusters.lastDayOfMonth());
        }
        budget.setStartDate(start);
        budget.setEndDate(end);

        budgetRepository.save(budget);
        return ResponseEntity.ok("Budget saved successfully");
    }

    @Override
    public ResponseEntity<?> updateBudget(Long userId, Long budgetId, BudgetDTO budgetDTO) {
        Optional<Budget> budgetOpt = budgetRepository.findById(budgetId);
        if (budgetOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Budget not found");
        }
        Budget budget = budgetOpt.get();
        if (!budget.getUsers().getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }

        budget.setLimitAmount(budgetDTO.getLimitAmount());
        // Potential update to dates if needed
        budgetRepository.save(budget);
        return ResponseEntity.ok("Budget updated");
    }

    @Override
    public ResponseEntity<List<BudgetDTO>> getUserBudgets(Long userId) {
        List<Budget> budgets = budgetRepository.findByUsersId(userId);
        Optional<Users> userOpt = userRepository.findById(userId);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
        Users user = userOpt.get();

        List<BudgetDTO> dtos = budgets.stream().map(b -> {
            BudgetDTO dto = new BudgetDTO();
            dto.setId(b.getId());
            dto.setUserId(userId);
            dto.setCategory(b.getCategory());
            dto.setLimitAmount(b.getLimitAmount());
            dto.setStartDate(b.getStartDate());
            dto.setEndDate(b.getEndDate());

            // Calculate Spent
            // We need to match the Enum Category to the String category in Transaction
            // The enum is like FOOD, the transaction string might be "Food" or similar.
            // Assuming transaction category strings match the friendly names or we do a
            // best effort match.
            // Ideally we should have used Enums for transactions too.
            // For now, let's try to match logic from CategoryType.ts on frontend: keys are
            // uppercase.
            // So we might search for case-insensitive match or mapped values.
            // Let's assume Transaction category is stored as Title Case (e.g. "Food") based
            // on frontend sending string.

            // Actually, we can try to fetch all transactions matching the
            // CategoryType.name() or standard display.
            // Let's try flexible matching. The frontend sends 'Food', 'Rent' etc.
            // The Enum.toString() is 'FOOD', 'RENT'.
            // So we should search for "Food" if enum is FOOD.

            String searchCategory = toTitleCase(b.getCategory().name());
            // However, TransactionRepository queries exact string.
            // We might need to fetch all and filter in memory if casing is an issue,
            // OR ensure we search "Food" for FOOD.

            List<Transaction> txs = transactionRepository.findByUserAndCategoryAndDateBetween(
                    user, searchCategory, b.getStartDate(), b.getEndDate());

            double spent = txs.stream().mapToDouble(Transaction::getAmount).sum();
            dto.setSpentAmount(spent);
            dto.setRemainingAmount(b.getLimitAmount() - spent);

            // Status Logic
            double percent = (spent / b.getLimitAmount()) * 100;
            if (percent > 100) {
                dto.setStatus("Exceeded");
            } else if (percent > 85) {
                dto.setStatus("At Risk");
            } else {
                dto.setStatus("On Track");
            }

            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    private String toTitleCase(String input) {
        if (input == null || input.isEmpty())
            return input;
        return input.substring(0, 1).toUpperCase() + input.substring(1).toLowerCase();
    }
}
