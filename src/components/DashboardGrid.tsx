
import SpendingAnalysisCard from './SpendingAnalysisCard';
import GoalsTrackerCard from './GoalsTrackerCard';

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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <SpendingAnalysisCard 
        spendingCategories={spendingCategories}
        totalMinPayments={totalMinPayments}
        totalPlannedPayments={totalPlannedPayments}
        totalPaid={totalPaid}
        maxTotalPayment={maxTotalPayment}
        debts={debts}
      />
      <GoalsTrackerCard goals={goals} />
    </div>
  );
};

export default DashboardGrid;
