package com.cash_management.cashmanagement.controller;

import com.cash_management.cashmanagement.dto.DailyexpensesDTO;
import com.cash_management.cashmanagement.service.DailyexpensesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ExpenseController {

    private final DailyexpensesService dailyexpensesService;

    @GetMapping("/all-expenses")
    public List<DailyexpensesDTO> getAllExpenses() {
        return dailyexpensesService.getAllExpenses();
    }
}
