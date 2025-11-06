package com.cash_management.cashmanagement.services;

import com.cash_management.cashmanagement.dtos.DailyExpenseDTO;

import java.util.List;

public interface DailyExpenseService {

    /* Retrieve all daily expenses */
    List<DailyExpenseDTO> getAllExpenses();

    /* Retrieve  daily expenses by ID */
    DailyExpenseDTO getExpenseById(Long id);

    /* Add a new daily expense */
    DailyExpenseDTO addExpense(DailyExpenseDTO dailyExpenseDTO);

    /* Delete a daily expense by ID */
    void deleteExpense(Long id);

    /* Update a daily expense by ID */
    DailyExpenseDTO updateExpense(Long id, DailyExpenseDTO dailyExpenseDTO);

    /* Retrieve expenses by category */
    List<DailyExpenseDTO> getExpensesByCategory(String category);

}
