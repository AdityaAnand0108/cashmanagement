package com.cashiq.cashmanagement.services;

import com.cashiq.cashmanagement.dto.TransactionDTO;

import java.util.List;
import com.cashiq.cashmanagement.dto.TransactionDTO;

public interface TransactionService {
     String addTransaction(TransactionDTO transactionDTO);

     List<TransactionDTO> getAllTransactions();
}
