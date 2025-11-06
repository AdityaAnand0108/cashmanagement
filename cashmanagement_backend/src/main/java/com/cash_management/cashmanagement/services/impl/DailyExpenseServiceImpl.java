package com.cash_management.cashmanagement.services.impl;

import com.cash_management.cashmanagement.dtos.DailyExpenseDTO;
import com.cash_management.cashmanagement.entities.DailyExpense;
import com.cash_management.cashmanagement.repositories.DailyexpensesRepository;
import com.cash_management.cashmanagement.services.DailyExpenseService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DailyExpenseServiceImpl implements DailyExpenseService {

    private final DailyexpensesRepository dailyexpensesRepository;
    private final SpendingServiceImpl spendingService; // or SpendingService interface
    private final ModelMapper modelMapper;

    @Override
    public List<DailyExpenseDTO> getAllExpenses() {
        List<DailyExpense> dailyexpens = dailyexpensesRepository.findAll();
        // Here you would typically convert the List<Dailyexpenses> to List<DailyexpensesDTO
        List<DailyExpenseDTO> dailyExpenseDTOList = dailyexpens.stream().map(dailyexpense -> modelMapper.map(dailyexpense, DailyExpenseDTO.class)).toList();

        return dailyExpenseDTOList;
    }

    @Override
    public DailyExpenseDTO getExpenseById(Long id){
        DailyExpense expenseID = dailyexpensesRepository.findById(id)
        DailyExpense expense = dailyexpensesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));
        return
        return modelMapper.map(expense, DailyExpenseDTO.class);
    }

    @Override
    @Transactional
    public DailyExpenseDTO addExpense(DailyExpenseDTO dailyExpenseDTO) {
        DailyExpense newExpense = modelMapper.map(dailyExpenseDTO, DailyExpense.class);
        LocalDate date = newExpense.getDate();

        // ensure parent record exists (create if necessary) before inserting the child
        spendingService.recalcAndSaveForDate(date);

        DailyExpense saved = dailyexpensesRepository.save(newExpense);

        // recalc totals now that the child exists
        spendingService.recalcAndSaveForDate(saved.getDate());

        return modelMapper.map(saved, DailyExpenseDTO.class);
    }

    @Override
    @Transactional
    public DailyExpenseDTO updateExpense(Long id, DailyExpenseDTO dailyExpenseDTO) {
        DailyExpense existing = dailyexpensesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));

        LocalDate oldDate = existing.getDate();

        // map DTO to entity but preserve id
        DailyExpense updated = modelMapper.map(dailyExpenseDTO, DailyExpense.class);
        updated.setDailyexpensesId(existing.getDailyexpensesId());
        DailyExpense saved = dailyexpensesRepository.save(updated);

        // Recalculate for old date (if changed) and for new date
        if (!oldDate.equals(saved.getDate())) {
            spendingService.recalcAndSaveForDate(oldDate);
        }
        spendingService.recalcAndSaveForDate(saved.getDate());

        return modelMapper.map(saved, DailyExpenseDTO.class);
    }

    @Override
    public List<DailyExpenseDTO> getExpensesByCategory(String category) {
        List<DailyExpense> dailyExpenseList = dailyexpensesRepository.findAll().stream()
                .filter(expense -> expense.getCategory().name().equalsIgnoreCase(category))
                .toList();
        return dailyExpenseList.stream().map(expense -> modelMapper.map(expense, DailyExpenseDTO.class)).toList();
    }

    @Override
    @Transactional
    public void deleteExpense(Long id) {
        DailyExpense existing = dailyexpensesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));
        LocalDate date = existing.getDate();
        dailyexpensesRepository.deleteById(id);
        // recalc for that date
        spendingService.recalcAndSaveForDate(date);
    }
}
