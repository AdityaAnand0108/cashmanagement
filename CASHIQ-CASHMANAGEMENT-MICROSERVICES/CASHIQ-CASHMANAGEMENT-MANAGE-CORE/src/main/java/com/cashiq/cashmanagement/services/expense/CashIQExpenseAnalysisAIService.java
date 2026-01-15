package com.cashiq.cashmanagement.services.expense;

import com.cashiq.cashmanagement.dto.ExpenseAnalysisResponseDTO;

public interface CashIQExpenseAnalysisAIService {

    ExpenseAnalysisResponseDTO analyzeExpense(String userDescription);
}
