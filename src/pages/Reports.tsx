
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download } from 'lucide-react';

// Mock data for the report
const mockExpenseData = [
  { id: '1', date: '2023-10-01', category: 'Food', amount: 1200, description: 'Groceries' },
  { id: '2', date: '2023-10-02', category: 'Transport', amount: 800, description: 'Fuel' },
  { id: '3', date: '2023-10-03', category: 'Entertainment', amount: 1500, description: 'Movie tickets' },
  { id: '4', date: '2023-10-05', category: 'Bills', amount: 2000, description: 'Electricity bill' },
  { id: '5', date: '2023-10-07', category: 'Shopping', amount: 3000, description: 'Clothes' },
  { id: '6', date: '2023-10-10', category: 'Food', amount: 900, description: 'Restaurant' },
  { id: '7', date: '2023-10-12', category: 'Transport', amount: 500, description: 'Taxi' },
  { id: '8', date: '2023-10-15', category: 'Bills', amount: 1200, description: 'Water bill' },
];

const Reports: React.FC = () => {
  const totalExpenses = mockExpenseData.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Simulate CSV download
  const downloadCSV = () => {
    const headers = ['Date', 'Category', 'Amount', 'Description'];
    const csvData = mockExpenseData.map(expense => 
      `${expense.date},${expense.category},${expense.amount},${expense.description}`
    );
    
    const csv = [
      headers.join(','),
      ...csvData
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'expense_report.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 pl-[200px]">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Financial Reports</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Expense Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-gray-500 text-sm font-medium">Total Expenses</h3>
                  <p className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-gray-500 text-sm font-medium">Savings</h3>
                  <p className="text-2xl font-bold">₹{(25000 - totalExpenses).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Expense Breakdown</CardTitle>
              <Button variant="outline" size="sm" onClick={downloadCSV}>
                <Download className="mr-2 h-4 w-4" />
                Download CSV
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount (₹)</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockExpenseData.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>₹{expense.amount.toLocaleString()}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;
