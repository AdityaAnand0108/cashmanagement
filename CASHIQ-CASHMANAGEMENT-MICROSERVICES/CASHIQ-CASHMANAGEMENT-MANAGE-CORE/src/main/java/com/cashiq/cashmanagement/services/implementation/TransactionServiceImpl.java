package com.cashiq.cashmanagement.services.implementation;

import com.cashiq.cashmanagement.dto.TransactionDTO;
import com.cashiq.cashmanagement.entity.Transaction;
import com.cashiq.cashmanagement.entity.Users;
import com.cashiq.cashmanagement.repository.TransactionRepository;
import com.cashiq.cashmanagement.repository.UserRepository;
import com.cashiq.cashmanagement.services.TransactionService;
import java.util.List;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

/*
 * @author - Aditya
 * @version - 1.0
 * @description - 
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class TransactionServiceImpl implements TransactionService {

        private final TransactionRepository transactionRepository;
        private final UserRepository userRepository;
        private final ModelMapper modelMapper;

        @Override
        public String addTransaction(TransactionDTO transactionDTO) {
                log.info("Adding transaction: {}", transactionDTO);
                Transaction transaction = modelMapper.map(transactionDTO, Transaction.class);

                // Get current logged in user
                String username = org.springframework.security.core.context.SecurityContextHolder.getContext()
                                .getAuthentication().getName();
                Users user = userRepository.findByUsername(username)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                transaction.setUser(user);

                transactionRepository.save(transaction);
                log.info("Transaction added successfully with ID: {}", transaction.getId());
                return "Transaction added successfully";
        }

        @Override
        public List<TransactionDTO> getAllTransactions() {
                // Get current logged in user
                String username = org.springframework.security.core.context.SecurityContextHolder.getContext()
                                .getAuthentication().getName();
                log.info("Fetching transactions for user: {}", username);
                Users user = userRepository.findByUsername(username)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                List<Transaction> transactions = transactionRepository.findAllByUser(user);
                log.info("Found {} transactions for user: {}", transactions.size(), username);

                return transactions.stream()
                                .map(transaction -> modelMapper.map(transaction, TransactionDTO.class))
                                .collect(Collectors.toList());
        }
}
