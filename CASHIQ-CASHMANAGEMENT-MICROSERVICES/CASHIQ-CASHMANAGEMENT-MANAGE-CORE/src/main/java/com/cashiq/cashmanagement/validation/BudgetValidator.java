package com.cashiq.cashmanagement.validation;

import com.cashiq.cashmanagement.dto.BudgetDTO;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

/**
 * @author - Aditya
 * @version - 1.0
 * @Description - This class is used to validate the budget
 */
@Component
public class BudgetValidator {

    public void validateBudget(BudgetDTO budgetDTO) {
        if (budgetDTO.getCategory() == null) {
            throw new RuntimeException("Category cannot be null");
        }
        if (budgetDTO.getLimitAmount() == null || budgetDTO.getLimitAmount() <= 0) {
            throw new RuntimeException("Limit amount must be greater than zero");
        }

        if ("CUSTOM".equalsIgnoreCase(budgetDTO.getPeriodType())) {
            if (budgetDTO.getStartDate() == null) {
                throw new RuntimeException("Start date is required for custom period");
            }
            if (budgetDTO.getEndDate() == null) {
                throw new RuntimeException("End date is required for custom period");
            }
            if (budgetDTO.getStartDate().isAfter(budgetDTO.getEndDate())) {
                throw new RuntimeException("Start date cannot be after end date");
            }
            if (budgetDTO.getStartDate().isBefore(LocalDate.now())) {
                // Optional: decide if past dates are allowed.
                // For now, let's allow it as users might want to backdate budgets or track
                // historical data.
            }
        }
    }
}
