
import { Card } from '@/components/ui/card';
import CategoryBreakdown from './CategoryBreakdown';
import { useNavigate } from 'react-router-dom';

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

interface SpendingAnalysisCardProps {
  spendingCategories: Category[];
  totalMinPayments: number;
  totalPlannedPayments: number;
  totalPaid: number;
  maxTotalPayment: number;
  debts: DebtItem[];
  goals: GoalItem[];
  savingsCurrent: number;
  savingsTarget: number;
  remaining: number;
}

const SpendingAnalysisCard = ({ 
  spendingCategories, 
  totalMinPayments, 
  totalPlannedPayments, 
  totalPaid, 
  maxTotalPayment,
  debts,
  goals,
  savingsCurrent,
  savingsTarget,
  remaining
}: SpendingAnalysisCardProps) => {
  const navigate = useNavigate();

  const handleNeedsClick = () => {
    navigate('/needs');
  };

  const handleWantsClick = () => {
    navigate('/wants');
  };

  const handleDebtClick = () => {
    navigate('/debt');
  };

  const handleGoalsClick = () => {
    navigate('/goals');
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📊</span>
          <h2 className="text-base font-bold text-amber-400">SPENDING ANALYSIS</h2>
        </div>
        
        <CategoryBreakdown 
          categories={spendingCategories} 
          debts={debts}
          goals={goals}
          onDebtClick={handleDebtClick}
          onGoalsClick={handleGoalsClick}
          onNeedsClick={handleNeedsClick}
          onWantsClick={handleWantsClick}
        />
      </div>
    </Card>
  );
};

export default SpendingAnalysisCard;
