package com.cashiq.cashmanagement.validation;

import com.cashiq.cashmanagement.dto.SavingGoalDTO;
import org.springframework.stereotype.Component;
import java.time.LocalDate;

@Component
public class SavingGoalValidator {

    public void validateSavingGoal(SavingGoalDTO savingGoalDTO) {
        if (savingGoalDTO.getGoalName() == null || savingGoalDTO.getGoalName().trim().isEmpty()) {
            throw new RuntimeException("Goal name cannot be empty");
        }
        if (savingGoalDTO.getTargetAmount() == null || savingGoalDTO.getTargetAmount() <= 0) {
            throw new RuntimeException("Target amount must be greater than zero");
        }
        if (savingGoalDTO.getTargetDate() == null) {
            throw new RuntimeException("Target date is required");
        }
        if (savingGoalDTO.getTargetDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Target date cannot be in the past");
        }
    }
}
