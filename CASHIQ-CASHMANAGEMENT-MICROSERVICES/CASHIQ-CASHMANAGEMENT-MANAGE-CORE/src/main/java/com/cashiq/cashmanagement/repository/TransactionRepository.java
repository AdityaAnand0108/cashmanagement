package com.cashiq.cashmanagement.repository;

import com.cashiq.cashmanagement.entity.Transaction;
import com.cashiq.cashmanagement.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findAllByUser(Users user);

    List<Transaction> findByUserAndCategoryAndDateBetween(Users user, String category, LocalDate startDate,
            LocalDate endDate);
}
