package com.cash_management.cashmanagement.service;

import com.cash_management.cashmanagement.dto.DailyexpensesDTO;

import java.util.List;

public interface DailyexpensesService {

    List<DailyexpensesDTO> getAllExpenses();
    DailyexpensesDTO addExpense(DailyexpensesDTO dailyexpensesDTO);
}
