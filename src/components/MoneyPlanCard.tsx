import { Card } from '@/components/ui/card';
interface MoneyPlanCardProps {
  title: string;
  amount: number;
  icon: string;
  color: string;
  bgColor: string;
}
const MoneyPlanCard = ({
  title,
  amount,
  icon,
  color,
  bgColor
}: MoneyPlanCardProps) => {
  return <Card className={`${bgColor} border-slate-700 backdrop-blur-sm hover:bg-opacity-80 transition-all duration-200 hover:scale-105`}>
      
    </Card>;
};
export default MoneyPlanCard;