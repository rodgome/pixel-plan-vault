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
  return <Card className={`${bgColor} border-slate-700 backdrop-blur-sm`}>
      
    </Card>;
}, (prevProps, nextProps) => {
  return prevProps.title === nextProps.title && prevProps.amount === nextProps.amount && prevProps.icon === nextProps.icon && prevProps.color === nextProps.color && prevProps.bgColor === nextProps.bgColor && JSON.stringify(prevProps.additionalSections) === JSON.stringify(nextProps.additionalSections) && JSON.stringify(prevProps.wantsData) === JSON.stringify(nextProps.wantsData);
});
MoneyPlanCard.displayName = 'MoneyPlanCard';
export default MoneyPlanCard;