
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import MoneyPlanCard from './MoneyPlanCard';
import CategoryBreakdown from './CategoryBreakdown';
import SavingsProgress from './SavingsProgress';
import DebtBreakdown from './DebtBreakdown';
import GoalsBreakdown from './GoalsBreakdown';

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
  const totalDebtBalance = monthlyData.debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinPayments = monthlyData.debts.reduce((sum, debt) => sum + debt.minPayment, 0);
  const totalPlannedPayments = monthlyData.debts.reduce((sum, debt) => sum + (debt.plannedPayment || debt.minPayment), 0);
  
  // Goals calculations
  const totalGoalsTarget = monthlyData.goals.reduce((sum, goal) => sum + goal.target, 0);
  const totalGoalsCurrent = monthlyData.goals.reduce((sum, goal) => sum + goal.current, 0);
  const totalGoalsContributions = monthlyData.goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0);
  
  // Validation checks (reactive)
  const isDebtPaymentConsistent = monthlyData.debt === totalMinPayments;
  const isInvestingConsistent = monthlyData.investing >= totalGoalsContributions;
  const isBudgetBalanced = totalSpent <= monthlyData.income;

  // Filter categories for spending analysis (exclude DEBT, SAVINGS, INVESTING)
  const spendingCategories = monthlyData.categories.filter(cat => 
    cat.name === 'NEEDS' || cat.name === 'WANTS'
  );

  return (
    <div className="space-y-6">
      {/* Status Cards - All reactive to base data */}
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

      {/* Validation Alerts - Show inconsistencies */}
      {(!isDebtPaymentConsistent || !isBudgetBalanced) && (
        <Card className="bg-red-900/20 border-red-700 backdrop-blur-sm">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚠️</span>
              <h2 className="text-base font-bold text-red-400">VALIDATION ALERTS</h2>
            </div>
            <div className="space-y-1 text-sm">
              {!isDebtPaymentConsistent && (
                <div className="text-red-300">
                  • Debt category (${monthlyData.debt}) doesn't match minimum payments (${totalMinPayments})
                </div>
              )}
              {!isBudgetBalanced && (
                <div className="text-red-300">
                  • Total spending (${totalSpent}) exceeds income (${monthlyData.income})
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

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

      {/* Budget Overview - All reactive calculations */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">💼</span>
            <h2 className="text-lg font-bold text-amber-400">MONTHLY OVERVIEW</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <div className="bg-black/30 p-4 rounded border border-slate-600">
              <div className="text-xs text-slate-400 mb-1">BUDGET USAGE</div>
              <div className={`text-xl font-bold ${(totalSpent/totalBudget)*100 <= 100 ? 'text-green-400' : 'text-red-400'}`}>
                {((totalSpent/totalBudget)*100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Financial Summary - New reactive summary */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">📋</span>
            <h2 className="text-lg font-bold text-amber-400">FINANCIAL SUMMARY</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/30 p-4 rounded border border-slate-600">
              <div className="text-xs text-slate-400 mb-2">DEBT OVERVIEW</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-300">Total Balance:</span>
                  <span className="text-red-400">${totalDebtBalance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Min Payments:</span>
                  <span className="text-orange-400">${totalMinPayments.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Planned Payments:</span>
                  <span className="text-blue-400">${totalPlannedPayments.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-black/30 p-4 rounded border border-slate-600">
              <div className="text-xs text-slate-400 mb-2">GOALS OVERVIEW</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-300">Total Target:</span>
                  <span className="text-blue-400">${totalGoalsTarget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Current Total:</span>
                  <span className="text-green-400">${totalGoalsCurrent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Progress:</span>
                  <span className="text-amber-400">{((totalGoalsCurrent/totalGoalsTarget)*100).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div className="bg-black/30 p-4 rounded border border-slate-600">
              <div className="text-xs text-slate-400 mb-2">CASH FLOW</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-300">Income:</span>
                  <span className="text-green-400">${monthlyData.income.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Total Out:</span>
                  <span className="text-red-400">${totalSpent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-300">Net Flow:</span>
                  <span className={remaining >= 0 ? 'text-green-400' : 'text-red-400'}>
                    ${remaining.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
