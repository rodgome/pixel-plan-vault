
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import CategoryBreakdown from './CategoryBreakdown';
import SavingsProgress from './SavingsProgress';
import DebtBreakdown from './DebtBreakdown';
import GoalsBreakdown from './GoalsBreakdown';
import FinancialSummaryCards from './FinancialSummaryCards';
import ValidationAlerts from './ValidationAlerts';
import BudgetOverview from './BudgetOverview';
import FinancialSummary from './FinancialSummary';

const Dashboard = () => {
  const [baseData] = useState({
    income: 5000,
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
        plannedPayment: 200,
        totalPaid: 150,
        interestRate: 24.99,
        type: 'credit_card' as const
      },
      {
        name: 'Student Loan',
        balance: 15000,
        minPayment: 180,
        plannedPayment: 250,
        totalPaid: 180,
        interestRate: 6.5,
        type: 'loan' as const
      },
      {
        name: 'Car Loan',
        balance: 12000,
        minPayment: 285,
        plannedPayment: 350,
        totalPaid: 285,
        interestRate: 4.2,
        type: 'loan' as const
      }
    ],
    goals: [
      {
        name: 'Emergency Fund',
        target: 15000,
        current: 8500,
        monthlyContribution: 500,
        plannedContribution: 750,
        type: 'emergency_fund' as const,
        deadline: 'Dec 2025'
      },
      {
        name: 'Retirement 401k',
        target: 100000,
        current: 35000,
        monthlyContribution: 800,
        plannedContribution: 1000,
        type: 'retirement' as const
      },
      {
        name: 'Vacation Fund',
        target: 5000,
        current: 1200,
        monthlyContribution: 200,
        plannedContribution: 300,
        type: 'vacation' as const,
        deadline: 'Jun 2025'
      },
      {
        name: 'Stock Portfolio',
        target: 25000,
        current: 12500,
        monthlyContribution: 400,
        plannedContribution: 600,
        type: 'investment' as const
      }
    ]
  });

  // Reactive calculations - all derived from base data
  const monthlyData = {
    income: baseData.income,
    
    // Calculate actual amounts from categories
    expenses: baseData.categories.filter(cat => cat.name === 'NEEDS' || cat.name === 'WANTS')
      .reduce((sum, cat) => sum + cat.amount, 0),
    
    debt: baseData.categories.find(cat => cat.name === 'DEBT')?.amount || 0,
    savings: baseData.categories.find(cat => cat.name === 'SAVINGS')?.amount || 0,
    investing: baseData.categories.find(cat => cat.name === 'INVESTING')?.amount || 0,
    
    categories: baseData.categories,
    debts: baseData.debts,
    goals: baseData.goals
  };

  // Reactive financial calculations
  const totalBudget = monthlyData.categories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = monthlyData.categories.reduce((sum, cat) => sum + cat.amount, 0);
  const remaining = monthlyData.income - totalSpent;
  
  // Debt calculations
  const totalMinPayments = monthlyData.debts.reduce((sum, debt) => sum + debt.minPayment, 0);
  
  // Validation checks (reactive)
  const isDebtPaymentConsistent = monthlyData.debt === totalMinPayments;
  const isBudgetBalanced = totalSpent <= monthlyData.income;

  // Filter categories for spending analysis (exclude DEBT, SAVINGS, INVESTING)
  const spendingCategories = monthlyData.categories.filter(cat => 
    cat.name === 'NEEDS' || cat.name === 'WANTS'
  );

  return (
    <div className="space-y-6">
      {/* Status Cards - All reactive to base data */}
      <FinancialSummaryCards
        income={monthlyData.income}
        expenses={monthlyData.expenses}
        debt={monthlyData.debt}
        savings={monthlyData.savings}
        investing={monthlyData.investing}
      />

      {/* Validation Alerts - Show inconsistencies */}
      <ValidationAlerts
        isDebtPaymentConsistent={isDebtPaymentConsistent}
        isBudgetBalanced={isBudgetBalanced}
        debtAmount={monthlyData.debt}
        totalMinPayments={totalMinPayments}
        totalSpent={totalSpent}
        income={monthlyData.income}
      />

      {/* Main Content Grid - Changed to 3 columns for more compact layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Spending Analysis */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">📊</span>
              <h2 className="text-base font-bold text-amber-400">SPENDING ANALYSIS</h2>
            </div>
            <CategoryBreakdown categories={spendingCategories} />
          </div>
        </Card>

        {/* Debt Breakdown */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">💳</span>
              <h2 className="text-base font-bold text-amber-400">DEBT TRACKER</h2>
            </div>
            <DebtBreakdown debts={monthlyData.debts} />
          </div>
        </Card>

        {/* Goals Breakdown */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🎯</span>
              <h2 className="text-base font-bold text-amber-400">GOALS TRACKER</h2>
            </div>
            <GoalsBreakdown goals={monthlyData.goals} />
          </div>
        </Card>
      </div>

      {/* Savings Progress - Now full width with reactive calculations */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">🏦</span>
            <h2 className="text-lg font-bold text-amber-400">VAULT STATUS</h2>
          </div>
          <SavingsProgress 
            current={monthlyData.savings}
            target={2000}
            remaining={remaining}
          />
        </div>
      </Card>

      {/* Budget Overview */}
      <BudgetOverview
        totalBudget={totalBudget}
        totalSpent={totalSpent}
        remaining={remaining}
      />

      {/* Financial Summary */}
      <FinancialSummary
        debts={monthlyData.debts}
        goals={monthlyData.goals}
        income={monthlyData.income}
        totalSpent={totalSpent}
        remaining={remaining}
      />
    </div>
  );
};

export default Dashboard;
