package com.cashiq.cashmanagement.services.implementation;

import com.cashiq.cashmanagement.dto.IncomeDTO;
import com.cashiq.cashmanagement.entity.Income;
import com.cashiq.cashmanagement.entity.Users;
import com.cashiq.cashmanagement.repository.IncomeRepository;
import com.cashiq.cashmanagement.repository.UserRepository;
import com.cashiq.cashmanagement.services.IncomeService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IncomeServiceImpl implements IncomeService {

    private final IncomeRepository incomeRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public String addIncome(IncomeDTO incomeDTO) {
        Income income = modelMapper.map(incomeDTO, Income.class);

        // Get current logged in user
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        income.setUser(user);

        incomeRepository.save(income);
        return "Income source added successfully";
    }

    @Override
    public List<IncomeDTO> getAllIncomes() {
        // Get current logged in user
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Income> incomes = incomeRepository.findByUserId(user.getId());

        return incomes.stream()
                .map(income -> modelMapper.map(income, IncomeDTO.class))
                .collect(Collectors.toList());
    }
}
