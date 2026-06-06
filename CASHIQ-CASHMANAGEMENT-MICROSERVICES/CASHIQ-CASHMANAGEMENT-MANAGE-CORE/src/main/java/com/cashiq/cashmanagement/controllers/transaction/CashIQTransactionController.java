package com.cashiq.cashmanagement.controllers.transaction;

import com.cashiq.cashmanagement.dto.TransactionDTO;
import com.cashiq.cashmanagement.services.transaction.CashIQTransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for transaction operations.
 * CORS is handled globally by SecurityConfig — no @CrossOrigin needed here.
 *
 * @author Aditya
 * @version 1.0
 */
@RestController
@RequiredArgsConstructor
@Slf4j
public class CashIQTransactionController {

    private final CashIQTransactionService transactionService;

    /**
     * Adds a new transaction for the currently authenticated user.
     *
     * @param transactionDTO The transaction data to save.
     * @return A confirmation message string.
     */
    @PostMapping("/add-transaction")
    public String addTransaction(@RequestBody TransactionDTO transactionDTO) {
        log.info("Request to add transaction: {}", transactionDTO);
        return transactionService.addTransaction(transactionDTO);
    }

    /**
     * Updates an existing transaction. The transaction ID must be set in the DTO.
     *
     * @param transactionDTO The updated transaction data.
     * @return A confirmation message string.
     */
    @PutMapping("/update-transaction")
    public String updateTransaction(@RequestBody TransactionDTO transactionDTO) {
        log.info("Request to update transaction: {}", transactionDTO);
        return transactionService.updateTransaction(transactionDTO);
    }

    /**
     * Returns all transactions for the currently authenticated user.
     *
     * @return A list of TransactionDTO objects.
     */
    @GetMapping("/get-all-transaction")
    public List<TransactionDTO> getAllTransactions() {
        log.info("Request to fetch all transactions");
        return transactionService.getAllTransactions();
    }

    /**
     * Deletes a transaction by its ID.
     *
     * @param id The ID of the transaction to delete.
     * @return A confirmation message string.
     */
    @DeleteMapping("/delete-transaction/{id}")
    public String deleteTransaction(@PathVariable Long id) {
        log.info("Request to delete transaction with ID: {}", id);
        return transactionService.deleteTransaction(id);
    }
}
