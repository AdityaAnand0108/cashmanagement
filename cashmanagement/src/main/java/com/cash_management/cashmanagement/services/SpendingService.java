package com.cash_management.cashmanagement.services;

import com.cash_management.cashmanagement.dtos.SpendingResponseDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public interface SpendingService {

    Double getTotalSpendingForMonth(String month);

    SpendingResponseDTO getTotalSpendingForDay(LocalDate day);
}
