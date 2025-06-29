
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CategoryBreakdown from './CategoryBreakdown';
import DebtBreakdown from './DebtBreakdown';
import GoalsBreakdown from './GoalsBreakdown';

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
  const [isDebtDialogOpen, setIsDebtDialogOpen] = useState(false);
  const [isGoalsDialogOpen, setIsGoalsDialogOpen] = useState(false);

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
          onDebtClick={() => setIsDebtDialogOpen(true)}
          onGoalsClick={() => setIsGoalsDialogOpen(true)}
        />
        
        {/* Debt Dialog */}
        <Dialog open={isDebtDialogOpen} onOpenChange={setIsDebtDialogOpen}>
          <DialogContent className="max-w-2xl bg-slate-800 border-slate-700 text-slate-200">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-amber-400">
                <span className="text-lg">💳</span>
                DEBT TRACKER
              </DialogTitle>
            </DialogHeader>
            <DebtBreakdown debts={debts} />
          </DialogContent>
        </Dialog>

        {/* Goals Dialog */}
        <Dialog open={isGoalsDialogOpen} onOpenChange={setIsGoalsDialogOpen}>
          <DialogContent className="max-w-2xl bg-slate-800 border-slate-700 text-slate-200">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-amber-400">
                <span className="text-lg">🎯</span>
                GOALS TRACKER
              </DialogTitle>
            </DialogHeader>
            <GoalsBreakdown goals={goals} />
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};

export default SpendingAnalysisCard;
