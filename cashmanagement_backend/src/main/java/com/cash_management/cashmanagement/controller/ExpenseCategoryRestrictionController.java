package com.cash_management.cashmanagement.controller;

import com.cash_management.cashmanagement.dtos.ExpenseCategoryRestrictionDTO;
import com.cash_management.cashmanagement.enums.ExpenseCategory;
import com.cash_management.cashmanagement.services.ExpenseCategoryRestrictionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseCategoryRestrictionController {

    private final ExpenseCategoryRestrictionService expenseCategoryRestrictionService;

    @PostMapping("/set-restriction")
    public ExpenseCategoryRestrictionDTO setRestriction(@RequestBody ExpenseCategoryRestrictionDTO dto) {
        return expenseCategoryRestrictionService.setRestriction(dto);
    }

    @GetMapping("/get-restriction/{category}")
    public ExpenseCategoryRestrictionDTO getRestrictionByCategory(@PathVariable ExpenseCategory category) {
        return expenseCategoryRestrictionService.getRestrictionByCategory(category);
    }

}
