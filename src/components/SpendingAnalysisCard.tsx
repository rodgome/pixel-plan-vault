import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CategoryBreakdown from './CategoryBreakdown';
import DebtBreakdown from './DebtBreakdown';
import SavingsProgress from './SavingsProgress';

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
  const [isSavingsDialogOpen, setIsSavingsDialogOpen] = useState(false);

  const savingsPercentage = (savingsCurrent / savingsTarget) * 100;
  const debtPercentage = (totalPaid / maxTotalPayment) * 100;

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📊</span>
          <h2 className="text-base font-bold text-amber-400">SPENDING ANALYSIS</h2>
        </div>
        <CategoryBreakdown categories={spendingCategories} />
        
        {/* Debt Payment Progress - Styled like category breakdown */}
        <div className="mt-4 pt-4 border-t border-slate-600">
          <Dialog open={isDebtDialogOpen} onOpenChange={setIsDebtDialogOpen}>
            <DialogTrigger asChild>
              <div className="group hover:bg-slate-700/30 p-3 rounded transition-all duration-200 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded" />
                    <span className="text-sm font-bold text-slate-300">DEBT PAYMENTS</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-amber-400">
                      ${totalPaid} / ${totalPlannedPayments}
                    </div>
                    <div className={`text-xs ${debtPercentage >= 100 ? 'text-green-400' : 'text-orange-400'}`}>
                      {debtPercentage >= 100 ? 'COMPLETE' : 'IN PROGRESS'}
                    </div>
                  </div>
                </div>
                <div className="bg-slate-700 h-2 rounded overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500 bg-red-500"
                    style={{ width: `${Math.min(debtPercentage, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {debtPercentage.toFixed(0)}% paid
                </div>
              </div>
            </DialogTrigger>
            
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
        </div>

        {/* Savings Progress - Styled like category breakdown */}
        <div className="mt-4 pt-4 border-t border-slate-600">
          <Dialog open={isSavingsDialogOpen} onOpenChange={setIsSavingsDialogOpen}>
            <DialogTrigger asChild>
              <div className="group hover:bg-slate-700/30 p-3 rounded transition-all duration-200 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded" />
                    <span className="text-sm font-bold text-slate-300">SAVINGS PROGRESS</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-amber-400">
                      ${savingsCurrent.toLocaleString()} / ${savingsTarget.toLocaleString()}
                    </div>
                    <div className={`text-xs ${savingsPercentage >= 100 ? 'text-green-400' : 'text-blue-400'}`}>
                      {savingsPercentage >= 100 ? 'TARGET REACHED' : 'ON TRACK'}
                    </div>
                  </div>
                </div>
                <div className="bg-slate-700 h-2 rounded overflow-hidden">
                  <div 
                    className="h-full transition-all duration-500 bg-green-500"
                    style={{ width: `${Math.min(savingsPercentage, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {savingsPercentage.toFixed(0)}% completed
                </div>
              </div>
            </DialogTrigger>
            
            <DialogContent className="max-w-2xl bg-slate-800 border-slate-700 text-slate-200">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-amber-400">
                  <span className="text-lg">🏦</span>
                  SAVINGS TRACKER
                </DialogTitle>
              </DialogHeader>
              <SavingsProgress 
                current={savingsCurrent}
                target={savingsTarget}
                remaining={remaining}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Card>
  );
};

export default SpendingAnalysisCard;
