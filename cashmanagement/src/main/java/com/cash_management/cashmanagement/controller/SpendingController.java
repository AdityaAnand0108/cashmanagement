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


    @GetMapping("/spending")
    public ResponseEntity<SpendingResponseDTO> getTotalSpendingForDay(
            @RequestParam("date")
            @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        return ResponseEntity.ok(spendingService.getTotalSpendingForDay(date));
    }

    @GetMapping("/spending/monthly")
    public ResponseEntity<Double> getTotalSpendingForMonth(
            @RequestParam("year") int year,
            @RequestParam("month") int month) {
        return ResponseEntity.ok(spendingService.getTotalSpendingForMonth(year, month));
    }

}
