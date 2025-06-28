
import { Card } from '@/components/ui/card';
import GoalsBreakdown from './GoalsBreakdown';

interface GoalItem {
  name: string;
  target: number;
  current: number;
  monthlyContribution: number;
  plannedContribution?: number;
  type: 'emergency_fund' | 'retirement' | 'investment' | 'vacation' | 'other';
  deadline?: string;
}

interface GoalsTrackerCardProps {
  goals: GoalItem[];
}

const GoalsTrackerCard = ({ goals }: GoalsTrackerCardProps) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🎯</span>
          <h2 className="text-base font-bold text-amber-400">GOALS TRACKER</h2>
        </div>
        <GoalsBreakdown goals={goals} />
      </div>
    </Card>
  );
};

export default GoalsTrackerCard;
