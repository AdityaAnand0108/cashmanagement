package com.cash_management.cashmanagement.dto;

import lombok.Value;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link com.cash_management.cashmanagement.entity.Spending}
 */
@Value
public class SpendingDto implements Serializable {
    LocalDate date;
    Double totalSpending;
}