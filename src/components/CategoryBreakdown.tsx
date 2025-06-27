
interface Category {
  name: string;
  amount: number;
  budget: number;
  color: string;
}

interface CategoryBreakdownProps {
  categories: Category[];
}

const CategoryBreakdown = ({ categories }: CategoryBreakdownProps) => {
  return (
    <div className="space-y-3">
      {categories.map((category, index) => {
        const percentage = (category.amount / category.budget) * 100;
        const isOverBudget = percentage > 100;
        
        return (
          <div key={index} className="group hover:bg-slate-700/30 p-3 rounded transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 ${category.color} rounded`} />
                <span className="text-sm font-bold text-slate-300">{category.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-amber-400">
                  ${category.amount} / ${category.budget}
                </div>
                <div className={`text-xs ${isOverBudget ? 'text-red-400' : 'text-green-400'}`}>
                  {isOverBudget ? 'OVER BUDGET' : 'ON TRACK'}
                </div>
              </div>
            </div>
            <div className="bg-slate-700 h-2 rounded overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  isOverBudget ? 'bg-red-500' : category.color
                }`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {percentage.toFixed(0)}% used
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryBreakdown;
