
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import BudgetManager from '@/components/budget/BudgetManager';

const Budget: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 pl-[200px]">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Budget Management</h1>
          
          <BudgetManager />
        </div>
      </div>
    </div>
  );
};

export default Budget;
