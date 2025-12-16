package com.cashiq.cashmanagement.controllers;

import com.cashiq.cashmanagement.dto.TransactionDTO;
import com.cashiq.cashmanagement.services.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

/*
 * @author - Aditya
 * @version - 1.0
 * @description - TransactionController class is used to handle the transaction related requests
 */
@RestController
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping("/add-transaction")
    public String addTransaction(@RequestBody TransactionDTO transactionDTO) {
        return transactionService.addTransaction(transactionDTO);
    }

    @GetMapping("/get-all-transaction")
    public List<TransactionDTO> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

}
