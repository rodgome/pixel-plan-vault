
import { Card } from '@/components/ui/card';

interface GoalItem {
  name: string;
  target: number;
  current: number;
  monthlyContribution: number;
  plannedContribution?: number;
  type: 'emergency_fund' | 'retirement' | 'investment' | 'vacation' | 'other';
  deadline?: string;
}

interface GoalsBreakdownProps {
  goals: GoalItem[];
}

const GoalsBreakdown = ({ goals }: GoalsBreakdownProps) => {
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const totalCurrent = goals.reduce((sum, goal) => sum + goal.current, 0);
  const totalMonthlyContributions = goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0);
  const totalPlannedContributions = goals.reduce((sum, goal) => sum + (goal.plannedContribution || goal.monthlyContribution), 0);
  const maxTotalContribution = Math.max(totalMonthlyContributions, totalPlannedContributions);

  const getGoalIcon = (type: string) => {
    switch (type) {
      case 'emergency_fund': return '🛡️';
      case 'retirement': return '👴';
      case 'investment': return '📈';
      case 'vacation': return '🏖️';
      default: return '🎯';
    }
  };

  const getGoalColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 50) return 'text-blue-400';
    if (percentage >= 25) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const totalPercentage = totalTarget > 0 ? (totalCurrent / totalTarget) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-black/30 p-3 rounded border border-slate-600">
          <div className="text-xs text-slate-400 mb-1">TOTAL TARGET</div>
          <div className="text-lg font-bold text-blue-400">${totalTarget.toLocaleString()}</div>
        </div>
        <div className="bg-black/30 p-3 rounded border border-slate-600">
          <div className="text-xs text-slate-400 mb-1">CURRENT TOTAL</div>
          <div className="text-lg font-bold text-green-400">${totalCurrent.toLocaleString()}</div>
        </div>
      </div>

      {/* Total Progress Bar */}
      <div className="bg-black/30 p-4 rounded border border-slate-600">
        <div className="text-xs text-slate-400 mb-3">TOTAL SAVINGS PROGRESS</div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-orange-400">Monthly: ${totalMonthlyContributions.toLocaleString()}</span>
            <span className="text-blue-400">Planned: ${totalPlannedContributions.toLocaleString()}</span>
            <span className={getGoalColor(totalPercentage)}>{totalPercentage.toFixed(1)}% Complete</span>
          </div>
          
          <div className="relative h-6 bg-slate-700 rounded overflow-hidden">
            {/* Progress Bar */}
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-600 to-green-400"
              style={{ width: `${Math.min(totalPercentage, 100)}%` }}
            />
          </div>

          {/* Contribution Progress Bar */}
          <div className="text-xs text-slate-400 mb-1">MONTHLY CONTRIBUTION PROGRESS</div>
          <div className="relative h-4 bg-slate-700 rounded overflow-hidden">
            {/* Monthly Contribution Bar */}
            <div 
              className="absolute top-0 left-0 h-full bg-orange-500/60"
              style={{ width: `${(totalMonthlyContributions / maxTotalContribution) * 100}%` }}
            />
            {/* Planned Contribution Bar */}
            <div 
              className="absolute top-0 left-0 h-full bg-blue-500"
              style={{ width: `${(totalPlannedContributions / maxTotalContribution) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Goal Items */}
      <div className="space-y-3">
        {goals.map((goal, index) => {
          const percentage = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
          const plannedContribution = goal.plannedContribution || goal.monthlyContribution;
          const maxContribution = Math.max(goal.monthlyContribution, plannedContribution);
          
          return (
            <div key={index} className="bg-black/20 p-4 rounded border border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getGoalIcon(goal.type)}</span>
                  <span className="font-bold text-slate-200">{goal.name}</span>
                </div>
                <div className={`text-sm font-bold ${getGoalColor(percentage)}`}>
                  {percentage.toFixed(1)}%
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <div className="text-xs text-slate-400">CURRENT</div>
                  <div className="font-bold text-green-400">${goal.current.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">TARGET</div>
                  <div className="font-bold text-blue-400">${goal.target.toLocaleString()}</div>
                </div>
              </div>

              {/* Goal Progress Bar */}
              <div className="space-y-2">
                <div className="text-xs text-slate-400 mb-1">GOAL PROGRESS</div>
                <div className="relative h-4 bg-slate-700 rounded overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-1000"
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>

                {/* Monthly Contribution Progress */}
                <div className="text-xs text-slate-400 mb-1">MONTHLY CONTRIBUTION</div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-orange-400">Current: ${goal.monthlyContribution}</span>
                  <span className="text-blue-400">Planned: ${plannedContribution}</span>
                  {goal.deadline && <span className="text-purple-400">Due: {goal.deadline}</span>}
                </div>
                
                <div className="relative h-3 bg-slate-700 rounded overflow-hidden">
                  {/* Monthly Contribution Bar */}
                  <div 
                    className="absolute top-0 left-0 h-full bg-orange-500/60"
                    style={{ width: `${(goal.monthlyContribution / maxContribution) * 100}%` }}
                  />
                  {/* Planned Contribution Bar */}
                  <div 
                    className="absolute top-0 left-0 h-full bg-blue-500"
                    style={{ width: `${(plannedContribution / maxContribution) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalsBreakdown;
