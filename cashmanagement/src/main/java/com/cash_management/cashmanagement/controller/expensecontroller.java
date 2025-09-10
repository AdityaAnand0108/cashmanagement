package com.cash_management.cashmanagement.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class expensecontroller {

    @GetMapping("/all-expenses")
    public String getAllExpenses() {
        return "List of all expenses";
    }
}
