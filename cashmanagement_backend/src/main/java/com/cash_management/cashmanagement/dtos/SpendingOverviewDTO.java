package com.cash_management.cashmanagement.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SpendingOverviewDTO {
    private double todayTotal;
    private double monthTotal;
}
