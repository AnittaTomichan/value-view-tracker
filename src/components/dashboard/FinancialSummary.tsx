
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Wallet, Calendar, PieChart } from 'lucide-react';

type FinancialSummaryProps = {
  totalBalance: number;
  monthlyBudget: number;
  expensesThisMonth: number;
};

const FinancialSummary: React.FC<FinancialSummaryProps> = ({
  totalBalance,
  monthlyBudget,
  expensesThisMonth,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="rounded-full bg-blue-100 p-3 mb-4">
            <Wallet className="h-6 w-6 text-app-blue" />
          </div>
          <h3 className="text-lg font-medium text-gray-500">Total Balance</h3>
          <p className="text-3xl font-bold">₹{totalBalance.toLocaleString()}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <Calendar className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-500">Monthly Budget</h3>
          <p className="text-3xl font-bold">₹{monthlyBudget.toLocaleString()}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="rounded-full bg-purple-100 p-3 mb-4">
            <PieChart className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-500">Expenses This Month</h3>
          <p className="text-3xl font-bold">₹{expensesThisMonth.toLocaleString()}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialSummary;
