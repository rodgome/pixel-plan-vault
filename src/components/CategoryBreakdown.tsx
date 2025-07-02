
import React, { useMemo } from 'react';

interface Category {
  name: string;
  amount: number;
  budget: number;
  color: string;
}

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

interface CategoryBreakdownProps {
  categories: Category[];
  debts?: DebtItem[];
  goals?: GoalItem[];
  onDebtClick?: () => void;
  onGoalsClick?: () => void;
  onNeedsClick?: () => void;
  onWantsClick?: () => void;
}

const CategoryBreakdown = React.memo(({ 
  categories, 
  debts, 
  goals, 
  onDebtClick, 
  onGoalsClick, 
  onNeedsClick, 
  onWantsClick 
}: CategoryBreakdownProps) => {
  const getCategoryIcon = useMemo(() => (name: string) => {
    switch (name) {
      case 'NEEDS': return '🏠';
      case 'WANTS': return '🎮';
      case 'DEBT': return '💳';
      case 'GOALS': return '🎯';
      default: return '💰';
    }
  }, []);

  const getCategoryStatus = useMemo(() => (category: Category) => {
    const percentage = category.budget > 0 ? (category.amount / category.budget) * 100 : 0;
    if (percentage >= 100) return 'OVER BUDGET';
    if (percentage >= 80) return 'NEAR LIMIT';
    return 'ON TRACK';
  }, []);

  const getCategoryStatusColor = useMemo(() => (category: Category) => {
    const percentage = category.budget > 0 ? (category.amount / category.budget) * 100 : 0;
    if (percentage >= 100) return 'text-red-400';
    if (percentage >= 80) return 'text-orange-400';
    return 'text-green-400';
  }, []);

  const isClickable = useMemo(() => (categoryName: string) => {
    return (categoryName === 'DEBT' && onDebtClick) || 
           (categoryName === 'GOALS' && onGoalsClick) ||
           (categoryName === 'NEEDS' && onNeedsClick) ||
           (categoryName === 'WANTS' && onWantsClick);
  }, [onDebtClick, onGoalsClick, onNeedsClick, onWantsClick]);

  const handleCategoryClick = useMemo(() => (categoryName: string) => {
    if (categoryName === 'DEBT' && onDebtClick) {
      onDebtClick();
    } else if (categoryName === 'GOALS' && onGoalsClick) {
      onGoalsClick();
    } else if (categoryName === 'NEEDS' && onNeedsClick) {
      onNeedsClick();
    } else if (categoryName === 'WANTS' && onWantsClick) {
      onWantsClick();
    }
  }, [onDebtClick, onGoalsClick, onNeedsClick, onWantsClick]);

  const categoriesWithMetrics = useMemo(() => {
    return categories.map((category) => ({
      ...category,
      percentage: category.budget > 0 ? (category.amount / category.budget) * 100 : 0,
      status: getCategoryStatus(category),
      statusColor: getCategoryStatusColor(category),
      clickable: isClickable(category.name),
      icon: getCategoryIcon(category.name)
    }));
  }, [categories, getCategoryStatus, getCategoryStatusColor, isClickable, getCategoryIcon]);

  return (
    <div className="space-y-3">
      {categoriesWithMetrics.map((category, index) => (
        <div 
          key={index} 
          className={`group p-3 rounded transition-all duration-200 ${
            category.clickable ? 'hover:bg-slate-700/30 cursor-pointer hover:border-amber-400/30 border border-transparent' : ''
          }`}
          onClick={() => handleCategoryClick(category.name)}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">{category.icon}</span>
              <span className="text-sm font-bold text-slate-300">{category.name}</span>
              {category.clickable && (
                <span className="text-xs text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to view details →
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-amber-400">
                ${category.amount.toLocaleString()} / ${category.budget.toLocaleString()}
              </div>
              <div className={`text-xs ${category.statusColor}`}>
                {category.status}
              </div>
            </div>
          </div>
          <div className="bg-slate-700 h-2 rounded overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                category.percentage >= 100 ? 'bg-red-500' : 
                category.percentage >= 80 ? 'bg-orange-500' : 
                'bg-green-500'
              }`}
              style={{ width: `${Math.min(category.percentage, 100)}%` }}
            />
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {category.percentage.toFixed(0)}% of budget spent
          </div>
        </div>
      ))}
    </div>
  );
}, (prevProps, nextProps) => {
  // Deep comparison for categories array
  return (
    JSON.stringify(prevProps.categories) === JSON.stringify(nextProps.categories) &&
    prevProps.onDebtClick === nextProps.onDebtClick &&
    prevProps.onGoalsClick === nextProps.onGoalsClick &&
    prevProps.onNeedsClick === nextProps.onNeedsClick &&
    prevProps.onWantsClick === nextProps.onWantsClick
  );
});

CategoryBreakdown.displayName = 'CategoryBreakdown';

export default CategoryBreakdown;
