
package com.example.expensetracker.controller;

import com.example.expensetracker.dto.BudgetRequest;
import com.example.expensetracker.dto.BudgetResponse;
import com.example.expensetracker.model.Budget;
import com.example.expensetracker.model.User;
import com.example.expensetracker.repository.BudgetRepository;
import com.example.expensetracker.repository.ExpenseRepository;
import com.example.expensetracker.repository.UserRepository;
import com.example.expensetracker.security.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/budgets")
public class BudgetController {
    
    @Autowired
    private BudgetRepository budgetRepository;
    
    @Autowired
    private ExpenseRepository expenseRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }
    
    @GetMapping
    public List<BudgetResponse> getAllBudgets(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month) {
        User currentUser = getCurrentUser();
        YearMonth yearMonth = (year != null && month != null) ?
                YearMonth.of(year, month) : YearMonth.now();
        
        return budgetRepository.findByUserIdAndYearMonth(currentUser.getId(), yearMonth)
                .stream()
                .map(this::mapToBudgetResponse)
                .collect(Collectors.toList());
    }
    
    @PostMapping
    public ResponseEntity<BudgetResponse> createOrUpdateBudget(@Valid @RequestBody BudgetRequest budgetRequest) {
        User currentUser = getCurrentUser();
        YearMonth yearMonth = YearMonth.of(budgetRequest.getYear(), budgetRequest.getMonth());
        
        Optional<Budget> existingBudget = budgetRepository.findByUserIdAndCategoryAndYearMonth(
                currentUser.getId(), budgetRequest.getCategory(), yearMonth);
        
        Budget budget;
        if (existingBudget.isPresent()) {
            budget = existingBudget.get();
            budget.setAmount(budgetRequest.getAmount());
        } else {
            budget = new Budget();
            budget.setCategory(budgetRequest.getCategory());
            budget.setAmount(budgetRequest.getAmount());
            budget.setYearMonth(yearMonth);
            budget.setUser(currentUser);
        }
        
        Budget savedBudget = budgetRepository.save(budget);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(mapToBudgetResponse(savedBudget));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBudget(@PathVariable Long id) {
        User currentUser = getCurrentUser();
        
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Budget not found"));
        
        if (!budget.getUser().getId().equals(currentUser.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized to delete this budget");
        }
        
        budgetRepository.delete(budget);
        
        return ResponseEntity.ok().build();
    }
    
    private BudgetResponse mapToBudgetResponse(Budget budget) {
        User currentUser = getCurrentUser();
        YearMonth yearMonth = budget.getYearMonth();
        
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();
        
        // Calculate spent amount for this category and month
        BigDecimal spentAmount = BigDecimal.ZERO;
        List<Object[]> results = expenseRepository.findExpensesByCategory(
                currentUser.getId(), startDate, endDate);
        
        for (Object[] result : results) {
            String category = (String) result[0];
            if (category.equals(budget.getCategory())) {
                spentAmount = (BigDecimal) result[1];
                break;
            }
        }
        
        return new BudgetResponse(
                budget.getId(),
                budget.getCategory(),
                budget.getAmount(),
                budget.getYearMonth().getYear(),
                budget.getYearMonth().getMonthValue(),
                spentAmount
        );
    }
}
