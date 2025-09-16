package com.cash_management.cashmanagement.services.impl;

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
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;

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
    public Double getTotalSpendingForMonth(String month) {
        YearMonth ym = parseToYearMonth(month);
        LocalDate start = ym.atDay(1);
        LocalDate end = ym.atEndOfMonth();

        Double total = spendingRepository.getTotalSpendingForMonth(start, end);
        return total != null ? total : 0.0;
    }

    /**
     * Accepts day in ISO format "yyyy-MM-dd" or "dd-MM-yyyy" or similar.
     * If parsing fails, throws DateTimeParseException.
     */
    @Override
    public SpendingResponseDTO getTotalSpendingForDay(LocalDate day) {
        // Sum directly from Dailyexpenses repository (safer and up-to-date)
        return modelMapper.map(spendingRepository.findByDate(day), SpendingResponseDTO.class);
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

        spending.setTotalSpending(total);
        spendingRepository.save(spending);
    }

    // --------------------------
    // Helper parsing utilities
    // --------------------------
    private YearMonth parseToYearMonth(String input) {
        Objects.requireNonNull(input, "month input cannot be null");
        String trimmed = input.trim();

        // 1) Try ISO YearMonth: "yyyy-MM"
        try {
            return YearMonth.parse(trimmed, DateTimeFormatter.ISO_DATE_TIME);
        } catch (DateTimeParseException ignored) { }

        // 2) Try "MMMM yyyy" and "MMM yyyy"
        List<DateTimeFormatter> fmts = List.of(
                DateTimeFormatter.ofPattern("MMMM yyyy", Locale.ENGLISH),
                DateTimeFormatter.ofPattern("MMM yyyy", Locale.ENGLISH)
        );

        for (DateTimeFormatter fmt : fmts) {
            try {
                return YearMonth.parse(trimmed, fmt);
            } catch (DateTimeParseException ignored) { }
        }

        // 3) If input is single number like "9" or "09", treat as month of current year
        try {
            int monthNum = Integer.parseInt(trimmed);
            if (monthNum >= 1 && monthNum <= 12) {
                return YearMonth.of(Year.now().getValue(), monthNum);
            }
        } catch (NumberFormatException ignored) { }

        // 4) As a last resort, try parse Month name only (e.g., "September") with current year
        try {
            Month m = Month.valueOf(trimmed.toUpperCase(Locale.ENGLISH));
            return YearMonth.of(Year.now().getValue(), m);
        } catch (IllegalArgumentException ignored) { }

        throw new DateTimeParseException("Unable to parse month: " + input, input, 0);
    }

}
