
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type SpendingDataPoint = {
  name: string;
  amount: number;
};

type SpendingOverviewProps = {
  dailyData: SpendingDataPoint[];
  weeklyData: SpendingDataPoint[];
  monthlyData: SpendingDataPoint[];
};

const SpendingOverview: React.FC<SpendingOverviewProps> = ({
  dailyData,
  weeklyData,
  monthlyData,
}) => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  // Select data based on timeframe
  const data = {
    daily: dailyData,
    weekly: weeklyData,
    monthly: monthlyData,
  }[timeframe];

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Spending Overview</CardTitle>
        <div className="flex space-x-2">
          <Button 
            variant={timeframe === 'daily' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeframe('daily')}
          >
            Daily
          </Button>
          <Button 
            variant={timeframe === 'weekly' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeframe('weekly')}
          >
            Weekly
          </Button>
          <Button 
            variant={timeframe === 'monthly' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeframe('monthly')}
          >
            Monthly
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#0ea5e9"
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingOverview;
