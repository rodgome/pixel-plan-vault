
interface GoalItem {
  name: string;
  target: number;
  current: number;
  monthlyContribution: number;
  plannedContribution?: number;
  type: 'emergency_fund' | 'retirement' | 'investment' | 'vacation' | 'other';
  deadline?: string;
}

interface GoalSummaryCardsProps {
  goals: GoalItem[];
}

const GoalSummaryCards = ({ goals }: GoalSummaryCardsProps) => {
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const totalCurrent = goals.reduce((sum, goal) => sum + goal.current, 0);
  const totalMonthlyContributions = goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-black/30 p-3 rounded border border-slate-600">
        <div className="text-xs text-slate-400 mb-1">TOTAL TARGET</div>
        <div className="text-lg font-bold text-blue-400">${totalTarget.toLocaleString()}</div>
      </div>
      <div className="bg-black/30 p-3 rounded border border-slate-600">
        <div className="text-xs text-slate-400 mb-1">CURRENT TOTAL</div>
        <div className="text-lg font-bold text-green-400">${totalCurrent.toLocaleString()}</div>
      </div>
      <div className="bg-black/30 p-3 rounded border border-slate-600">
        <div className="text-xs text-slate-400 mb-1">MONTHLY TOTAL</div>
        <div className="text-lg font-bold text-orange-400">${totalMonthlyContributions.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default GoalSummaryCards;
