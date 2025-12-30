package com.cashiq.cashmanagement.controllers;

import com.cashiq.cashmanagement.dto.TransactionDTO;
import com.cashiq.cashmanagement.services.TransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

/*
 * @author - Aditya
 * @version - 1.0
 * @description - TransactionController class is used to handle the transaction related requests
 */
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class TransactionController {

    private final TransactionService transactionService;

    /**
     * @method - addTransaction
     * @param - TransactionDTO
     * @return - String
     * @Description - This method is used to add a transaction
     */
    @PostMapping("/add-transaction")
    public String addTransaction(@RequestBody TransactionDTO transactionDTO) {
        log.info("Request to add transaction: {}", transactionDTO);
        return transactionService.addTransaction(transactionDTO);
    }

    /**
     * @method - updateTransaction
     * @param - TransactionDTO
     * @return - String
     * @Description - This method is used to update a transaction
     */
    @org.springframework.web.bind.annotation.PutMapping("/update-transaction")
    public String updateTransaction(@RequestBody TransactionDTO transactionDTO) {
        log.info("Request to update transaction: {}", transactionDTO);
        return transactionService.updateTransaction(transactionDTO);
    }

    /**
     * @method - getAllTransactions
     * @param - None
     * @return - List<TransactionDTO>
     * @Description - This method is used to get all transactions
     */
    @GetMapping("/get-all-transaction")
    public List<TransactionDTO> getAllTransactions() {
        log.info("Request to fetch all transactions");
        return transactionService.getAllTransactions();
    }

}
