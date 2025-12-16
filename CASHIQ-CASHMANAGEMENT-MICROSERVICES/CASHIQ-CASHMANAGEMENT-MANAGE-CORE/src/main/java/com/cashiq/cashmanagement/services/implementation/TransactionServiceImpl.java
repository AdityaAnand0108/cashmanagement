package com.cashiq.cashmanagement.services.implementation;

import com.cashiq.cashmanagement.dto.TransactionDTO;
import com.cashiq.cashmanagement.entity.Transaction;
import com.cashiq.cashmanagement.entity.Users;
import com.cashiq.cashmanagement.repository.TransactionRepository;
import com.cashiq.cashmanagement.repository.UserRepository;
import com.cashiq.cashmanagement.services.TransactionService;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

/*
 * @author - Aditya
 * @version - 1.0
 * @description - 
 */
@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final ModelMapper modelMapper;

    @Override
    public String addTransaction(TransactionDTO transactionDTO) {
        Transaction transaction= modelMapper.map(transactionDTO, Transaction.class);
        transactionRepository.save(transaction);
        return "Transaction added successfully";
    }
}
