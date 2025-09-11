package com.cash_management.cashmanagement.controller;

import com.cash_management.cashmanagement.dto.DailyexpensesDTO;
import com.cash_management.cashmanagement.service.DailyexpensesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ExpenseController {

    private final DailyexpensesService dailyexpensesService;

    @GetMapping("/all-expenses")
    public  ResponseEntity<List<DailyexpensesDTO>> getAllExpenses() {
        return ResponseEntity.ok(dailyexpensesService.getAllExpenses());
    }

    @PostMapping("/add-expense")
    public ResponseEntity<DailyexpensesDTO> addExpense(@RequestBody DailyexpensesDTO dailyexpensesDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(dailyexpensesService.addExpense(dailyexpensesDTO));
    }

    
}
