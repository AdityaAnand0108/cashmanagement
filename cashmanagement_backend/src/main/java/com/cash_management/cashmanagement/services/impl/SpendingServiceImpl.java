package com.cash_management.cashmanagement.services.impl;

import com.cash_management.cashmanagement.dtos.DailyExpenseDTO;
import com.cash_management.cashmanagement.dtos.SpendingResponseDTO;
import com.cash_management.cashmanagement.entities.DailyExpense;
import com.cash_management.cashmanagement.entities.Spending;
import com.cash_management.cashmanagement.repositories.DailyexpensesRepository;
import com.cash_management.cashmanagement.repositories.SpendingRepository;
import com.cash_management.cashmanagement.services.SpendingService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SpendingServiceImpl implements SpendingService {

    private final DailyexpensesRepository dailyexpensesRepository;
    private final SpendingRepository spendingRepository;
    private final ModelMapper modelMapper;

    /**
     * Input expected examples:
     * - "2025-09" (ISO YearMonth)
     * - "September 2025" or "Sep 2025"
     * - "9" or "09" -> treated as month-of-current-year
     *
     * If parsing fails, it will throw DateTimeParseException.
     */
    @Override
    public Double getTotalSpendingForMonth(int year, int month) {
        YearMonth ym = YearMonth.of(year, month);
        LocalDate startDate = ym.atDay(1);
        LocalDate endDate = ym.atEndOfMonth();

        // Sum directly from Dailyexpenses repository (safer and up-to-date)
        return dailyexpensesRepository
                .findAllByDateBetween(startDate, endDate)
                .stream()
                .mapToDouble(DailyExpense::getAmount)
                .sum();
    }

    /**
     * Returns list of total spending for each day in the month of the given day.
     * E.g. if input is "2023-10-15", returns totals for all days in October 2023.
     */

    @Override
    public List<DailyExpenseDTO> getDailyExpensesForDate(LocalDate date) {
        List<DailyExpense> expenses = dailyexpensesRepository.findAllByDate(date);
        return expenses.stream()
                .map(expense -> modelMapper.map(expense, DailyExpenseDTO.class))
                .toList();
    }


    /**
     * Accepts day in ISO format "yyyy-MM-dd" or "dd-MM-yyyy" or similar.
     * If parsing fails, throws DateTimeParseException.
     */
    @Override
    public SpendingResponseDTO getTotalSpendingForDay(LocalDate date) {
        Spending entity = spendingRepository.findByDate(date);
        if (entity == null) {
            SpendingResponseDTO dto = new SpendingResponseDTO();
            dto.setTotalSpending(0.0);
            return dto;
        }
        return modelMapper.map(entity, SpendingResponseDTO.class);
    }

    /**
     * Recalculate and persist total spending for a single date.
     * Call this after any add/update/delete affecting that date.
     */
    public void recalcAndSaveForDate(LocalDate date) {
        double total = dailyexpensesRepository
                .findAllByDate(date)
                .stream()
                .mapToDouble(DailyExpense::getAmount)
                .sum();

        Spending spending = spendingRepository.findByDate(date);
        if (spending == null) {
            spending = new Spending();
            spending.setDate(date);
        }
        spending.setTotalSpending(total);
        spendingRepository.save(spending);
    }


}
