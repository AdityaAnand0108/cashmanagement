package com.cashiq.cashmanagement.repository;

import com.cashiq.cashmanagement.entity.Budget;
import com.cashiq.cashmanagement.enums.CategoryType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByUsersId(Long userId);

    Optional<Budget> findByUsersIdAndCategory(Long userId, CategoryType category);
}
