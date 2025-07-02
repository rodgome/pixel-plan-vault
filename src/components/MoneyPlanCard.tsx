
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
}

const MoneyPlanCard = ({
  title,
  amount,
  icon,
  color,
  bgColor,
  additionalSections
}: MoneyPlanCardProps) => {
  return (
    <Card className={`${bgColor} border-slate-700 backdrop-blur-sm hover:bg-opacity-80 transition-all duration-200 hover:scale-105`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl">{icon}</span>
          <h3 className={`text-lg font-bold ${color}`}>{title}</h3>
        </div>
        <div className={`text-2xl font-bold ${color} mb-3`}>
          ${amount.toLocaleString()}
        </div>
        
        {additionalSections && additionalSections.length > 0 && (
          <div className="space-y-2 border-t border-slate-600 pt-3">
            {additionalSections.map((section, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">{section.label}</span>
                <span className={`text-sm font-bold ${section.color}`}>
                  ${section.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default MoneyPlanCard;
