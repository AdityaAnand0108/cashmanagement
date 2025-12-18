package com.cashiq.cashmanagement.services;

import com.cashiq.cashmanagement.dto.IncomeDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

/**
 * @author - Aditya
 * @version - 1.0
 * @description - This interface is used to handle income-related operations.
 */
public interface IncomeService {

    /**
     * @method - addIncome
     * @param - IncomeDTO
     * @return - String
     * @Description - This method is used to add the income
     */
    ResponseEntity<String> addIncome(IncomeDTO incomeDTO);

    /**
     * @method - updateIncome
     * @param - IncomeDTO
     * @return - String
     * @Description - This method is used to update the income
     */
    ResponseEntity<String> updateIncome(Long id, IncomeDTO incomeDTO);

    /**
     * @method - getAllIncomes
     * @param - None
     * @return - List<IncomeDTO>
     * @Description - This method is used to get all the incomes
     */
    ResponseEntity<List<IncomeDTO>> getAllIncomes();
}
