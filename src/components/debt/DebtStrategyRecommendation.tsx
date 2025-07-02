
import { useState } from 'react';
import { Lightbulb, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DebtItem } from '@/types/debt';
import { DebtWithStrategy } from '@/utils/debtStrategies';

interface DebtStrategyRecommendationProps {
  debt: DebtItem | DebtWithStrategy;
  showStrategy: boolean;
}

/**
 * Component for displaying debt strategy recommendations
 * @param props - The component props
 * @returns DebtStrategyRecommendation component
 */
const DebtStrategyRecommendation = ({ debt, showStrategy }: DebtStrategyRecommendationProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const isStrategicDebt = 'recommendedPayment' in debt;

  if (!showStrategy || !isStrategicDebt) {
    return null;
  }

  if (isMinimized) {
    return (
      <div className="flex justify-end mb-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMinimized(false)}
          className="h-6 w-6 p-0 text-amber-400 hover:text-amber-300 hover:bg-slate-700/50"
        >
          <Lightbulb className="w-3 h-3" />
        </Button>
      </div>
    );
  }

  const strategicDebt = debt as DebtWithStrategy;

  return (
    <div className="bg-black/30 p-3 rounded border border-slate-500 mb-3">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <div className="text-xs text-amber-400">RECOMMENDED PAYMENT</div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMinimized(true)}
          className="h-6 w-6 p-0 text-amber-400 hover:text-amber-300 hover:bg-slate-700/50"
        >
          <Minimize className="w-3 h-3" />
        </Button>
      </div>
      <div className="font-bold text-amber-400">${strategicDebt.recommendedPayment.toLocaleString()}</div>
    </div>
  );
};

export default DebtStrategyRecommendation;
