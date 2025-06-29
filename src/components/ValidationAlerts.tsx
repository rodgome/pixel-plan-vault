
import { Card } from '@/components/ui/card';

interface ValidationAlertsProps {
  isDebtPaymentConsistent: boolean;
  isBudgetBalanced: boolean;
  debtBudget: number;
  totalMinPayments: number;
  totalBudget: number;
  income: number;
}

const ValidationAlerts = ({ 
  isDebtPaymentConsistent, 
  isBudgetBalanced, 
  debtBudget, 
  totalMinPayments, 
  totalBudget, 
  income 
}: ValidationAlertsProps) => {
  if (isDebtPaymentConsistent && isBudgetBalanced) {
    return null;
  }

  return (
    <Card className="bg-red-900/20 border-red-700 backdrop-blur-sm">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">⚠️</span>
          <h2 className="text-base font-bold text-red-400">VALIDATION ALERTS</h2>
        </div>
        <div className="space-y-1 text-sm">
          {!isDebtPaymentConsistent && (
            <div className="text-red-300">
              • Debt budget (${debtBudget}) doesn't cover minimum payments (${totalMinPayments})
            </div>
          )}
          {!isBudgetBalanced && (
            <div className="text-red-300">
              • Total budget (${totalBudget}) exceeds income (${income})
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ValidationAlerts;
