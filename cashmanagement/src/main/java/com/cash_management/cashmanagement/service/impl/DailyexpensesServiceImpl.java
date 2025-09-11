package com.cash_management.cashmanagement.service.impl;

import com.cash_management.cashmanagement.dto.DailyexpensesDTO;
import com.cash_management.cashmanagement.entity.Dailyexpenses;
import com.cash_management.cashmanagement.repository.DailyexpensesRepository;
import com.cash_management.cashmanagement.service.DailyexpensesService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DailyexpensesServiceImpl implements DailyexpensesService {

    private final DailyexpensesRepository dailyexpensesRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<DailyexpensesDTO> getAllExpenses() {
        List<Dailyexpenses> dailyexpenses= dailyexpensesRepository.findAll();
        // Here you would typically convert the List<Dailyexpenses> to List<DailyexpensesDTO
        List<DailyexpensesDTO> dailyexpensesDTOList = dailyexpenses.stream().map(dailyexpense -> modelMapper.map(dailyexpense, DailyexpensesDTO.class)).toList();

        return dailyexpensesDTOList;
    }

    @Override
    public DailyexpensesDTO addExpense(DailyexpensesDTO dailyexpensesDTO) {
        Dailyexpenses newExpense = modelMapper.map(dailyexpensesDTO, Dailyexpenses.class);
        Dailyexpenses dailyexpenses = dailyexpensesRepository.save(newExpense);
        return modelMapper.map(dailyexpenses, DailyexpensesDTO.class);
    }
}
