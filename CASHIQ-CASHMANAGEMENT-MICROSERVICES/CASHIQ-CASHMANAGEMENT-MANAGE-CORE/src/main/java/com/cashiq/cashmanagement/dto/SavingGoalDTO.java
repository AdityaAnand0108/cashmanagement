package com.cashiq.cashmanagement.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class SavingGoalDTO {
    private Long id;
    private Long userId;
    private String goalName;
    private Double targetAmount;
    private Double currentAmount;
    private LocalDate targetDate;
    private String status;
    private LocalDate createdAt;
    private LocalDate updatedAt;
}
