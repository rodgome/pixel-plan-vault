
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
  return (
    <Card className={`${bgColor} border-slate-700 backdrop-blur-sm`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <h3 className="text-sm font-bold text-amber-400">{title}</h3>
          </div>
        </div>
        <div className={`text-2xl font-bold ${color} font-mono`}>
          ${amount.toLocaleString()}
        </div>
        
        {additionalSections && additionalSections.length > 0 && (
          <div className="mt-3 space-y-1">
            {additionalSections.map((section, index) => (
              <div key={index} className="flex justify-between text-xs">
                <span className="text-slate-400">{section.label}</span>
                <span className={section.color}>
                  ${section.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
        
        {wantsData && (
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Available</span>
              <span className="text-green-400">
                ${wantsData.incomeMinusBudget.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Spent</span>
              <span className="text-red-400">
                ${wantsData.spentSoFar.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MoneyPlanCard;
