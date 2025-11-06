package com.cash_management.cashmanagement.controller;

import com.cash_management.cashmanagement.dtos.DailyExpenseDTO;
import com.cash_management.cashmanagement.services.DailyExpenseService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ExpenseController {

    private final DailyExpenseService dailyexpensesService;

    /*
     * Get all expenses
     * @return List of DailyexpensesDTO
     */
    @GetMapping("/all-expenses")
    public  ResponseEntity<List<DailyExpenseDTO>> getAllExpenses() {
        return ResponseEntity.ok(dailyexpensesService.getAllExpenses());
    }



    /*
     * Get expenses by category
     * @param category
     * @return List of DailyexpensesDTO
     */
    @GetMapping("/by-category/{category}")
    public ResponseEntity<List<DailyExpenseDTO>> getExpensesByCategory(@PathVariable String category) {
        List<DailyExpenseDTO> expenses = dailyexpensesService.getExpensesByCategory(category);
        if (expenses == null || expenses.isEmpty()) {
            throw new EntityNotFoundException("No expenses found for category: " + category);
        }
        return ResponseEntity.ok(expenses);
    }


    /*
     * Get expenses by id
     * @param id
     * @return List of DailyexpensesDTO
     */
    @GetMapping("/expense-by-id/{id}")
    public ResponseEntity<DailyExpenseDTO> getExpenseById(@PathVariable Long id){
        DailyExpenseDTO expenceById=dailyexpensesService.getExpenseById(id);
        if(expenceById==null){
            throw new EntityNotFoundException("No expense found for ID: " + id);
        }
        return ResponseEntity.ok(expenceById);
    }


    /*
     * Add a new expense
     * @param dailyexpensesDTO
     * @return DailyexpensesDTO
     */
    @PostMapping("/add-expense")
    public ResponseEntity<DailyExpenseDTO> addExpense(@RequestBody DailyExpenseDTO dailyExpenseDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(dailyexpensesService.addExpense(dailyExpenseDTO));
    }

    /*
     * Update an existing expense by ID
     * @param id
     * @param dailyexpensesDTO
     * @return DailyexpensesDTO
     */
    @PutMapping("/update-expense/{id}")
    public ResponseEntity<DailyExpenseDTO> updateExpense(@PathVariable Long id, @RequestBody DailyExpenseDTO dailyExpenseDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(dailyexpensesService.updateExpense(id, dailyExpenseDTO));
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
