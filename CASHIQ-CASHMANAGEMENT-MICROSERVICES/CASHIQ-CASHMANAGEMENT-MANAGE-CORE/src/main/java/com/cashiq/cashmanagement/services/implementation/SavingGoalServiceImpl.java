package com.cashiq.cashmanagement.services.implementation;

import com.cashiq.cashmanagement.dto.SavingGoalDTO;
import com.cashiq.cashmanagement.entity.SavingGoal;
import com.cashiq.cashmanagement.entity.Users;
import com.cashiq.cashmanagement.exception.ResourceNotFoundException;
import com.cashiq.cashmanagement.exception.UserNotFoundException;
import com.cashiq.cashmanagement.repository.SavingGoalRepository;
import com.cashiq.cashmanagement.repository.UserRepository;
import com.cashiq.cashmanagement.services.SavingGoalService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class SavingGoalServiceImpl implements SavingGoalService {

    @Autowired
    private SavingGoalRepository savingGoalRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private com.cashiq.cashmanagement.validation.SavingGoalValidator savingGoalValidator;

    /**
     * Creates a new saving goal for a user.
     *
     * @param userId  The ID of the user.
     * @param goalDTO The saving goal data to create.
     * @return A ResponseEntity containing a success message.
     */
    @Override
    public ResponseEntity<?> createGoal(Long userId, SavingGoalDTO goalDTO) {
        log.info("Creating saving goal for user: {}", userId);
        savingGoalValidator.validateSavingGoal(goalDTO);

        Optional<Users> userOpt = userRepository.findById(userId);

        if (userOpt.isEmpty()) {
            throw new UserNotFoundException("User not found with id :: " + userId);
        }

        SavingGoal goal = modelMapper.map(goalDTO, SavingGoal.class);
        goal.setUsers(userOpt.get());
        goal.setCurrentAmount(0.0); // Initial amount is 0
        goal.setStatus("IN_PROGRESS");

        savingGoalRepository.save(goal);
        log.info("Saving goal saved successfully with ID: {}", goal.getId());
        return ResponseEntity.ok("Saving goal created successfully");
    }

    /**
     * Adds funds to an existing saving goal.
     *
     * @param userId The ID of the user.
     * @param goalId The ID of the saving goal.
     * @param amount The amount to add.
     * @return A ResponseEntity containing a success message.
     */
    @Override
    public ResponseEntity<?> addFunds(Long userId, Long goalId, Double amount) {
        log.info("Adding funds to goal ID: {} for user: {}", goalId, userId);
        Optional<SavingGoal> goalOpt = savingGoalRepository.findById(goalId);

        if (goalOpt.isEmpty()) {
            throw new ResourceNotFoundException("Saving goal not found with id :: " + goalId);
        }

        SavingGoal goal = goalOpt.get();
        if (!goal.getUsers().getId().equals(userId)) {
            log.warn("Access denied for user: {} to update goal: {}", userId, goalId);
            throw new RuntimeException("Access Denied: You cannot update this goal");
        }

        double newAmount = goal.getCurrentAmount() + amount;
        goal.setCurrentAmount(newAmount);

        // Update status if goal reached
        if (newAmount >= goal.getTargetAmount()) {
            goal.setStatus("COMPLETED");
        }

        savingGoalRepository.save(goal);
        log.info("Funds added successfully to goal: {}", goalId);
        return ResponseEntity.ok("Funds added successfully");
    }

    /**
     * Retrieves all saving goals for a user.
     *
     * @param userId The ID of the user.
     * @return A ResponseEntity containing a list of SavingGoalDTO objects.
     */
    @Override
    public ResponseEntity<List<SavingGoalDTO>> getUserGoals(Long userId) {
        log.info("Fetching saving goals for user: {}", userId);
        List<SavingGoal> goals = savingGoalRepository.findByUsersId(userId);

        List<SavingGoalDTO> dtos = goals.stream()
                .map(g -> modelMapper.map(g, SavingGoalDTO.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    /**
     * Deletes a saving goal.
     *
     * @param userId The ID of the user.
     * @param goalId The ID of the saving goal to delete.
     * @return A ResponseEntity containing a success message.
     */
    @Override
    public ResponseEntity<?> deleteGoal(Long userId, Long goalId) {
        log.info("Deleting saving goal ID: {} for user: {}", goalId, userId);
        Optional<SavingGoal> goalOpt = savingGoalRepository.findById(goalId);

        if (goalOpt.isEmpty()) {
            throw new ResourceNotFoundException("Saving goal not found with id :: " + goalId);
        }

        SavingGoal goal = goalOpt.get();
        if (!goal.getUsers().getId().equals(userId)) {
            log.warn("Access denied for user: {} to delete goal: {}", userId, goalId);
            throw new RuntimeException("Access Denied: You cannot delete this goal");
        }

        savingGoalRepository.delete(goal);
        log.info("Saving goal deleted successfully: {}", goalId);
        return ResponseEntity.ok("Saving goal deleted successfully");
    }
}
