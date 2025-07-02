import React from 'react';
import { FixedSizeList as List } from 'react-window';
import GoalItemCard from './GoalItemCard';

interface GoalItem {
  name: string;
  target: number;
  current: number;
  monthlyContribution: number;
  plannedContribution?: number;
  type: 'emergency_fund' | 'retirement' | 'investment' | 'vacation' | 'other';
  deadline?: string;
}

interface VirtualizedGoalsListProps {
  goals: GoalItem[];
  onUpdate?: (index: number, updatedGoal: GoalItem) => void;
  onDelete?: (index: number) => void;
  height?: number;
  itemHeight?: number;
  hideCurrentEdit?: boolean;
}

interface GoalItemProps {
  index: number;
  style: React.CSSProperties;
  data: {
    goals: GoalItem[];
    onUpdate?: (index: number, updatedGoal: GoalItem) => void;
    onDelete?: (index: number) => void;
  };
}

const GoalItemRenderer = React.memo(({ index, style, data }: GoalItemProps) => {
  const { goals, onUpdate, onDelete } = data;
  const goal = goals[index];

  const handleDelete = () => {
    if (onDelete) {
      onDelete(index);
    }
  };

  return (
    <div style={style}>
      <div className="pb-3">
        <GoalItemCard
          key={`${goal.name}-${goal.target}-${goal.current}-${index}`}
          goal={goal}
          index={index}
          onUpdate={onUpdate}
          onDelete={onDelete ? handleDelete : undefined}
        />
      </div>
    </div>
  );
});

GoalItemRenderer.displayName = 'GoalItemRenderer';

const VirtualizedGoalsList = React.memo(({
  goals,
  onUpdate,
  onDelete,
  height = 400,
  itemHeight = 160,
  hideCurrentEdit = false
}: VirtualizedGoalsListProps) => {
  // Don't use virtualization for small lists
  if (goals.length <= 5) {
    return (
      <div className="space-y-3">
        {goals.map((goal, index) => (
          <GoalItemCard
            key={`${goal.name}-${goal.target}-${goal.current}-${index}`}
            goal={goal}
            index={index}
            onUpdate={onUpdate}
            onDelete={onDelete ? () => onDelete(index) : undefined}
          />
        ))}
      </div>
    );
  }

  const listData = {
    goals,
    onUpdate,
    onDelete
  };

  return (
    <List
      height={Math.min(height, goals.length * itemHeight)}
      width="100%"
      itemCount={goals.length}
      itemSize={itemHeight}
      itemData={listData}
      className="scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800"
    >
      {GoalItemRenderer}
    </List>
  );
});

VirtualizedGoalsList.displayName = 'VirtualizedGoalsList';

export default VirtualizedGoalsList;
