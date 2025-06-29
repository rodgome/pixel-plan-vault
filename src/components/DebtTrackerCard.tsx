
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DebtItem } from '@/types/debt';
import { DebtStrategy } from '@/utils/debtStrategies';
import DebtBreakdown from './DebtBreakdown';

interface DebtTrackerCardProps {
  debts: DebtItem[];
  debtBudget?: number;
  debtSpent?: number;
  strategy?: DebtStrategy;
  onStrategyChange?: (strategy: DebtStrategy) => void;
}

const DebtTrackerCard = ({ 
  debts, 
  debtBudget = 0, 
  debtSpent = 0,
  strategy = 'snowball',
  onStrategyChange 
}: DebtTrackerCardProps) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">💳</span>
            <h2 className="text-base font-bold text-amber-400">DEBT TRACKER</h2>
          </div>
          {onStrategyChange && (
            <Select value={strategy} onValueChange={onStrategyChange}>
              <SelectTrigger className="w-32 h-8 bg-slate-700 border-slate-600 text-slate-200 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="snowball" className="text-slate-200 hover:bg-slate-600">Snowball</SelectItem>
                <SelectItem value="avalanche" className="text-slate-200 hover:bg-slate-600">Avalanche</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        <DebtBreakdown 
          debts={debts} 
          debtBudget={debtBudget}
          debtSpent={debtSpent}
          strategy={strategy}
        />
      </div>
    </Card>
  );
};

export default DebtTrackerCard;
