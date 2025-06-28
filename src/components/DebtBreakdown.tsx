
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface DebtItem {
  name: string;
  balance: number;
  minPayment: number;
  interestRate: number;
  type: 'credit_card' | 'loan' | 'mortgage' | 'other';
  plannedPayment?: number;
  totalPaid?: number;
}

interface DebtBreakdownProps {
  debts: DebtItem[];
}

const DebtBreakdown = ({ debts }: DebtBreakdownProps) => {
  const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const totalMinPayments = debts.reduce((sum, debt) => sum + debt.minPayment, 0);

  const getDebtIcon = (type: string) => {
    switch (type) {
      case 'credit_card': return '💳';
      case 'loan': return '🏦';
      case 'mortgage': return '🏠';
      default: return '💸';
    }
  };

  const getDebtColor = (interestRate: number) => {
    if (interestRate > 20) return 'text-red-400';
    if (interestRate > 10) return 'text-orange-400';
    return 'text-yellow-400';
  };

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-black/30 p-3 rounded border border-slate-600">
          <div className="text-xs text-slate-400 mb-1">TOTAL DEBT</div>
          <div className="text-lg font-bold text-red-400">${totalDebt.toLocaleString()}</div>
        </div>
        <div className="bg-black/30 p-3 rounded border border-slate-600">
          <div className="text-xs text-slate-400 mb-1">MIN PAYMENTS</div>
          <div className="text-lg font-bold text-orange-400">${totalMinPayments.toLocaleString()}</div>
        </div>
      </div>

      {/* Debt Items */}
      <div className="space-y-3">
        {debts.map((debt, index) => {
          const plannedPayment = debt.plannedPayment || debt.minPayment;
          const totalPaid = debt.totalPaid || 0;
          const maxPayment = Math.max(debt.minPayment, plannedPayment, totalPaid);
          
          return (
            <div key={index} className="bg-black/20 p-4 rounded border border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getDebtIcon(debt.type)}</span>
                  <span className="font-bold text-slate-200">{debt.name}</span>
                </div>
                <div className={`text-sm font-bold ${getDebtColor(debt.interestRate)}`}>
                  {debt.interestRate}% APR
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <div className="text-xs text-slate-400">BALANCE</div>
                  <div className="font-bold text-red-400">${debt.balance.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">MIN PAYMENT</div>
                  <div className="font-bold text-orange-400">${debt.minPayment.toLocaleString()}</div>
                </div>
              </div>

              {/* Payment Progress Bar */}
              <div className="space-y-2">
                <div className="text-xs text-slate-400 mb-1">PAYMENT PROGRESS</div>
                <div className="relative">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-orange-400">Min: ${debt.minPayment}</span>
                    <span className="text-blue-400">Planned: ${plannedPayment}</span>
                    <span className="text-green-400">Paid: ${totalPaid}</span>
                  </div>
                  
                  <div className="relative h-4 bg-slate-700 rounded overflow-hidden">
                    {/* Min Payment Bar */}
                    <div 
                      className="absolute top-0 left-0 h-full bg-orange-500/60"
                      style={{ width: `${(debt.minPayment / maxPayment) * 100}%` }}
                    />
                    {/* Planned Payment Bar */}
                    <div 
                      className="absolute top-0 left-0 h-full bg-blue-500/60"
                      style={{ width: `${(plannedPayment / maxPayment) * 100}%` }}
                    />
                    {/* Total Paid Bar */}
                    <div 
                      className="absolute top-0 left-0 h-full bg-green-500"
                      style={{ width: `${(totalPaid / maxPayment) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DebtBreakdown;
