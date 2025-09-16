package com.cash_management.cashmanagement.service.impl;

import com.cash_management.cashmanagement.dto.DailyexpensesDTO;
import com.cash_management.cashmanagement.entity.Dailyexpenses;
import com.cash_management.cashmanagement.repository.DailyexpensesRepository;
import com.cash_management.cashmanagement.service.DailyexpensesService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DailyexpensesServiceImpl implements DailyexpensesService {

    private final DailyexpensesRepository dailyexpensesRepository;
    private final SpendingServiceImpl spendingService; // or SpendingService interface
    private final ModelMapper modelMapper;

    @Override
    public List<DailyexpensesDTO> getAllExpenses() {
        List<Dailyexpenses> dailyexpenses= dailyexpensesRepository.findAll();
        // Here you would typically convert the List<Dailyexpenses> to List<DailyexpensesDTO
        List<DailyexpensesDTO> dailyexpensesDTOList = dailyexpenses.stream().map(dailyexpense -> modelMapper.map(dailyexpense, DailyexpensesDTO.class)).toList();

        return dailyexpensesDTOList;
    }

    @Override
    @Transactional
    public DailyexpensesDTO addExpense(DailyexpensesDTO dailyexpensesDTO) {
        Dailyexpenses newExpense = modelMapper.map(dailyexpensesDTO, Dailyexpenses.class);
        Dailyexpenses saved = dailyexpensesRepository.save(newExpense);
        // recalc for the saved date
        spendingService.recalcAndSaveForDate(saved.getDate());
        return modelMapper.map(saved, DailyexpensesDTO.class);
    }

    @Override
    @Transactional
    public DailyexpensesDTO updateExpense(Long id, DailyexpensesDTO dailyexpensesDTO) {
        Dailyexpenses existing = dailyexpensesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));

        LocalDate oldDate = existing.getDate();

        // map DTO to entity but preserve id
        Dailyexpenses updated = modelMapper.map(dailyexpensesDTO, Dailyexpenses.class);
        updated.setDailyexpensesId(existing.getDailyexpensesId());
        Dailyexpenses saved = dailyexpensesRepository.save(updated);

        // Recalculate for old date (if changed) and for new date
        if (!oldDate.equals(saved.getDate())) {
            spendingService.recalcAndSaveForDate(oldDate);
        }
        spendingService.recalcAndSaveForDate(saved.getDate());

        return modelMapper.map(saved, DailyexpensesDTO.class);
    }

    @Override
    public List<DailyexpensesDTO> getExpensesByCategory(String category) {
        List<Dailyexpenses> dailyexpensesList = dailyexpensesRepository.findAll().stream()
                .filter(expense -> expense.getCategory().name().equalsIgnoreCase(category))
                .toList();
        return dailyexpensesList.stream().map(expense -> modelMapper.map(expense, DailyexpensesDTO.class)).toList();

    @Override
    @Transactional
    public void deleteExpense(Long id) {
        Dailyexpenses existing = dailyexpensesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));
        LocalDate date = existing.getDate();
        dailyexpensesRepository.deleteById(id);
        // recalc for that date
        spendingService.recalcAndSaveForDate(date);
    }
}
