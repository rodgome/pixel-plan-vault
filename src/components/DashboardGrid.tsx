
import SpendingAnalysisCard from './SpendingAnalysisCard';

interface Category {
  name: string;
  amount: number;
  budget: number;
  color: string;
}

interface DebtItem {
  name: string;
  balance: number;
  minPayment: number;
  plannedPayment?: number;
  totalPaid?: number;
  interestRate: number;
  type: 'credit_card' | 'loan' | 'mortgage' | 'other';
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
  // Calculate savings data from goals
  const totalSavingsCurrent = goals.reduce((sum, goal) => sum + goal.current, 0);
  const totalSavingsTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  
  // Calculate remaining based on income minus expenses (this would come from parent component ideally)
  const totalExpenses = spendingCategories.reduce((sum, cat) => sum + cat.amount, 0) + totalPlannedPayments;
  const remaining = 5000 - totalExpenses; // Using placeholder income, should be passed as prop

  return (
    <div className="grid grid-cols-1 gap-4">
      <SpendingAnalysisCard 
        spendingCategories={spendingCategories}
        totalMinPayments={totalMinPayments}
        totalPlannedPayments={totalPlannedPayments}
        totalPaid={totalPaid}
        maxTotalPayment={maxTotalPayment}
        debts={debts}
        goals={goals}
        savingsCurrent={totalSavingsCurrent}
        savingsTarget={totalSavingsTarget}
        remaining={remaining}
      />
    </div>
  );
};

export default DashboardGrid;
