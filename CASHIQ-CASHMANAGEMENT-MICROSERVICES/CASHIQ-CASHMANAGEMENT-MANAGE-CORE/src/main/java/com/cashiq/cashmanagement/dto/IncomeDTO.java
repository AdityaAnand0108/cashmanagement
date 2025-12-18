package com.cashiq.cashmanagement.dto;

import com.cashiq.cashmanagement.enums.PayementFrequency;
import lombok.Data;
import java.time.LocalDate;

@Data
public class IncomeDTO {

    private Long id;

    private String name;

    private Double amount;

    private String icon;

    private PayementFrequency frequency;

    private LocalDate nextPayDay;

    private Boolean isFixed;

    private Long userId;
}
