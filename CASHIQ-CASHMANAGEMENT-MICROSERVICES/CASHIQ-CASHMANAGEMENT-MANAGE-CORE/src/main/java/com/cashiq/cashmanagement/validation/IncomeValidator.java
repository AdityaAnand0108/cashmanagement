package com.cashiq.cashmanagement.validation;

import com.cashiq.cashmanagement.dto.IncomeDTO;
import org.springframework.stereotype.Component;

/**
 * @author - Aditya
 * @version - 1.0
 * @Description - This class is used to validate the income
 */
@Component
public class IncomeValidator {

    public void validateIncome(IncomeDTO incomeDTO) {
        if (incomeDTO.getName() == null || incomeDTO.getName().trim().isEmpty()) {
            throw new RuntimeException("Income name cannot be empty");
        }
        if (incomeDTO.getAmount() == null || incomeDTO.getAmount() <= 0) {
            throw new RuntimeException("Amount must be greater than zero");
        }
        if (incomeDTO.getFrequency() == null) {
            throw new RuntimeException("Payment frequency is required");
        }
        if (incomeDTO.getNextPayDay() == null) {
            throw new RuntimeException("Next pay day is required");
        }
    }
}
