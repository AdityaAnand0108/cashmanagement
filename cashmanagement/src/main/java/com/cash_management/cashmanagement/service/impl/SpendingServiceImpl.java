package com.cash_management.cashmanagement.service.impl;

import com.cash_management.cashmanagement.entity.Dailyexpenses;
import com.cash_management.cashmanagement.entity.Spending;
import com.cash_management.cashmanagement.repository.DailyexpensesRepository;
import com.cash_management.cashmanagement.repository.SpendingRepository;
import com.cash_management.cashmanagement.service.SpendingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SpendingServiceImpl implements SpendingService {

    private final DailyexpensesRepository dailyexpensesRepository;
    private final SpendingRepository spendingRepository;

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
    public Double getTotalSpendingForDay(String day) {
        LocalDate date = parseToLocalDate(day);
        // Sum directly from Dailyexpenses repository (safer and up-to-date)
        double total = dailyexpensesRepository.findAllByDate(date)
                .stream()
                .mapToDouble(Dailyexpenses::getAmount)
                .sum();
        return total;
    }

    /**
     * Recalculate and persist total spending for a single date.
     * Call this after any add/update/delete affecting that date.
     */
    public void recalcAndSaveForDate(LocalDate date) {
        double total = dailyexpensesRepository
                .findAllByDate(date)
                .stream()
                .mapToDouble(Dailyexpenses::getAmount)
                .sum();

        Spending spending = spendingRepository.findByDate(date)
                .orElseGet(() -> {
                    Spending s = new Spending();
                    s.setDate(date);
                    return s;
                });

        spending.setTotalSpending(total);
        spendingRepository.save(spending);
    }

    /**
     * Recalculate for date range (useful for month recalculation).
     * Will update/create Spending entry for each date found.
     */
    public void recalcAndSaveForDateRange(LocalDate start, LocalDate end) {
        Map<LocalDate, Double> totalsByDate = dailyexpensesRepository.findAllByDateBetween(start, end)
                .stream()
                .collect(Collectors.groupingBy(Dailyexpenses::getDate,
                        Collectors.summingDouble(Dailyexpenses::getAmount)));

        totalsByDate.forEach((date, total) -> {
            Spending s = spendingRepository.findByDate(date)
                    .orElseGet(() -> {
                        Spending sp = new Spending();
                        sp.setDate(date);
                        return sp;
                    });
            s.setTotalSpending(total);
            spendingRepository.save(s);
        });
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

    private LocalDate parseToLocalDate(String input) {
        Objects.requireNonNull(input, "date input cannot be null");
        String trimmed = input.trim();

        // Try ISO local date first: yyyy-MM-dd
        try {
            return LocalDate.parse(trimmed, DateTimeFormatter.ISO_LOCAL_DATE);
        } catch (DateTimeParseException ignored) { }

        // Try common patterns like dd-MM-yyyy or dd/MM/yyyy
        List<DateTimeFormatter> fmts = List.of(
                DateTimeFormatter.ofPattern("dd-MM-yyyy"),
                DateTimeFormatter.ofPattern("dd/MM/yyyy"),
                DateTimeFormatter.ofPattern("d-M-yyyy")
        );

        for (DateTimeFormatter fmt : fmts) {
            try {
                return LocalDate.parse(trimmed, fmt);
            } catch (DateTimeParseException ignored) { }
        }

        // If user passed e.g., "2025-09" -> treat as first day of that month
        try {
            YearMonth ym = YearMonth.parse(trimmed, DateTimeFormatter.ISO_DATE_TIME);
            return ym.atDay(1);
        } catch (DateTimeParseException ignored) { }

        throw new DateTimeParseException("Unable to parse date: " + input, input, 0);
    }
}
