
package com.example.expensetracker.controller;

import com.example.expensetracker.dto.ExpenseRequest;
import com.example.expensetracker.dto.ExpenseResponse;
import com.example.expensetracker.model.Expense;
import com.example.expensetracker.model.User;
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

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    
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
    public List<ExpenseResponse> getAllExpenses() {
        User currentUser = getCurrentUser();
        return expenseRepository.findByUserIdOrderByDateDesc(currentUser.getId())
                .stream()
                .map(this::mapToExpenseResponse)
                .collect(Collectors.toList());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ExpenseResponse> getExpenseById(@PathVariable Long id) {
        User currentUser = getCurrentUser();
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Expense not found"));
        
        if (!expense.getUser().getId().equals(currentUser.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized to access this expense");
        }
        
        return ResponseEntity.ok(mapToExpenseResponse(expense));
    }
    
    @PostMapping
    public ResponseEntity<ExpenseResponse> createExpense(@Valid @RequestBody ExpenseRequest expenseRequest) {
        User currentUser = getCurrentUser();
        
        Expense expense = new Expense();
        expense.setDescription(expenseRequest.getDescription());
        expense.setAmount(expenseRequest.getAmount());
        expense.setDate(expenseRequest.getDate());
        expense.setCategory(expenseRequest.getCategory());
        expense.setUser(currentUser);
        
        Expense savedExpense = expenseRepository.save(expense);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(mapToExpenseResponse(savedExpense));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ExpenseResponse> updateExpense(@PathVariable Long id, @Valid @RequestBody ExpenseRequest expenseRequest) {
        User currentUser = getCurrentUser();
        
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Expense not found"));
        
        if (!expense.getUser().getId().equals(currentUser.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized to update this expense");
        }
        
        expense.setDescription(expenseRequest.getDescription());
        expense.setAmount(expenseRequest.getAmount());
        expense.setDate(expenseRequest.getDate());
        expense.setCategory(expenseRequest.getCategory());
        
        Expense updatedExpense = expenseRepository.save(expense);
        
        return ResponseEntity.ok(mapToExpenseResponse(updatedExpense));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Long id) {
        User currentUser = getCurrentUser();
        
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Expense not found"));
        
        if (!expense.getUser().getId().equals(currentUser.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized to delete this expense");
        }
        
        expenseRepository.delete(expense);
        
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/by-date")
    public List<ExpenseResponse> getExpensesByDateRange(
            @RequestParam String startDate,
            @RequestParam String endDate) {
        User currentUser = getCurrentUser();
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        
        return expenseRepository.findByUserIdAndDateBetween(currentUser.getId(), start, end)
                .stream()
                .map(this::mapToExpenseResponse)
                .collect(Collectors.toList());
    }
    
    @GetMapping("/by-category")
    public Map<String, Object> getExpensesByCategory(
            @RequestParam String startDate,
            @RequestParam String endDate) {
        User currentUser = getCurrentUser();
        LocalDate start = LocalDate.parse(startDate);
        LocalDate end = LocalDate.parse(endDate);
        
        List<Object[]> results = expenseRepository.findExpensesByCategory(currentUser.getId(), start, end);
        
        Map<String, Object> response = new HashMap<>();
        for (Object[] result : results) {
            response.put((String) result[0], result[1]);
        }
        
        return response;
    }
    
    private ExpenseResponse mapToExpenseResponse(Expense expense) {
        return new ExpenseResponse(
                expense.getId(),
                expense.getDescription(),
                expense.getAmount(),
                expense.getDate(),
                expense.getCategory()
        );
    }
}
