package com.cashiq.cashmanagement.services.income;

import com.cashiq.cashmanagement.dto.IncomeDTO;

import java.util.List;

/**
 * Service interface for income source operations.
 * Implementations must not return ResponseEntity — HTTP concerns belong in the controller layer.
 *
 * @author Aditya
 * @version 1.0
 */
public interface CashIQIncomeService {

    /**
     * Adds a new income source for the currently authenticated user.
     *
     * @param incomeDTO The income details (name, amount, frequency, next pay day).
     */
    void addIncome(IncomeDTO incomeDTO);

    /**
     * Updates an existing income source by ID.
     *
     * @param id        The ID of the income source to update.
     * @param incomeDTO The updated income details.
     */
    void updateIncome(Long id, IncomeDTO incomeDTO);

    /**
     * Returns all income sources for the currently authenticated user.
     *
     * @return List of IncomeDTO objects.
     */
    List<IncomeDTO> getAllIncomes();

    /**
     * Deletes an income source by ID.
     * Throws AccessDeniedException if the income does not belong to the authenticated user.
     *
     * @param id The ID of the income source to delete.
     */
    void deleteIncome(Long id);
}
