package com.cash_management.cashmanagement.controller;

import com.cash_management.cashmanagement.dto.DailyexpensesDTO;
import com.cash_management.cashmanagement.service.DailyexpensesService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ExpenseController {

    private final DailyexpensesService dailyexpensesService;

    /*
     * Get all expenses
     * @return List of DailyexpensesDTO
     */
    @GetMapping("/all-expenses")
    public  ResponseEntity<List<DailyexpensesDTO>> getAllExpenses() {
        return ResponseEntity.ok(dailyexpensesService.getAllExpenses());
    }

    /*
     * Get expenses by category
     * @param category
     * @return List of DailyexpensesDTO
     */
    @GetMapping("/by-category/{category}")
    public ResponseEntity<List<DailyexpensesDTO>> getExpensesByCategory(@PathVariable String category) {
        List<DailyexpensesDTO> expenses = dailyexpensesService.getExpensesByCategory(category);
        if (expenses == null || expenses.isEmpty()) {
            throw new EntityNotFoundException("No expenses found for category: " + category);
        }
        return ResponseEntity.ok(expenses);
    }


    /*
     * Add a new expense
     * @param dailyexpensesDTO
     * @return DailyexpensesDTO
     */
    @PostMapping("/add-expense")
    public ResponseEntity<DailyexpensesDTO> addExpense(@RequestBody DailyexpensesDTO dailyexpensesDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(dailyexpensesService.addExpense(dailyexpensesDTO));
    }

    /*
     * Update an existing expense by ID
     * @param id
     * @param dailyexpensesDTO
     * @return DailyexpensesDTO
     */
    @PutMapping("/update-expense/{id}")
    public ResponseEntity<DailyexpensesDTO> updateExpense(@PathVariable Long id, @RequestBody DailyexpensesDTO dailyexpensesDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(dailyexpensesService.updateExpense(id, dailyexpensesDTO));
    }

    /*
     * Delete an expense by ID
     * @param id
     * @return ResponseEntity<Void>
     */
    @DeleteMapping("/delete-expense/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        dailyexpensesService.deleteExpense(id);
        return ResponseEntity.noContent().build();
    }


}
