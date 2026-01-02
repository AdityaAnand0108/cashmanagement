package com.cashiq.cashmanagement.dto;

import com.cashiq.cashmanagement.enums.CategoryType;
import com.cashiq.cashmanagement.enums.PeriodType;
import lombok.Data;
import java.time.LocalDate;

@Data
public class BudgetDTO {
    private Long id;
    private Long userId;
    private CategoryType category;
    private Double limitAmount;
    private LocalDate startDate;
    private LocalDate endDate;
    private PeriodType periodType;
    private Double spentAmount;
    private Double remainingAmount;
    private String status;
}
