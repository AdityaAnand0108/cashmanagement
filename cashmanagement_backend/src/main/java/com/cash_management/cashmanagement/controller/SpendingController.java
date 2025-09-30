package com.cash_management.cashmanagement.controller;

import com.cash_management.cashmanagement.dtos.SpendingOverviewDTO;
import com.cash_management.cashmanagement.dtos.SpendingResponseDTO;
import com.cash_management.cashmanagement.dtos.DailyExpenseDTO;
import com.cash_management.cashmanagement.services.SpendingService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

/**
 * REST controller for managing spending-related endpoints.
 */
@CrossOrigin(origins = "http://localhost:5173")
@RestController // Add versioning and a base path
@RequiredArgsConstructor
public class SpendingController {

    private final SpendingService spendingService;

    /**
     * Get total spending for a specific day.
     * Example: GET /spending?date=2023-10-15
     */
    @GetMapping("/spending")
    public ResponseEntity<List<DailyExpenseDTO>> getDailyExpensesForDay(
            @RequestParam("date")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        List<DailyExpenseDTO> response = spendingService.getDailyExpensesForDate(date);
        return ResponseEntity.ok(response);
    }


    /**
     * Get total spending for a specific month.
     * Example: GET /spending/monthly?year=2023&month=10
     */
    @GetMapping("/monthly")
    public ResponseEntity<Double> getTotalSpendingForMonth(
            @RequestParam("year") int year,
            @RequestParam("month") int month) {

        double total = spendingService.getTotalSpendingForMonth(year, month);
        return ResponseEntity.ok(total);
    }

    /**
     * Get spending overview for today and the current month.
     * Example: GET /spending/overview
     */
    @GetMapping("/spending/overview")
    public ResponseEntity<SpendingOverviewDTO> getSpendingOverview() {
        LocalDate today = LocalDate.now();
        double todayTotal = spendingService.getTotalSpendingForDay(today).getTotalSpending();
        double monthTotal = spendingService.getTotalSpendingForMonth(today.getYear(), today.getMonthValue());
        SpendingOverviewDTO overview = new SpendingOverviewDTO(todayTotal, monthTotal);
        return ResponseEntity.ok(overview);
    }
}