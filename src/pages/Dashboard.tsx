
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import FinancialSummary from '@/components/dashboard/FinancialSummary';
import LatestTransactions from '@/components/dashboard/LatestTransactions';
import SpendingOverview from '@/components/charts/SpendingOverview';
import CategoryPieChart from '@/components/charts/CategoryPieChart';
import { useAuth } from '@/context/AuthContext';

// Mock data for the components
const mockTransactions = [
  { id: '1', date: '2023-10-05', description: 'Netflix Subscription', amount: 500 },
  { id: '2', date: '2023-10-02', description: 'Grocery Shopping', amount: 2200 },
  { id: '3', date: '2023-10-01', description: 'Fuel', amount: 1600 },
];

const mockDailyData = [
  { name: 'Oct 1', amount: 1600 },
  { name: 'Oct 2', amount: 2200 },
  { name: 'Oct 3', amount: 900 },
  { name: 'Oct 4', amount: 1400 },
  { name: 'Oct 5', amount: 500 },
];

const mockWeeklyData = [
  { name: 'Week 1', amount: 4700 },
  { name: 'Week 2', amount: 6200 },
  { name: 'Week 3', amount: 5100 },
  { name: 'Week 4', amount: 4900 },
];

const mockMonthlyData = [
  { name: 'Jan', amount: 15000 },
  { name: 'Feb', amount: 18000 },
  { name: 'Mar', amount: 16500 },
  { name: 'Apr', amount: 19000 },
  { name: 'May', amount: 17200 },
  { name: 'Jun', amount: 21000 },
];

const mockCategoryData = [
  { name: 'Food', value: 6500, color: '#FF6B6B' },
  { name: 'Transport', value: 4200, color: '#4ECDC4' },
  { name: 'Entertainment', value: 3800, color: '#A78BFA' },
  { name: 'Bills', value: 5200, color: '#FFD166' },
  { name: 'Shopping', value: 2800, color: '#F472B6' },
  { name: 'Others', value: 1500, color: '#FFA07A' },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 pl-[200px]">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Welcome, {user?.name || 'User'}!</h1>
          
          <FinancialSummary 
            totalBalance={45000} 
            monthlyBudget={25000} 
            expensesThisMonth={9500} 
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <SpendingOverview 
              dailyData={mockDailyData}
              weeklyData={mockWeeklyData}
              monthlyData={mockMonthlyData}
            />
            
            <CategoryPieChart data={mockCategoryData} />
          </div>
          
          <LatestTransactions transactions={mockTransactions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
