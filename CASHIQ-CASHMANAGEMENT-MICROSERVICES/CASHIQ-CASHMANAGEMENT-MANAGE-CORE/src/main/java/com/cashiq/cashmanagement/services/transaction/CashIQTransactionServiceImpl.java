package com.cashiq.cashmanagement.services.transaction;

import com.cashiq.cashmanagement.dto.TransactionDTO;
import com.cashiq.cashmanagement.entity.Transaction;
import com.cashiq.cashmanagement.entity.Users;
import com.cashiq.cashmanagement.exception.AccessDeniedException;
import com.cashiq.cashmanagement.exception.ResourceNotFoundException;
import com.cashiq.cashmanagement.exception.UserNotFoundException;
import com.cashiq.cashmanagement.repository.TransactionRepository;
import com.cashiq.cashmanagement.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of CashIQTransactionService.
 * The authenticated user is resolved from the Spring Security context on every
 * operation so the frontend never needs to send the userId explicitly.
 *
 * @author Aditya
 * @version 1.0
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CashIQTransactionServiceImpl implements CashIQTransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    /**
     * Resolves the currently authenticated user from the Spring Security context.
     * Throws UserNotFoundException if the username is not found in the database.
     */
    private String getCurrentUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @Override
    public String addTransaction(TransactionDTO transactionDTO) {
        log.info("Adding transaction: {}", transactionDTO);
        Transaction transaction = modelMapper.map(transactionDTO, Transaction.class);

        String username = getCurrentUsername();
        Users user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        transaction.setUser(user);
        transactionRepository.save(transaction);
        log.info("Transaction added successfully with ID: {}", transaction.getId());
        return "Transaction added successfully";
    }

    @Override
    public String updateTransaction(TransactionDTO transactionDTO) {
        log.info("Updating transaction: {}", transactionDTO);
        String username = getCurrentUsername();

        Transaction transaction = transactionRepository.findById(transactionDTO.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));

        // Ownership check — users may only edit their own transactions
        if (!transaction.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("Access Denied: You cannot update this transaction");
        }

        transaction.setAmount(transactionDTO.getAmount());
        transaction.setCategory(transactionDTO.getCategory());
        transaction.setDescription(transactionDTO.getDescription());
        transaction.setPaymentSource(transactionDTO.getPaymentSource());

        if (transactionDTO.getDate() != null) {
            transaction.setDate(LocalDate.parse(transactionDTO.getDate().toString()));
        }

        transactionRepository.save(transaction);
        log.info("Transaction updated successfully with ID: {}", transaction.getId());
        return "Transaction updated successfully";
    }

    @Override
    public List<TransactionDTO> getAllTransactions() {
        String username = getCurrentUsername();
        log.info("Fetching transactions for user: {}", username);

        Users user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        List<Transaction> transactions = transactionRepository.findAllByUser(user);
        log.info("Found {} transactions for user: {}", transactions.size(), username);

        return transactions.stream()
                .map(t -> modelMapper.map(t, TransactionDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public String deleteTransaction(Long id) {
        log.info("Deleting transaction with ID: {}", id);
        String username = getCurrentUsername();

        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));

        // Ownership check — users may only delete their own transactions
        if (!transaction.getUser().getUsername().equals(username)) {
            throw new AccessDeniedException("Access Denied: You cannot delete this transaction");
        }

        transactionRepository.delete(transaction);
        log.info("Transaction deleted successfully with ID: {}", id);
        return "Transaction deleted successfully";
    }
}
