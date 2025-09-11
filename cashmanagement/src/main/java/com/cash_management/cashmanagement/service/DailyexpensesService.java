package com.cash_management.cashmanagement.service;

import com.cash_management.cashmanagement.dto.DailyexpensesDTO;

import java.util.List;

public interface DailyexpensesService {

    /* Retrieve all daily expenses */
    List<DailyexpensesDTO> getAllExpenses();

    /* Add a new daily expense */
    DailyexpensesDTO addExpense(DailyexpensesDTO dailyexpensesDTO);

    /* Delete a daily expense by ID */
    void deleteExpense(Long id);

    /* Update a daily expense by ID */
    DailyexpensesDTO updateExpense(Long id, DailyexpensesDTO dailyexpensesDTO);

    /* Retrieve expenses by category */
    List<DailyexpensesDTO> getExpensesByCategory(String category);
}
