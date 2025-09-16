package com.cash_management.cashmanagement.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * DTO for {@link com.cash_management.cashmanagement.entities.Spending}
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpendingResponseDTO {
    LocalDate date;
    Double totalSpending;
}