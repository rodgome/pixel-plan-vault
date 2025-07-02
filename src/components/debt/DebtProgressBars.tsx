
import { Progress } from '@/components/ui/progress';

interface DebtProgressBarsProps {
  plannedPayment: number;
  totalPaid: number;
  minPayment: number;
  maxPayment: number;
  showStrategy: boolean;
}

const DebtProgressBars = ({
  plannedPayment,
  totalPaid,
  minPayment,
  maxPayment,
  showStrategy
}: DebtProgressBarsProps) => {
  // Calculate individual monthly payment progress for this debt
  const individualMonthlyProgress = plannedPayment > 0 ? Math.min((totalPaid / plannedPayment) * 100, 100) : 0;

  return (
    <>
      {/* Individual Monthly Payment Progress */}
      <div className="space-y-2 mb-3">
        <div className="text-xs text-slate-400">THIS MONTH'S PAYMENT PROGRESS</div>
        <Progress 
          value={individualMonthlyProgress} 
          className="h-2 bg-slate-700 [&>div]:bg-blue-500" 
        />
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Paid: ${totalPaid.toLocaleString()}</span>
          <span className="text-blue-400">Target: ${plannedPayment.toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Progress Bar */}
      <div className="space-y-2">
        <div className="text-xs text-slate-400 mb-1">OVERALL PAYMENT PROGRESS</div>
        <div className="relative">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-orange-400">Min: ${minPayment}</span>
            <span className="text-blue-400">
              {showStrategy ? 'Recommended' : 'Planned'}: ${plannedPayment}
            </span>
            <span className="text-green-400">Paid: ${totalPaid}</span>
          </div>
          
          <div className="relative h-4 bg-slate-700 rounded overflow-hidden">
            {/* Min Payment Bar */}
            <div 
              className="absolute top-0 left-0 h-full bg-orange-500/60"
              style={{ width: `${(minPayment / maxPayment) * 100}%` }}
            />
            {/* Planned Payment Bar */}
            <div 
              className="absolute top-0 left-0 h-full bg-blue-500/60"
              style={{ width: `${(plannedPayment / maxPayment) * 100}%` }}
            />
            {/* Total Paid Bar */}
            <div 
              className="absolute top-0 left-0 h-full bg-green-500"
              style={{ width: `${(totalPaid / maxPayment) * 100}%` }}
            />
            
            {/* Dotted line for minimum payment */}
            <div 
              className="absolute top-0 h-full w-1 border-l-4 border-dashed border-red-500"
              style={{ left: `${(minPayment / maxPayment) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DebtProgressBars;
