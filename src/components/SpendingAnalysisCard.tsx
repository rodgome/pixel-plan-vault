
import { Card } from '@/components/ui/card';
import CategoryBreakdown from './CategoryBreakdown';

interface Category {
  name: string;
  amount: number;
  budget: number;
  color: string;
}

interface SpendingAnalysisCardProps {
  spendingCategories: Category[];
  totalMinPayments: number;
  totalPlannedPayments: number;
  totalPaid: number;
  maxTotalPayment: number;
}

const SpendingAnalysisCard = ({ 
  spendingCategories, 
  totalMinPayments, 
  totalPlannedPayments, 
  totalPaid, 
  maxTotalPayment 
}: SpendingAnalysisCardProps) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">📊</span>
          <h2 className="text-base font-bold text-amber-400">SPENDING ANALYSIS</h2>
        </div>
        <CategoryBreakdown categories={spendingCategories} />
        
        {/* Debt Payment Progress */}
        <div className="mt-4 pt-4 border-t border-slate-600">
          <div className="bg-black/30 p-4 rounded border border-slate-600">
            <div className="text-xs text-slate-400 mb-2">DEBT PAYMENTS</div>

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
                  className="absolute top-0 h-full w-px border-l-2 border-dashed border-orange-300"
                  style={{ left: `${(totalMinPayments / maxTotalPayment) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SpendingAnalysisCard;
