
import { Progress } from '@/components/ui/progress';

interface GoalProgressBarsProps {
  goal: {
    name: string;
    target: number;
    current: number;
    monthlyContribution: number;
    plannedContribution?: number;
    deadline?: string;
  };
}

const GoalProgressBars = ({ goal }: GoalProgressBarsProps) => {
  const percentage = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
  const plannedContribution = goal.plannedContribution || goal.monthlyContribution;
  const monthlyProgress = plannedContribution > 0 ? 
    Math.min((goal.monthlyContribution / plannedContribution) * 100, 100) : 0;

  return (
    <>
      {/* Monthly Contribution Progress */}
      <div className="space-y-2 mb-3">
        <div className="text-xs text-slate-400">THIS MONTH'S CONTRIBUTION PROGRESS</div>
        <Progress 
          value={monthlyProgress} 
          className="h-2 bg-slate-700 [&>div]:bg-orange-500" 
        />
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Contributed: ${goal.monthlyContribution.toLocaleString()}</span>
          <span className="text-purple-400">Target: ${plannedContribution.toLocaleString()}</span>
        </div>
      </div>

      {/* Goal Progress Bar */}
      <div className="space-y-2">
        <div className="text-xs text-slate-400 mb-1">GOAL PROGRESS</div>
        <div className="relative">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-green-400">Current: ${goal.current.toLocaleString()}</span>
            <span className="text-blue-400">Target: ${goal.target.toLocaleString()}</span>
            {goal.deadline && <span className="text-purple-400">Due: {goal.deadline}</span>}
          </div>
          
          <div className="relative h-4 bg-slate-700 rounded overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-600 to-green-400"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalProgressBars;
