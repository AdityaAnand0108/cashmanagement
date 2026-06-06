package com.cashiq.cashmanagement.services.income;

import com.cashiq.cashmanagement.dto.IncomeDTO;
import com.cashiq.cashmanagement.entity.Income;
import com.cashiq.cashmanagement.entity.Users;
import com.cashiq.cashmanagement.exception.AccessDeniedException;
import com.cashiq.cashmanagement.exception.IncomeNotFoundException;
import com.cashiq.cashmanagement.exception.UserNotFoundException;
import com.cashiq.cashmanagement.repository.IncomeRepository;
import com.cashiq.cashmanagement.repository.UserRepository;
import com.cashiq.cashmanagement.validation.IncomeValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of CashIQIncomeService.
 * The authenticated user is resolved from the Spring Security context on every
 * mutating operation so the frontend never needs to send the userId explicitly.
 *
 * @author Aditya
 * @version 1.0
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CashIQIncomeServiceImpl implements CashIQIncomeService {

    private final IncomeRepository incomeRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final IncomeValidator incomeValidator;

    /**
     * Resolves the currently authenticated user from the Spring Security context.
     * Throws UserNotFoundException if the username is not found in the database.
     */
    private Users getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    @Override
    public void addIncome(IncomeDTO incomeDTO) {
        log.info("Attempting to add income: {}", incomeDTO);
        incomeValidator.validateIncome(incomeDTO);

        Income income = modelMapper.map(incomeDTO, Income.class);
        income.setUser(getCurrentUser());

        incomeRepository.save(income);
        log.info("Income source added successfully, ID: {}", income.getId());
    }

    @Override
    public void updateIncome(Long id, IncomeDTO incomeDTO) {
        log.info("Attempting to update income ID: {}", id);
        incomeValidator.validateIncome(incomeDTO);

        Income mapped = modelMapper.map(incomeDTO, Income.class);
        Income existing = incomeRepository.findById(id)
                .orElseThrow(() -> new IncomeNotFoundException("Income not found"));

        // Update only the fields that the user is allowed to change
        existing.setName(mapped.getName());
        existing.setAmount(mapped.getAmount());
        existing.setFrequency(mapped.getFrequency());
        existing.setNextPayDay(mapped.getNextPayDay());
        existing.setIsFixed(mapped.getIsFixed());
        existing.setIcon(mapped.getIcon());

        incomeRepository.save(existing);
        log.info("Income source updated successfully for ID: {}", id);
    }

    @Override
    public List<IncomeDTO> getAllIncomes() {
        Users user = getCurrentUser();
        log.info("Fetching all incomes for user: {}", user.getUsername());

        List<Income> incomes = incomeRepository.findByUserId(user.getId());
        log.info("Found {} income sources for user: {}", incomes.size(), user.getUsername());

        return incomes.stream()
                .map(i -> modelMapper.map(i, IncomeDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteIncome(Long id) {
        log.info("Attempting to delete income ID: {}", id);
        Users user = getCurrentUser();

        Income income = incomeRepository.findById(id)
                .orElseThrow(() -> new IncomeNotFoundException("Income not found"));

        // Ownership check — users may only delete their own income sources
        if (!income.getUser().getId().equals(user.getId())) {
            log.warn("Unauthorized attempt to delete income ID: {} by user: {}", id, user.getUsername());
            throw new AccessDeniedException("Access Denied: You do not own this income source");
        }

        incomeRepository.delete(income);
        log.info("Income source deleted successfully for ID: {}", id);
    }
}
