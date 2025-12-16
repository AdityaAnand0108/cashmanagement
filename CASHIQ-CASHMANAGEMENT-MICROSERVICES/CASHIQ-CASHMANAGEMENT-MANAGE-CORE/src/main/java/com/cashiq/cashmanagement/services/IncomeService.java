package com.cashiq.cashmanagement.services;

import com.cashiq.cashmanagement.dto.IncomeDTO;
import java.util.List;

public interface IncomeService {
    String addIncome(IncomeDTO incomeDTO);

    List<IncomeDTO> getAllIncomes();
}
