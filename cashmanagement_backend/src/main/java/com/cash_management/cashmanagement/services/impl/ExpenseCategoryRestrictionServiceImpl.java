package com.cash_management.cashmanagement.services.impl;

import com.cash_management.cashmanagement.dtos.ExpenseCategoryRestrictionDTO;
import com.cash_management.cashmanagement.entities.ExpenseCategoryRestriction;
import com.cash_management.cashmanagement.enums.ExpenseCategory;
import com.cash_management.cashmanagement.repositories.ExpenseCategoryRestrictionRepository;
import com.cash_management.cashmanagement.services.ExpenseCategoryRestrictionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExpenseCategoryRestrictionServiceImpl implements ExpenseCategoryRestrictionService {

    private final ExpenseCategoryRestrictionRepository expenseCategoryRestrictionRepository;

    @Override
    public ExpenseCategoryRestrictionDTO setRestriction(ExpenseCategoryRestrictionDTO dto) {
        ExpenseCategoryRestriction entity = new ExpenseCategoryRestriction();
        entity.setCategory(dto.getCategory());
        entity.setMaxAmount(dto.getMaxAmount());
        expenseCategoryRestrictionRepository.save(entity);
        return dto;
    }

    @Override
    public ExpenseCategoryRestrictionDTO getRestrictionByCategory(ExpenseCategory category) {
        ExpenseCategoryRestriction entity = expenseCategoryRestrictionRepository.findByCategory(category);
        if (entity != null) {
            return new ExpenseCategoryRestrictionDTO(entity.getCategory(), entity.getMaxAmount());
        }
        return null;
    }

}
