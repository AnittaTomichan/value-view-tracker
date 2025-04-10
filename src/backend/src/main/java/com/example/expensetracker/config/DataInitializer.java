
package com.example.expensetracker.config;

import com.example.expensetracker.model.Budget;
import com.example.expensetracker.model.Expense;
import com.example.expensetracker.model.User;
import com.example.expensetracker.repository.BudgetRepository;
import com.example.expensetracker.repository.ExpenseRepository;
import com.example.expensetracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ExpenseRepository expenseRepository;
    
    @Autowired
    private BudgetRepository budgetRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Create a demo user if none exists
        if (userRepository.count() == 0) {
            User demoUser = new User();
            demoUser.setName("Demo User");
            demoUser.setEmail("demo@example.com");
            demoUser.setPassword(passwordEncoder.encode("password"));
            
            userRepository.save(demoUser);
            
            // Add sample expenses
            List<Expense> expenses = Arrays.asList(
                new Expense(null, "Groceries", new BigDecimal("120.50"), LocalDate.now().minusDays(5), "food", demoUser),
                new Expense(null, "Bus fare", new BigDecimal("30.00"), LocalDate.now().minusDays(4), "transport", demoUser),
                new Expense(null, "Movie tickets", new BigDecimal("45.00"), LocalDate.now().minusDays(3), "entertainment", demoUser),
                new Expense(null, "Electricity bill", new BigDecimal("78.25"), LocalDate.now().minusDays(2), "bills", demoUser),
                new Expense(null, "New T-shirt", new BigDecimal("25.00"), LocalDate.now().minusDays(1), "shopping", demoUser)
            );
            
            expenseRepository.saveAll(expenses);
            
            // Add sample budgets
            YearMonth currentMonth = YearMonth.now();
            List<Budget> budgets = Arrays.asList(
                new Budget(null, "food", new BigDecimal("6000.00"), currentMonth, demoUser),
                new Budget(null, "transport", new BigDecimal("3000.00"), currentMonth, demoUser),
                new Budget(null, "entertainment", new BigDecimal("2000.00"), currentMonth, demoUser),
                new Budget(null, "bills", new BigDecimal("4000.00"), currentMonth, demoUser),
                new Budget(null, "shopping", new BigDecimal("1500.00"), currentMonth, demoUser)
            );
            
            budgetRepository.saveAll(budgets);
        }
    }
}
