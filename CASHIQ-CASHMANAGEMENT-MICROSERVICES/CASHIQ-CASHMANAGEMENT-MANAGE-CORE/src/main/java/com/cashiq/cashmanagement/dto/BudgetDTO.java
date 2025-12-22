package com.cashiq.cashmanagement.dto;

import com.cashiq.cashmanagement.enums.CategoryType;
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
    private String periodType; // "MONTHLY" or "CUSTOM"
    // For response, we might add:
    private Double spentAmount;
    private Double remainingAmount;
    private String status; // "On Track", "At Risk" etc.
}
