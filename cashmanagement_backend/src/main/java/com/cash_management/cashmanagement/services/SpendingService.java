package com.cash_management.cashmanagement.services;

import com.cash_management.cashmanagement.dtos.SpendingResponseDTO;
import org.springframework.stereotype.Service;
import com.cash_management.cashmanagement.dtos.DailyExpenseDTO;

import java.time.LocalDate;
import java.util.List;

@Service
public interface SpendingService {

    Double getTotalSpendingForMonth(int year, int month);

    public List<DailyExpenseDTO>getDailyExpensesForDate(LocalDate date);

    SpendingResponseDTO getTotalSpendingForDay(LocalDate date);


}
