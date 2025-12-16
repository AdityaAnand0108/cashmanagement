package com.cashiq.cashmanagement.repository;

import com.cashiq.cashmanagement.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction,Long> {
}
