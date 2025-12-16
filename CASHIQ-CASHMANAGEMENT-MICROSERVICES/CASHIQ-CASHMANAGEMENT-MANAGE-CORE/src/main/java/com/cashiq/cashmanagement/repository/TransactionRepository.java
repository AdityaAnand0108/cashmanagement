package com.cashiq.cashmanagement.repository;

import com.cashiq.cashmanagement.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import com.cashiq.cashmanagement.entity.Users;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findAllByUser(Users user);
}
