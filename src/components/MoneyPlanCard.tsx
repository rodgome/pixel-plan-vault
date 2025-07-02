
import React, { useMemo } from 'react';
import { Card } from '@/components/ui/card';

interface MoneyPlanCardProps {
  title: string;
  amount: number;
  icon: string;
  color: string;
  bgColor: string;
  additionalSections?: Array<{
    label: string;
    value: number;
    color: string;
  }>;
  wantsData?: {
    incomeMinusBudget: number;
    spentSoFar: number;
  };
}

const MoneyPlanCard = React.memo(({
  title,
  amount,
  icon,
  color,
  bgColor,
  additionalSections,
  wantsData
}: MoneyPlanCardProps) => {
  const memoizedAdditionalSections = useMemo(() => additionalSections, [additionalSections]);
  const memoizedWantsData = useMemo(() => wantsData, [wantsData]);

  return (
    <Card className={`${bgColor} border-slate-700 backdrop-blur-sm`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{icon}</span>
            <div>
              <h3 className="text-sm font-bold text-slate-300">{title}</h3>
              <div className={`text-2xl font-bold ${color}`}>
                ${amount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {memoizedAdditionalSections && memoizedAdditionalSections.length > 0 && (
          <div className="space-y-2">
            {memoizedAdditionalSections.map((section, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-xs text-slate-400">{section.label}</span>
                <span className={`text-sm font-semibold ${section.color}`}>
                  ${section.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}

        {memoizedWantsData && (
          <div className="mt-4 pt-4 border-t border-slate-600">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Available to Spend</span>
                <span className="text-sm font-semibold text-green-400">
                  ${memoizedWantsData.incomeMinusBudget.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Spent So Far</span>
                <span className="text-sm font-semibold text-blue-400">
                  ${memoizedWantsData.spentSoFar.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.title === nextProps.title &&
    prevProps.amount === nextProps.amount &&
    prevProps.icon === nextProps.icon &&
    prevProps.color === nextProps.color &&
    prevProps.bgColor === nextProps.bgColor &&
    JSON.stringify(prevProps.additionalSections) === JSON.stringify(nextProps.additionalSections) &&
    JSON.stringify(prevProps.wantsData) === JSON.stringify(nextProps.wantsData)
  );
});

MoneyPlanCard.displayName = 'MoneyPlanCard';

export default MoneyPlanCard;
