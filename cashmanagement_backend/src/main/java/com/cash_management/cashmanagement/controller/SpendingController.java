package com.cash_management.cashmanagement.controller;

import com.cash_management.cashmanagement.dtos.SpendingOverviewDTO;
import com.cash_management.cashmanagement.dtos.SpendingResponseDTO;
import com.cash_management.cashmanagement.services.SpendingService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequiredArgsConstructor
public class SpendingController {

    private final SpendingService spendingService;

    /* Endpoint to get total spending for a specific day
     * Example: GET /spending?date=2023-10-15
     */
    @GetMapping("/spending")
    public ResponseEntity<SpendingResponseDTO> getTotalSpendingForDay(
            @RequestParam("date")
            @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        return ResponseEntity.ok(spendingService.getTotalSpendingForDay(date));
    }

    /* Endpoint to get total spending for a specific month
     * Example: GET /spending/monthly?year=2023&month=10
     */
    @GetMapping("/spending/monthly")
    public ResponseEntity<Double> getTotalSpendingForMonth(
            @RequestParam("year") int year,
            @RequestParam("month") int month) {
        return ResponseEntity.ok(spendingService.getTotalSpendingForMonth(year, month));
    }

    /* Endpoint to get spending overview for today and current month
     * Example: GET /spending/overview
     */
    @GetMapping("/spending/overview")
    public ResponseEntity<SpendingOverviewDTO> getSpendingOverview() {
        double todayTotal = spendingService.getTotalSpendingForDay(LocalDate.now()).getTotalSpending();
        java.time.LocalDate now = java.time.LocalDate.now();
        double monthTotal = spendingService.getTotalSpendingForMonth(now.getYear(), now.getMonthValue());
        SpendingOverviewDTO overview = new SpendingOverviewDTO(todayTotal, monthTotal);
        return ResponseEntity.ok(overview);
    }

}
