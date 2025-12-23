package com.cashiq.cashmanagement.controllers;

import com.cashiq.cashmanagement.dto.IncomeDTO;
import com.cashiq.cashmanagement.services.IncomeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author - Aditya
 * @version - 1.0
 * @description - This class is used to handle income-related operations.
 */
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class IncomeController {

    private final IncomeService incomeService;

    /**
     * @method - addIncome
     * @param - IncomeDTO
     * @return - String
     * @Description - This method is used to add the income
     */
    @PostMapping("/add-income")
    public ResponseEntity<String> addIncome(@RequestBody IncomeDTO incomeDTO) {
        log.info("Request to add income: {}", incomeDTO);
        return incomeService.addIncome(incomeDTO);
    }

    /**
     * @method - updateIncome
     * @param - IncomeDTO
     * @return - String
     * @Description - This method is used to update the income
     */
    @PutMapping("/update-income/{id}")
    public ResponseEntity<String> updateIncome(@PathVariable Long id, @RequestBody IncomeDTO incomeDTO) {
        log.info("Request to update income: {} with details: {}", id, incomeDTO);
        return incomeService.updateIncome(id, incomeDTO);
    }

    /**
     * @method - getAllIncomes
     * @param - None
     * @return - List<IncomeDTO>
     * @Description - This method is used to get all the incomes
     */
    @GetMapping("/get-all-income")
    public ResponseEntity<List<IncomeDTO>> getAllIncomes() {
        log.info("Request to fetch all incomes");
        return incomeService.getAllIncomes();
    }

    /**
     * @method - deleteIncome
     * @param - id
     * @return - String
     * @Description - This method is used to delete the income
     */
    @DeleteMapping("/delete-income/{id}")
    public ResponseEntity<String> deleteIncome(@PathVariable Long id) {
        log.info("Request to delete income: {}", id);
        return incomeService.deleteIncome(id);
    }
}
