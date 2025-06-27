
import { Card } from '@/components/ui/card';

interface BudgetOverviewProps {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
}

const BudgetOverview = ({ totalBudget, totalSpent, remaining }: BudgetOverviewProps) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">💼</span>
          <h2 className="text-lg font-bold text-amber-400">MONTHLY OVERVIEW</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-black/30 p-4 rounded border border-slate-600">
            <div className="text-xs text-slate-400 mb-1">TOTAL BUDGET</div>
            <div className="text-xl font-bold text-blue-400">${totalBudget.toLocaleString()}</div>
          </div>
          <div className="bg-black/30 p-4 rounded border border-slate-600">
            <div className="text-xs text-slate-400 mb-1">TOTAL SPENT</div>
            <div className="text-xl font-bold text-red-400">${totalSpent.toLocaleString()}</div>
          </div>
          <div className="bg-black/30 p-4 rounded border border-slate-600">
            <div className="text-xs text-slate-400 mb-1">REMAINING</div>
            <div className={`text-xl font-bold ${remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${remaining.toLocaleString()}
            </div>
          </div>
          <div className="bg-black/30 p-4 rounded border border-slate-600">
            <div className="text-xs text-slate-400 mb-1">BUDGET USAGE</div>
            <div className={`text-xl font-bold ${(totalSpent/totalBudget)*100 <= 100 ? 'text-green-400' : 'text-red-400'}`}>
              {((totalSpent/totalBudget)*100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BudgetOverview;
