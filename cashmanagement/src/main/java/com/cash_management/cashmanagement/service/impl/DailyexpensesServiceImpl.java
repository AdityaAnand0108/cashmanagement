package com.cash_management.cashmanagement.service.impl;

import com.cash_management.cashmanagement.dto.DailyexpensesDTO;
import com.cash_management.cashmanagement.entity.Dailyexpenses;
import com.cash_management.cashmanagement.repository.DailyexpensesRepository;
import com.cash_management.cashmanagement.service.DailyexpensesService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DailyexpensesServiceImpl implements DailyexpensesService {

    private final DailyexpensesRepository dailyexpensesRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<DailyexpensesDTO> getAllExpenses() {
        List<Dailyexpenses> dailyexpenses= dailyexpensesRepository.findAll();
        // Here you would typically convert the List<Dailyexpenses> to List<DailyexpensesDTO
        List<DailyexpensesDTO> dailyexpensesDTOList = dailyexpenses.stream().map(dailyexpense -> modelMapper.map(dailyexpense, DailyexpensesDTO.class)).toList();

        return dailyexpensesDTOList;
    }

    @Override
    public DailyexpensesDTO addExpense(DailyexpensesDTO dailyexpensesDTO) {
        Dailyexpenses newExpense = modelMapper.map(dailyexpensesDTO, Dailyexpenses.class);
        Dailyexpenses dailyexpenses = dailyexpensesRepository.save(newExpense);
        return modelMapper.map(dailyexpenses, DailyexpensesDTO.class);
    }

    @Override
    public void deleteExpense(Long id) {
        dailyexpensesRepository.deleteById(id);
    }

    @Override
    public DailyexpensesDTO updateExpense(Long id, DailyexpensesDTO dailyexpensesDTO) {
        Dailyexpenses currentDailyexpenses = dailyexpensesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));

        Dailyexpenses updatedExpense = modelMapper.map(dailyexpensesDTO, Dailyexpenses.class);
        updatedExpense.setDailyexpensesId(currentDailyexpenses.getDailyexpensesId()); // Ensure the ID remains the same
        Dailyexpenses savedExpense = dailyexpensesRepository.save(updatedExpense);
        return modelMapper.map(savedExpense, DailyexpensesDTO.class);
    }

    @Override
    public List<DailyexpensesDTO> getExpensesByCategory(String category) {
        List<Dailyexpenses> dailyexpensesList = dailyexpensesRepository.findAll().stream()
                .filter(expense -> expense.getCategory().name().equalsIgnoreCase(category))
                .toList();
        return dailyexpensesList.stream().map(expense -> modelMapper.map(expense, DailyexpensesDTO.class)).toList();

    }
}
