package com.cash_management.cashmanagement.service;

public interface SpendingService {

    Double getTotalSpendingForMonth(String month);

    Double getTotalSpendingForDay(String day);
}
