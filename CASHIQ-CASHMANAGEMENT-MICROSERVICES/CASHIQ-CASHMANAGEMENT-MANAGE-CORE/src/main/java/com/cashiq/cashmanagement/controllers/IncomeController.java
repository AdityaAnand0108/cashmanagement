package com.cashiq.cashmanagement.controllers;

import com.cashiq.cashmanagement.dto.IncomeDTO;
import com.cashiq.cashmanagement.services.IncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class IncomeController {

    private final IncomeService incomeService;

    @PostMapping("/add-income")
    public String addIncome(@RequestBody IncomeDTO incomeDTO) {
        return incomeService.addIncome(incomeDTO);
    }

    @GetMapping("/get-all-income")
    public List<IncomeDTO> getAllIncomes() {
        return incomeService.getAllIncomes();
    }
}
