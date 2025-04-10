
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import AddExpenseForm from '@/components/forms/AddExpenseForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AddExpense: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 pl-[200px]">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Add New Expense</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>New Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <AddExpenseForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
