
import { Card } from '@/components/ui/card';

interface MoneyPlanCardProps {
  title: string;
  amount: number;
  icon: string;
  color: string;
  bgColor: string;
  type?: 'cashflow' | 'balance';
}

const MoneyPlanCard = ({ title, amount, icon, color, bgColor, type = 'cashflow' }: MoneyPlanCardProps) => {
  return (
    <Card className={`${bgColor} border-slate-700 backdrop-blur-sm hover:bg-opacity-80 transition-all duration-200 hover:scale-105`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl">{icon}</span>
          <div className="text-xs text-slate-400 font-bold">{title}</div>
        </div>
        <div className={`text-2xl font-bold ${color}`}>
          ${amount.toLocaleString()}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {type === 'cashflow' ? 'CASH FLOW' : 'BALANCE SHEET'}
          </div>
          <div className="h-1 flex-1 ml-2 bg-slate-700 rounded overflow-hidden">
            <div 
              className={`h-full ${color.replace('text-', 'bg-')} animate-pulse`}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MoneyPlanCard;
