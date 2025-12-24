package com.cashiq.cashmanagement.services;

import com.cashiq.cashmanagement.dto.SavingGoalDTO;
import org.springframework.http.ResponseEntity;
import java.util.List;

public interface SavingGoalService {

    ResponseEntity<?> createGoal(Long userId, SavingGoalDTO goalDTO);

    ResponseEntity<?> addFunds(Long userId, Long goalId, Double amount);

    ResponseEntity<List<SavingGoalDTO>> getUserGoals(Long userId);

    ResponseEntity<?> deleteGoal(Long userId, Long goalId);
}
