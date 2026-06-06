package com.cashiq.cashmanagement.services.budget;

import com.cashiq.cashmanagement.dto.BudgetDTO;
import com.cashiq.cashmanagement.entity.Budget;
import com.cashiq.cashmanagement.entity.Users;
import com.cashiq.cashmanagement.enums.PeriodType;
import com.cashiq.cashmanagement.exception.AccessDeniedException;
import com.cashiq.cashmanagement.exception.BudgetNotFoundException;
import com.cashiq.cashmanagement.exception.UserNotFoundException;
import com.cashiq.cashmanagement.repository.BudgetRepository;
import com.cashiq.cashmanagement.repository.TransactionRepository;
import com.cashiq.cashmanagement.repository.UserRepository;
import com.cashiq.cashmanagement.util.StringUtils;
import com.cashiq.cashmanagement.validation.BudgetValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Implementation of CashIQBudgetService.
 *
 * Key design decisions:
 * - getUserBudgets uses a single GROUP BY aggregation query to get spend per category,
 *   avoiding an N+1 database hit (one query per budget) that existed before.
 * - Custom-period budgets fall back to individual queries because they have
 *   different date ranges and are uncommon — batching them adds complexity for little gain.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CashIQBudgetServiceImpl implements CashIQBudgetService {

    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;
    private final BudgetValidator budgetValidator;
    private final TransactionRepository transactionRepository;

    @Override
    public void createBudget(Long userId, BudgetDTO budgetDTO) {
        log.info("Creating budget for user: {} with category: {}", userId, budgetDTO.getCategory());
        budgetValidator.validateBudget(budgetDTO);

        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id :: " + userId));

        // Upsert: reuse the existing budget for the same category if one exists
        Optional<Budget> existing = budgetRepository.findByUsersIdAndCategory(userId, budgetDTO.getCategory());
        Budget budget = existing.orElseGet(() -> {
            Budget b = new Budget();
            b.setUsers(user);
            b.setCategory(budgetDTO.getCategory());
            return b;
        });

        budget.setLimitAmount(budgetDTO.getLimitAmount());
        budget.setPeriodType(budgetDTO.getPeriodType());

        LocalDate start, end;
        if (PeriodType.CUSTOM == budgetDTO.getPeriodType()) {
            start = budgetDTO.getStartDate();
            end = budgetDTO.getEndDate();
        } else {
            // Default to the current calendar month for MONTHLY budgets
            LocalDate now = LocalDate.now();
            start = now.with(TemporalAdjusters.firstDayOfMonth());
            end = now.with(TemporalAdjusters.lastDayOfMonth());
        }
        budget.setStartDate(start);
        budget.setEndDate(end);

        budgetRepository.save(budget);
        log.info("Budget saved successfully with ID: {}", budget.getId());
    }

    @Override
    public void updateBudget(Long userId, Long budgetId, BudgetDTO budgetDTO) {
        log.info("Updating budget ID: {} for user: {}", budgetId, userId);
        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new BudgetNotFoundException("Budget not found with id :: " + budgetId));

        // Ownership check — a user must not be able to modify another user's budget
        if (!budget.getUsers().getId().equals(userId)) {
            log.warn("Access denied for user: {} to update budget: {}", userId, budgetId);
            throw new AccessDeniedException("Access Denied: You cannot update this budget");
        }

        budget.setLimitAmount(budgetDTO.getLimitAmount());
        budget.setPeriodType(budgetDTO.getPeriodType());
        budgetRepository.save(budget);
        log.info("Budget updated successfully: {}", budgetId);
    }

    @Override
    public void deleteBudget(Long userId, Long budgetId) {
        log.info("Deleting budget ID: {} for user: {}", budgetId, userId);
        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new BudgetNotFoundException("Budget not found with id :: " + budgetId));

        // Ownership check — a user must not be able to delete another user's budget
        if (!budget.getUsers().getId().equals(userId)) {
            log.warn("Access denied for user: {} to delete budget: {}", userId, budgetId);
            throw new AccessDeniedException("Access Denied: You cannot delete this budget");
        }

        budgetRepository.delete(budget);
        log.info("Budget deleted successfully: {}", budgetId);
    }

    @Override
    public List<BudgetDTO> getUserBudgets(Long userId) {
        log.info("Fetching budgets for user: {}", userId);
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id :: " + userId));

        List<Budget> budgets = budgetRepository.findByUsersId(userId);

        // Calculate the current month date range once — shared by all MONTHLY budgets
        LocalDate now = LocalDate.now();
        LocalDate monthStart = now.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate monthEnd = now.with(TemporalAdjusters.lastDayOfMonth());

        // Single aggregation query to get total spend per category for this month.
        // This replaces the old approach of firing one query per budget (N+1 problem).
        Map<String, Double> spendByCategory = transactionRepository
                .sumAmountByCategoryForUserAndDateBetween(user, monthStart, monthEnd)
                .stream()
                .collect(Collectors.toMap(row -> (String) row[0], row -> (Double) row[1]));

        return budgets.stream().map(b -> {
            BudgetDTO dto = new BudgetDTO();
            dto.setId(b.getId());
            dto.setUserId(userId);
            dto.setCategory(b.getCategory());
            dto.setLimitAmount(b.getLimitAmount());

            PeriodType periodType = b.getPeriodType() != null ? b.getPeriodType() : PeriodType.MONTHLY;

            LocalDate queryStart, queryEnd;
            if (PeriodType.CUSTOM == periodType) {
                // Custom budgets have their own unique date range — query individually
                queryStart = b.getStartDate();
                queryEnd = b.getEndDate();
                String searchCategory = StringUtils.toTitleCase(b.getCategory().name());
                double spent = transactionRepository
                        .findByUserAndCategoryAndDateBetween(user, searchCategory, queryStart, queryEnd)
                        .stream().mapToDouble(t -> t.getAmount()).sum();
                dto.setSpentAmount(spent);
            } else {
                // MONTHLY budgets — use the pre-fetched aggregation map
                queryStart = monthStart;
                queryEnd = monthEnd;
                String searchCategory = StringUtils.toTitleCase(b.getCategory().name());
                dto.setSpentAmount(spendByCategory.getOrDefault(searchCategory, 0.0));
            }

            dto.setStartDate(queryStart);
            dto.setEndDate(queryEnd);
            dto.setRemainingAmount(b.getLimitAmount() - dto.getSpentAmount());

            // Status thresholds: >100% = Exceeded, >85% = At Risk, otherwise On Track
            double percent = (dto.getSpentAmount() / b.getLimitAmount()) * 100;
            if (percent > 100) {
                dto.setStatus("Exceeded");
            } else if (percent > 85) {
                dto.setStatus("At Risk");
            } else {
                dto.setStatus("On Track");
            }

            return dto;
        }).collect(Collectors.toList());
    }
}
