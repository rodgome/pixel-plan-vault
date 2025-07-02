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
const MoneyPlanCard = ({
  title,
  amount,
  icon,
  color,
  bgColor,
  additionalSections,
  wantsData
}: MoneyPlanCardProps) => {
  return <Card className={`${bgColor} border-slate-700 backdrop-blur-sm`}>
      
    </Card>;
};
export default MoneyPlanCard;