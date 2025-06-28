
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

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📊</span>
          <h2 className="text-base font-bold text-amber-400">SPENDING ANALYSIS</h2>
        </div>
        <CategoryBreakdown categories={spendingCategories} />
        
        {/* Debt Payment Progress - Clickable */}
        <div className="mt-4 pt-4 border-t border-slate-600">
          <Dialog open={isDebtDialogOpen} onOpenChange={setIsDebtDialogOpen}>
            <DialogTrigger asChild>
              <div className="bg-black/30 p-4 rounded border border-slate-600 cursor-pointer hover:bg-black/40 transition-colors">
                <div className="text-xs text-slate-400 mb-2">DEBT PAYMENTS (Click to view details)</div>

                {/* Total Payment Progress Bar */}
                <div className="space-y-2">
                  <div className="text-xs text-slate-400 mb-1">TOTAL PAYMENT PROGRESS</div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-orange-400">Min: ${totalMinPayments.toLocaleString()}</span>
                    <span className="text-blue-400">Planned: ${totalPlannedPayments.toLocaleString()}</span>
                    <span className="text-green-400">Paid: ${totalPaid.toLocaleString()}</span>
                  </div>
                  
                  <div className="relative h-4 bg-slate-700 rounded overflow-hidden">
                    {/* Min Payment Bar */}
                    <div 
                      className="absolute top-0 left-0 h-full bg-orange-500/60"
                      style={{ width: `${(totalMinPayments / maxTotalPayment) * 100}%` }}
                    />
                    {/* Planned Payment Bar */}
                    <div 
                      className="absolute top-0 left-0 h-full bg-blue-500/60"
                      style={{ width: `${(totalPlannedPayments / maxTotalPayment) * 100}%` }}
                    />
                    {/* Total Paid Bar */}
                    <div 
                      className="absolute top-0 left-0 h-full bg-green-500"
                      style={{ width: `${(totalPaid / maxTotalPayment) * 100}%` }}
                    />
                    
                    {/* Dotted line for minimum payment */}
                    <div 
                      className="absolute top-0 h-full w-1 border-l-4 border-dashed border-red-500"
                      style={{ left: `${(totalMinPayments / maxTotalPayment) * 100}%` }}
                    />
                  </div>
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

        {/* Savings Progress - Clickable */}
        <div className="mt-4 pt-4 border-t border-slate-600">
          <Dialog open={isSavingsDialogOpen} onOpenChange={setIsSavingsDialogOpen}>
            <DialogTrigger asChild>
              <div className="bg-black/30 p-4 rounded border border-slate-600 cursor-pointer hover:bg-black/40 transition-colors">
                <div className="text-xs text-slate-400 mb-2">SAVINGS PROGRESS (Click to view details)</div>

                {/* Savings Progress Bar */}
                <div className="space-y-2">
                  <div className="text-xs text-slate-400 mb-1">VAULT PROGRESS</div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-green-400">Current: ${savingsCurrent.toLocaleString()}</span>
                    <span className="text-blue-400">Target: ${savingsTarget.toLocaleString()}</span>
                    <span className="text-amber-400">{savingsPercentage.toFixed(0)}%</span>
                  </div>
                  
                  <div className="relative h-4 bg-slate-700 rounded overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min(savingsPercentage, 100)}%` }}
                    />
                  </div>
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
