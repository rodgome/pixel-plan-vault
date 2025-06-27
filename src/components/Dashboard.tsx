
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import MoneyPlanCard from './MoneyPlanCard';
import CategoryBreakdown from './CategoryBreakdown';
import SavingsProgress from './SavingsProgress';
import DebtBreakdown from './DebtBreakdown';

const Dashboard = () => {
  const [monthlyData] = useState({
    income: 5000,
    expenses: 3500,
    savings: 1200,
    debt: 300,
    investing: 200,
    categories: [
      { name: 'NEEDS', amount: 2000, budget: 2500, color: 'bg-red-500' },
      { name: 'WANTS', amount: 800, budget: 1000, color: 'bg-orange-500' },
      { name: 'DEBT', amount: 300, budget: 400, color: 'bg-yellow-500' },
      { name: 'SAVINGS', amount: 1200, budget: 1500, color: 'bg-green-500' },
      { name: 'INVESTING', amount: 200, budget: 300, color: 'bg-blue-500' }
    ],
    debts: [
      {
        name: 'Credit Card - Chase',
        balance: 3500,
        minPayment: 105,
        interestRate: 24.99,
        type: 'credit_card' as const
      },
      {
        name: 'Student Loan',
        balance: 15000,
        minPayment: 180,
        interestRate: 6.5,
        type: 'loan' as const
      },
      {
        name: 'Car Loan',
        balance: 12000,
        minPayment: 285,
        interestRate: 4.2,
        type: 'loan' as const
      }
    ]
  });

  const totalBudget = monthlyData.categories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = monthlyData.categories.reduce((sum, cat) => sum + cat.amount, 0);
  const remaining = monthlyData.income - totalSpent - monthlyData.debt;

  // Filter categories for spending analysis (exclude DEBT, SAVINGS, INVESTING)
  const spendingCategories = monthlyData.categories.filter(cat => 
    cat.name === 'NEEDS' || cat.name === 'WANTS'
  );

  return (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <MoneyPlanCard
          title="INCOME"
          amount={monthlyData.income}
          icon="💰"
          color="text-green-400"
          bgColor="bg-green-900/20"
        />
        <MoneyPlanCard
          title="EXPENSES"
          amount={monthlyData.expenses}
          icon="💸"
          color="text-red-400"
          bgColor="bg-red-900/20"
        />
        <MoneyPlanCard
          title="DEBT"
          amount={monthlyData.debt}
          icon="⚠️"
          color="text-orange-400"
          bgColor="bg-orange-900/20"
        />
        <MoneyPlanCard
          title="SAVINGS"
          amount={monthlyData.savings}
          icon="🏦"
          color="text-blue-400"
          bgColor="bg-blue-900/20"
        />
        <MoneyPlanCard
          title="INVESTING"
          amount={monthlyData.investing}
          icon="📈"
          color="text-purple-400"
          bgColor="bg-purple-900/20"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending Analysis */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">📊</span>
              <h2 className="text-lg font-bold text-amber-400">SPENDING ANALYSIS</h2>
            </div>
            <CategoryBreakdown categories={spendingCategories} />
          </div>
        </Card>

        {/* Debt Breakdown */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">💳</span>
              <h2 className="text-lg font-bold text-amber-400">DEBT TRACKER</h2>
            </div>
            <DebtBreakdown debts={monthlyData.debts} />
          </div>
        </Card>

        {/* Savings Progress */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🎯</span>
              <h2 className="text-lg font-bold text-amber-400">VAULT STATUS</h2>
            </div>
            <SavingsProgress 
              current={monthlyData.savings}
              target={2000}
              remaining={remaining}
            />
          </div>
        </Card>
      </div>

      {/* Budget Overview */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">💼</span>
            <h2 className="text-lg font-bold text-amber-400">MONTHLY OVERVIEW</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/30 p-4 rounded border border-slate-600">
              <div className="text-xs text-slate-400 mb-1">TOTAL BUDGET</div>
              <div className="text-xl font-bold text-blue-400">${totalBudget.toLocaleString()}</div>
            </div>
            <div className="bg-black/30 p-4 rounded border border-slate-600">
              <div className="text-xs text-slate-400 mb-1">TOTAL SPENT</div>
              <div className="text-xl font-bold text-red-400">${totalSpent.toLocaleString()}</div>
            </div>
            <div className="bg-black/30 p-4 rounded border border-slate-600">
              <div className="text-xs text-slate-400 mb-1">REMAINING</div>
              <div className={`text-xl font-bold ${remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${remaining.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
