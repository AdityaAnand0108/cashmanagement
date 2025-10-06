package com.cash_management.cashmanagement.entities;

import com.cash_management.cashmanagement.enums.ExpenseCategory;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "expense_category_restriction")
public class ExpenseCategoryRestriction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ExpenseCategory category;

    private Double maxAmount;

    private double remainingAmount;

    @Transient
    private Double minAmount;

    public Double getMinAmount() {
        if (maxAmount == null) return null;
        return maxAmount * 0.1;
    }

}