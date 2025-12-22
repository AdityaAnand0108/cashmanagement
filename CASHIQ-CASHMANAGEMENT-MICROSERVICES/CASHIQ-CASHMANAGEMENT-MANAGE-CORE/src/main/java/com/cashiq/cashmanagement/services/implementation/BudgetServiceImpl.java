package com.cashiq.cashmanagement.services.implementation;

import com.cashiq.cashmanagement.dto.BudgetDTO;
import com.cashiq.cashmanagement.entity.Budget;
import com.cashiq.cashmanagement.entity.Transaction;
import com.cashiq.cashmanagement.entity.Users;
import com.cashiq.cashmanagement.repository.BudgetRepository;
import com.cashiq.cashmanagement.repository.TransactionRepository;
import com.cashiq.cashmanagement.repository.UserRepository;
import com.cashiq.cashmanagement.services.BudgetService;
import com.cashiq.cashmanagement.exception.BudgetNotFoundException;
import com.cashiq.cashmanagement.exception.UserNotFoundException;
import com.cashiq.cashmanagement.util.StringUtils;
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

    /**
     * Creates a new budget for a user.
     * 
     * @param userId    The ID of the user.
     * @param budgetDTO The budget data to create.
     * @returns A ResponseEntity containing a string message.
     */
    @Override
    public ResponseEntity<?> createBudget(Long userId, BudgetDTO budgetDTO) {
        Optional<Users> userOpt = userRepository.findById(userId);

        if (userOpt.isEmpty()) {
            throw new UserNotFoundException("User not found with id :: " + userId);
        }
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

    /**
     * Updates an existing budget for a user.
     * 
     * @param userId    The ID of the user.
     * @param budgetId  The ID of the budget to update.
     * @param budgetDTO The budget data to update.
     * @returns A ResponseEntity containing a string message.
     */
    @Override
    public ResponseEntity<?> updateBudget(Long userId, Long budgetId, BudgetDTO budgetDTO) {
        Optional<Budget> budgetOpt = budgetRepository.findById(budgetId);
        if (budgetOpt.isEmpty()) {
            throw new BudgetNotFoundException("Budget not found with id :: " + budgetId);
        }
        Budget budget = budgetOpt.get();
        if (!budget.getUsers().getId().equals(userId)) {
            throw new RuntimeException("Access Denied: You cannot update this budget");
        }

        budget.setLimitAmount(budgetDTO.getLimitAmount());
        // Potential update to dates if needed
        budgetRepository.save(budget);
        return ResponseEntity.ok("Budget updated");
    }

    /**
     * Deletes an existing budget for a user.
     * 
     * @param userId   The ID of the user.
     * @param budgetId The ID of the budget to delete.
     * @returns A ResponseEntity containing a string message.
     */
    @Override
    public ResponseEntity<?> deleteBudget(Long userId, Long budgetId) {
        Optional<Budget> budgetOpt = budgetRepository.findById(budgetId);
        if (budgetOpt.isEmpty()) {
            throw new BudgetNotFoundException("Budget not found with id :: " + budgetId);
        }
        Budget budget = budgetOpt.get();
        if (!budget.getUsers().getId().equals(userId)) {
            throw new RuntimeException("Access Denied: You cannot delete this budget");
        }

        budgetRepository.delete(budget);
        return ResponseEntity.ok("Budget deleted successfully");
    }

    /**
     * Retrieves all budgets for a user.
     * 
     * @param userId The ID of the user.
     * @returns A ResponseEntity containing a list of BudgetDTO objects.
     */
    @Override
    public ResponseEntity<List<BudgetDTO>> getUserBudgets(Long userId) {
        List<Budget> budgets = budgetRepository.findByUsersId(userId);
        Optional<Users> userOpt = userRepository.findById(userId);

        if (userOpt.isEmpty()) {
            throw new UserNotFoundException("User not found with id :: " + userId);
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

            String searchCategory = StringUtils.toTitleCase(b.getCategory().name());

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

}
