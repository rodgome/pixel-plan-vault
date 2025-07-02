
import { BaseData } from '@/types/dashboard';
import { Simulation, SimulationChange } from '@/types/simulation';
import { Category } from '@/types/categories';

interface SimulationResultsProps {
  baseData: BaseData;
  simulation: Simulation;
}

const SimulationResults = ({ baseData, simulation }: SimulationResultsProps) => {
  // Calculate the modified budget based on changes
  const calculateModifiedData = () => {
    const modifiedCategories = baseData.categories.map((cat: Category) => {
      const categoryChanges = (simulation.changes || []).filter((change: SimulationChange) => change.category === cat.name);
      let newAmount = cat.amount;

      categoryChanges.forEach((change: SimulationChange) => {
        if (change.type === 'increase') {
          newAmount += change.change;
        } else {
          newAmount -= change.change;
        }
      });
      
      return { ...cat, amount: Math.max(0, newAmount) };
    });

    const originalTotal = baseData.categories.reduce((sum: number, cat: Category) => sum + cat.amount, 0);
    const newTotal = modifiedCategories.reduce((sum: number, cat: Category) => sum + cat.amount, 0);
    const savings = originalTotal - newTotal;
    const newRemaining = baseData.income - newTotal;

    return {
      categories: modifiedCategories,
      totalSpent: newTotal,
      monthlySavings: savings,
      remaining: newRemaining
    };
  };

  const modifiedData = calculateModifiedData();
  const originalTotal = baseData.categories.reduce((sum: number, cat: Category) => sum + cat.amount, 0);
  const originalRemaining = baseData.income - originalTotal;

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-black/30 p-3 rounded border border-slate-600">
          <div className="text-xs text-slate-400 mb-1">TOTAL SPENDING</div>
          <div className="text-lg font-bold text-red-400">${modifiedData.totalSpent.toLocaleString()}</div>
          <div className={`text-xs ${modifiedData.monthlySavings >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {modifiedData.monthlySavings >= 0 ? '↓' : '↑'} ${Math.abs(modifiedData.monthlySavings)}
          </div>
        </div>
        
        <div className="bg-black/30 p-3 rounded border border-slate-600">
          <div className="text-xs text-slate-400 mb-1">REMAINING</div>
          <div className={`text-lg font-bold ${modifiedData.remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            ${modifiedData.remaining.toLocaleString()}
          </div>
          <div className={`text-xs ${modifiedData.remaining >= originalRemaining ? 'text-green-400' : 'text-red-400'}`}>
            {modifiedData.remaining >= originalRemaining ? '↑' : '↓'} ${Math.abs(modifiedData.remaining - originalRemaining)}
          </div>
        </div>
      </div>

      {/* Category Comparison */}
      <div className="bg-black/30 p-4 rounded border border-slate-600">
        <h3 className="text-sm font-bold text-amber-400 mb-3">CATEGORY CHANGES</h3>
        <div className="space-y-2">
          {modifiedData.categories.map((cat: Category, index: number) => {
            const originalCat = baseData.categories[index];
            const hasChanged = cat.amount !== originalCat.amount;
            const change = cat.amount - originalCat.amount;
            
            if (!hasChanged) return null;
            
            return (
              <div key={cat.name} className="flex items-center justify-between bg-slate-700/30 p-2 rounded">
                <div className="text-xs font-bold text-slate-300">{cat.name}</div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-300">
                    ${originalCat.amount} → ${cat.amount}
                  </div>
                  <div className={`text-xs ${change < 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {change < 0 ? '↓' : '↑'} ${Math.abs(change)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Impact Summary */}
      <div className="bg-black/30 p-4 rounded border border-slate-600">
        <h3 className="text-sm font-bold text-green-400 mb-3">IMPACT SUMMARY</h3>
        <div className="space-y-2 text-sm">
          {modifiedData.monthlySavings > 0 && (
            <div className="text-green-400">
              ✓ Save ${modifiedData.monthlySavings}/month
            </div>
          )}
          {modifiedData.monthlySavings < 0 && (
            <div className="text-red-400">
              ⚠ Spend ${Math.abs(modifiedData.monthlySavings)} more/month
            </div>
          )}
          <div className="text-slate-400">
            Annual impact: {modifiedData.monthlySavings >= 0 ? '+' : ''}${(modifiedData.monthlySavings * 12).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationResults;
