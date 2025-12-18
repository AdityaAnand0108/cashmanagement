package com.cashiq.cashmanagement.services.implementation;

import com.cashiq.cashmanagement.dto.IncomeDTO;
import com.cashiq.cashmanagement.entity.Income;
import com.cashiq.cashmanagement.entity.Users;
import com.cashiq.cashmanagement.repository.IncomeRepository;
import com.cashiq.cashmanagement.repository.UserRepository;
import com.cashiq.cashmanagement.services.IncomeService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.cashiq.cashmanagement.exception.IncomeNotFoundException;
import com.cashiq.cashmanagement.exception.UserNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author - Aditya
 * @version - 1.0
 * @description - This class is used to handle income-related operations.
 */
@Service
@RequiredArgsConstructor
public class IncomeServiceImpl implements IncomeService {

    private final IncomeRepository incomeRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    /**
     * @method - addIncome
     * @param - IncomeDTO
     * @return - String
     * @Description - This method is used to add the income
     */
    @Override
    public ResponseEntity<String> addIncome(IncomeDTO incomeDTO) {
        Income income = modelMapper.map(incomeDTO, Income.class);

        // Get current logged in user
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        income.setUser(user);

        incomeRepository.save(income);
        return ResponseEntity.ok("Income source added successfully");
    }

    /**
     * @method - updateIncome
     * @param - IncomeDTO
     * @return - String
     * @Description - This method is used to update the income
     */
    @Override
    public ResponseEntity<String> updateIncome(Long id, IncomeDTO incomeDTO) {
        Income income = modelMapper.map(incomeDTO, Income.class);

        // Get current logged in user
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        Income existingIncome = incomeRepository.findById(id)
                .orElseThrow(() -> new IncomeNotFoundException("Income not found"));

        existingIncome.setName(income.getName());
        existingIncome.setAmount(income.getAmount());
        existingIncome.setFrequency(income.getFrequency());
        existingIncome.setNextPayDay(income.getNextPayDay());
        existingIncome.setIsFixed(income.getIsFixed());

        incomeRepository.save(income);
        return ResponseEntity.ok("Income source updated successfully");
    }

    /**
     * @method - getAllIncomes
     * @param - None
     * @return - List<IncomeDTO>
     * @Description - This method is used to get all the incomes
     */
    @Override
    public ResponseEntity<List<IncomeDTO>> getAllIncomes() {
        // Get current logged in user
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        List<Income> incomes = incomeRepository.findByUserId(user.getId());

        return ResponseEntity.ok(incomes.stream()
                .map(income -> modelMapper.map(income, IncomeDTO.class))
                .collect(Collectors.toList()));
    }
}
