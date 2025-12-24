package com.cashiq.cashmanagement.controllers;

import com.cashiq.cashmanagement.dto.SavingGoalDTO;
import com.cashiq.cashmanagement.services.SavingGoalService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author - Aditya
 * @version - 1.0
 * @description - This class is used to handle saving goal-related operations.
 */
@RestController
@RequestMapping("/api/saving-goals")
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class SavingGoalController {

    @Autowired
    private SavingGoalService savingGoalService;

    /**
     * @method - createGoal
     * @param - userId, goalDTO
     * @return - ResponseEntity<?>
     * @Description - This method is used to create a saving goal
     */
    @PostMapping("/{userId}")
    public ResponseEntity<?> createGoal(@PathVariable Long userId, @RequestBody SavingGoalDTO goalDTO) {
        log.info("Request to create saving goal for user: {}", userId);
        return savingGoalService.createGoal(userId, goalDTO);
    }

    /**
     * @method - addFunds
     * @param - userId, goalId, amount
     * @return - ResponseEntity<?>
     * @Description - This method is used to add funds to a saving goal
     */
    @PutMapping("/{userId}/{goalId}/add-funds")
    public ResponseEntity<?> addFunds(@PathVariable Long userId, @PathVariable Long goalId,
            @RequestParam Double amount) {
        log.info("Request to add funds: {} to goal: {} for user: {}", amount, goalId, userId);
        return savingGoalService.addFunds(userId, goalId, amount);
    }

    /**
     * @method - getUserGoals
     * @param - userId
     * @return - ResponseEntity<List<SavingGoalDTO>>
     * @Description - This method is used to get all saving goals for a user
     */
    @GetMapping("/{userId}")
    public ResponseEntity<List<SavingGoalDTO>> getUserGoals(@PathVariable Long userId) {
        log.info("Fetching saving goals for user: {}", userId);
        return savingGoalService.getUserGoals(userId);
    }

    /**
     * @method - deleteGoal
     * @param - userId, goalId
     * @return - ResponseEntity<?>
     * @Description - This method is used to delete a saving goal
     */
    @DeleteMapping("/{userId}/{goalId}")
    public ResponseEntity<?> deleteGoal(@PathVariable Long userId, @PathVariable Long goalId) {
        log.info("Request to delete saving goal: {} for user: {}", goalId, userId);
        return savingGoalService.deleteGoal(userId, goalId);
    }
}
