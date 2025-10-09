package com.cash_management.cashmanagement.controller;

import com.cash_management.cashmanagement.dtos.ExpenseCategoryRestrictionDTO;
import com.cash_management.cashmanagement.enums.ExpenseCategory;
import com.cash_management.cashmanagement.services.ExpenseCategoryRestrictionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseCategoryRestrictionController {

    private final ExpenseCategoryRestrictionService expenseCategoryRestrictionService;


    /*
     * Endpoint to set a restriction for an expense category
     */
    @PostMapping("/set-restriction")
    public ResponseEntity<ExpenseCategoryRestrictionDTO> setRestriction(@RequestBody ExpenseCategoryRestrictionDTO dto) {
        ExpenseCategoryRestrictionDTO savedDto = expenseCategoryRestrictionService.setRestriction(dto);
        return ResponseEntity.ok(savedDto);
    }

    /*
     * Endpoint to get the restriction for a specific expense category
     */
    @GetMapping("/get-restriction/{category}")
    public ResponseEntity<ExpenseCategoryRestrictionDTO> getRestrictionByCategory(@PathVariable ExpenseCategory category) {
        ExpenseCategoryRestrictionDTO dto = expenseCategoryRestrictionService.getRestrictionByCategory(category);
        if (dto != null) {
            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
