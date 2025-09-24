package com.cash_management.cashmanagement.controller;

import com.cash_management.cashmanagement.dtos.SpendingResponseDTO;
import com.cash_management.cashmanagement.services.SpendingService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

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

}
