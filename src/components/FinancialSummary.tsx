
import { Card } from '@/components/ui/card';

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

interface FinancialSummaryProps {
  debts: DebtItem[];
  goals: GoalItem[];
  income: number;
  totalSpent: number;
  remaining: number;
}

const FinancialSummary = ({ debts, goals, income, totalSpent, remaining }: FinancialSummaryProps) => {
  const totalDebtBalance = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinPayments = debts.reduce((sum, debt) => sum + debt.minPayment, 0);
  const totalPlannedPayments = debts.reduce((sum, debt) => sum + (debt.plannedPayment || debt.minPayment), 0);
  
  const totalGoalsTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const totalGoalsCurrent = goals.reduce((sum, goal) => sum + goal.current, 0);

  return (
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
                <span className="text-green-400">${income.toLocaleString()}</span>
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
  );
};

export default FinancialSummary;
