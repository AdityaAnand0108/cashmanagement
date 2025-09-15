package com.cash_management.cashmanagement.entity;

import com.cash_management.cashmanagement.enums.ExpenseCategory;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Getter
@Setter
@Table(name = "budget")
public class Budget {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    private Double amount;

    @Enumerated(EnumType.STRING)
    private ExpenseCategory category;

    private String month;
}
