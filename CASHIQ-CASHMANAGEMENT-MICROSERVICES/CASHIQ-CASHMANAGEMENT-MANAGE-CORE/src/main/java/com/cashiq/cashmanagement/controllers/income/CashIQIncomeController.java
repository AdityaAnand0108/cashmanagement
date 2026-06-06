package com.cashiq.cashmanagement.controllers.income;

import com.cashiq.cashmanagement.dto.IncomeDTO;
import com.cashiq.cashmanagement.services.income.CashIQIncomeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for income source operations.
 * CORS is handled globally by SecurityConfig — no @CrossOrigin needed here.
 * ResponseEntity wrapping lives in the controller so the service layer stays
 * free of HTTP concerns.
 *
 * @author Aditya
 * @version 1.0
 */
@RestController
@RequiredArgsConstructor
@Slf4j
public class CashIQIncomeController {

    private final CashIQIncomeService incomeService;

    /**
     * Adds a new income source for the currently authenticated user.
     *
     * @param incomeDTO The income details (name, amount, frequency, next pay day).
     * @return 200 OK with a confirmation message.
     */
    @PostMapping("/add-income")
    public ResponseEntity<String> addIncome(@RequestBody IncomeDTO incomeDTO) {
        log.info("Request to add income: {}", incomeDTO);
        incomeService.addIncome(incomeDTO);
        return ResponseEntity.ok("Income source added successfully");
    }

    /**
     * Updates an existing income source by its ID.
     *
     * @param id        The ID of the income source to update.
     * @param incomeDTO The updated income details.
     * @return 200 OK with a confirmation message.
     */
    @PutMapping("/update-income/{id}")
    public ResponseEntity<String> updateIncome(@PathVariable Long id, @RequestBody IncomeDTO incomeDTO) {
        log.info("Request to update income: {}", id);
        incomeService.updateIncome(id, incomeDTO);
        return ResponseEntity.ok("Income source updated successfully");
    }

    /**
     * Returns all income sources for the currently authenticated user.
     *
     * @return 200 OK with a list of IncomeDTO objects.
     */
    @GetMapping("/get-all-income")
    public ResponseEntity<List<IncomeDTO>> getAllIncomes() {
        log.info("Request to fetch all incomes");
        return ResponseEntity.ok(incomeService.getAllIncomes());
    }

    /**
     * Deletes an income source by its ID.
     *
     * @param id The ID of the income source to delete.
     * @return 200 OK with a confirmation message.
     */
    @DeleteMapping("/delete-income/{id}")
    public ResponseEntity<String> deleteIncome(@PathVariable Long id) {
        log.info("Request to delete income: {}", id);
        incomeService.deleteIncome(id);
        return ResponseEntity.ok("Income source deleted successfully");
    }
}
