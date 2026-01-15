package com.cashiq.cashmanagement.services.transaction;

import com.cashiq.cashmanagement.dto.TransactionDTO;

import java.util.List;

public interface CashIQTransactionService {
    String addTransaction(TransactionDTO transactionDTO);

    String updateTransaction(TransactionDTO transactionDTO);

    String deleteTransaction(Long id);

    List<TransactionDTO> getAllTransactions();
}
