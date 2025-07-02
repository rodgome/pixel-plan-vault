import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { GoalItem } from '@/types/goals';
import GoalSummaryCards from './goals/GoalSummaryCards';
import GoalAllocationCard from './goals/GoalAllocationCard';
import VirtualizedGoalsList from './goals/VirtualizedGoalsList';

interface GoalsBreakdownProps {
  goals: GoalItem[];
  onUpdateGoal?: (index: number, updatedGoal: GoalItem) => void;
  onDeleteGoal?: (index: number) => void;
  onAddGoal?: (newGoal: GoalItem) => void;
  goalsSpent?: number;
}

const GoalsBreakdown = ({ 
  goals, 
  onUpdateGoal,
  onDeleteGoal,
  onAddGoal,
  goalsSpent = 0
}: GoalsBreakdownProps) => {

  const handleAddGoal = () => {
    if (onAddGoal) {
      const newGoal: GoalItem = {
        name: 'New Goal',
        target: 1000,
        current: 0,
        monthlyContribution: 100,
        plannedContribution: 100,
        type: 'other'
      };
      onAddGoal(newGoal);
    }
  };

  const handleDeleteGoal = (index: number) => {
    if (onDeleteGoal) {
      onDeleteGoal(index);
    }
  };

  const handleUpdateGoal = (index: number, updatedGoal: GoalItem) => {
    if (onUpdateGoal) {
      onUpdateGoal(index, updatedGoal);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-amber-400">GOALS BREAKDOWN</h3>
        {onAddGoal && (
          <Button
            onClick={handleAddGoal}
            variant="ghost"
            size="sm"
            className="text-green-400 hover:text-green-300 hover:bg-slate-700/50 h-8 px-3"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Goal
          </Button>
        )}
      </div>

      {/* Summary */}
      <GoalSummaryCards goals={goals} />

      {/* NEW: Goal Allocation Card */}
      {onUpdateGoal && (
        <GoalAllocationCard
          goals={goals}
          totalPaidAmount={goalsSpent}
          onUpdateGoal={onUpdateGoal}
        />
      )}

      {/* Virtualized Goal Items - Remove individual editing capabilities for current amount */}
      <VirtualizedGoalsList
        goals={goals}
        onUpdate={onUpdateGoal ? handleUpdateGoal : undefined}
        onDelete={onDeleteGoal ? handleDeleteGoal : undefined}
        height={600}
        itemHeight={160}
        hideCurrentEdit={true}
      />
    </div>
  );
};

export default GoalsBreakdown;
