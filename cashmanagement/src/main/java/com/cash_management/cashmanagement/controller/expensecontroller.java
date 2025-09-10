package com.cash_management.cashmanagement.controller;

import com.cash_management.cashmanagement.dto.dailyexpensesdto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class expensecontroller {

    @GetMapping("/all-expenses")
    public dailyexpensesdto getAllExpenses() {
        return new dailyexpensesdto("Groceries", 150.75, null, "Weekly grocery shopping", "Food", "Credit Card", false);
    }
}
