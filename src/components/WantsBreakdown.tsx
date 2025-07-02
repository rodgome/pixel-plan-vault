
interface WantsBreakdownProps {
  categories: Array<{
    name: string;
    amount: number;
    budget: number;
    color: string;
  }>;
  income?: number;
}

const WantsBreakdown = ({ categories, income = 0 }: WantsBreakdownProps) => {
  const wantsCategory = categories.find(cat => cat.name === 'WANTS');
  
  if (!wantsCategory) return null;

  const percentage = wantsCategory.budget > 0 ? (wantsCategory.amount / wantsCategory.budget) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-amber-400">
          ${wantsCategory.amount.toLocaleString()} / ${wantsCategory.budget.toLocaleString()}
        </div>
        <div className="text-slate-400">
          {percentage.toFixed(1)}% of budget spent
        </div>
      </div>
      
      <div className="bg-slate-700 h-4 rounded overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${
            percentage >= 100 ? 'bg-red-500' : 
            percentage >= 80 ? 'bg-orange-500' : 
            'bg-green-500'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-300">Discretionary Spending</h3>
        <div className="text-slate-400 text-sm">
          This category includes entertainment, dining out, hobbies, subscriptions, and other non-essential purchases.
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-700/50 p-3 rounded">
            <div className="text-slate-400">Remaining Budget</div>
            <div className="text-lg font-bold text-green-400">
              ${(wantsCategory.budget - wantsCategory.amount).toLocaleString()}
            </div>
          </div>
          <div className="bg-slate-700/50 p-3 rounded">
            <div className="text-slate-400">Status</div>
            <div className={`text-lg font-bold ${
              percentage >= 100 ? 'text-red-400' : 
              percentage >= 80 ? 'text-orange-400' : 
              'text-green-400'
            }`}>
              {percentage >= 100 ? 'Over Budget' : 
               percentage >= 80 ? 'Near Limit' : 
               'On Track'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WantsBreakdown;
