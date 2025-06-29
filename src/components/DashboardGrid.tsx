
import SpendingAnalysisCard from './SpendingAnalysisCard';
import DebtTrackerCard from './DebtTrackerCard';
import GoalsTrackerCard from './GoalsTrackerCard';
import { DebtItem } from '@/types/debt';

interface Category {
  name: string;
  amount: number;
  budget: number;
  color: string;
}

interface GoalItem {
  name: string;
  target: number;
  current: number;
  monthlyContribution: number;
  plannedContribution?: number;
  type: 'emergency_fund' | 'retirement' | 'investment' | 'vacation' | 'other';
  deadline?: string;
}

interface DashboardGridProps {
  spendingCategories: Category[];
  debts: DebtItem[];
  goals: GoalItem[];
  totalMinPayments: number;
  totalPlannedPayments: number;
  totalPaid: number;
  maxTotalPayment: number;
}

const DashboardGrid = ({
  spendingCategories,
  debts,
  goals,
  totalMinPayments,
  totalPlannedPayments,
  totalPaid,
  maxTotalPayment
}: DashboardGridProps) => {
  const debtBudget = spendingCategories.find(cat => cat.name === 'DEBT')?.budget || 0;
  const debtSpent = spendingCategories.find(cat => cat.name === 'DEBT')?.amount || 0;

  // Calculate savings progress (simplified)
  const savingsCurrent = goals.reduce((sum, goal) => sum + goal.current, 0);
  const savingsTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const remaining = spendingCategories.reduce((sum, cat) => sum - cat.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SpendingAnalysisCard 
        spendingCategories={spendingCategories}
        totalMinPayments={totalMinPayments}
        totalPlannedPayments={totalPlannedPayments}
        totalPaid={totalPaid}
        maxTotalPayment={maxTotalPayment}
        debts={debts}
        goals={goals}
        savingsCurrent={savingsCurrent}
        savingsTarget={savingsTarget}
        remaining={remaining}
      />
      
      <DebtTrackerCard 
        debts={debts} 
        debtBudget={debtBudget}
        debtSpent={debtSpent}
      />
      
      <GoalsTrackerCard 
        goals={goals} 
      />
    </div>
  );
};

export default DashboardGrid;
