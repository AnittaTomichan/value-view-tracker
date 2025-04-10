
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const formSchema = z.object({
  category: z.string({
    required_error: 'Please select a category',
  }),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Amount must be a positive number',
  }),
});

type BudgetItem = {
  category: string;
  budgetAmount: number;
  spentAmount: number;
  id: string;
};

const categories = [
  { value: 'food', label: 'Food' },
  { value: 'transport', label: 'Transport' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'bills', label: 'Bills' },
  { value: 'shopping', label: 'Shopping' },
];

// Demo data
const initialBudgets: BudgetItem[] = [
  { id: '1', category: 'food', budgetAmount: 6000, spentAmount: 1500 },
  { id: '2', category: 'transport', budgetAmount: 3000, spentAmount: 800 },
  { id: '3', category: 'entertainment', budgetAmount: 6000, spentAmount: 1200 },
  { id: '4', category: 'bills', budgetAmount: 4000, spentAmount: 2000 },
  { id: '5', category: 'shopping', budgetAmount: 1500, spentAmount: 1000 },
];

const BudgetManager: React.FC = () => {
  const [budgets, setBudgets] = useState<BudgetItem[]>(initialBudgets);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: '',
      amount: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const amount = parseFloat(data.amount);
      
      // Update existing budget if category exists
      const existingBudgetIndex = budgets.findIndex(b => b.category === data.category);
      
      if (existingBudgetIndex !== -1) {
        const updatedBudgets = [...budgets];
        updatedBudgets[existingBudgetIndex] = {
          ...updatedBudgets[existingBudgetIndex],
          budgetAmount: amount,
        };
        setBudgets(updatedBudgets);
      } else {
        // Add new budget category
        setBudgets([
          ...budgets,
          {
            id: Math.random().toString(36).substring(2),
            category: data.category,
            budgetAmount: amount,
            spentAmount: 0,
          },
        ]);
      }
      
      toast.success('Budget updated successfully');
      form.reset();
    } catch (error) {
      toast.error('Failed to update budget');
      console.error('Budget update error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryLabel = (categoryValue: string) => {
    return categories.find(c => c.value === categoryValue)?.label || categoryValue;
  };

  const getProgressColor = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Set Monthly Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Amount (₹)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter budget amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Budget'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Budget Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {budgets.map((budget) => (
              <div key={budget.id} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{getCategoryLabel(budget.category)}</span>
                  <span className="text-sm text-gray-500">
                    ₹{budget.spentAmount.toLocaleString()} of ₹{budget.budgetAmount.toLocaleString()}
                    {(budget.spentAmount / budget.budgetAmount) > 0.9 && (
                      <span className="ml-2 text-red-500 font-medium">(Almost fully used!)</span>
                    )}
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className={`progress-value ${getProgressColor(budget.spentAmount, budget.budgetAmount)}`}
                    style={{ width: `${Math.min((budget.spentAmount / budget.budgetAmount) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetManager;
