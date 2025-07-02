
import React from 'react';
import { DebtItem } from '@/types/debt';
import { DebtWithStrategy } from '@/utils/debtStrategies';
import DebtItemContainer from './DebtItemContainer';

interface DebtItemCardProps {
  debt: DebtItem | DebtWithStrategy;
  index: number;
  onEdit?: (debt: DebtItem, index: number) => void;
  onUpdate?: (index: number, updatedDebt: DebtItem) => void;
  onDelete?: () => void;
  onBudgetUpdate?: (newBudgetAmount: number) => void;
  onSpentUpdate?: (newSpentAmount: number) => void;
  showStrategy?: boolean;
  debtBudget?: number;
}

const DebtItemCard = React.memo(({ 
  debt, 
  index, 
  onEdit, 
  onUpdate, 
  onDelete, 
  onBudgetUpdate,
  onSpentUpdate,
  showStrategy = false,
  debtBudget = 0
}: DebtItemCardProps) => {
  return (
    <DebtItemContainer
      debt={debt}
      index={index}
      onEdit={onEdit}
      onUpdate={onUpdate}
      onDelete={onDelete}
      onBudgetUpdate={onBudgetUpdate}
      onSpentUpdate={onSpentUpdate}
      showStrategy={showStrategy}
      debtBudget={debtBudget}
    />
  );
}, (prevProps, nextProps) => {
  // Custom comparison function to prevent unnecessary re-renders
  return (
    prevProps.debt === nextProps.debt &&
    prevProps.index === nextProps.index &&
    prevProps.showStrategy === nextProps.showStrategy &&
    prevProps.debtBudget === nextProps.debtBudget &&
    prevProps.onUpdate === nextProps.onUpdate &&
    prevProps.onDelete === nextProps.onDelete &&
    prevProps.onBudgetUpdate === nextProps.onBudgetUpdate &&
    prevProps.onSpentUpdate === nextProps.onSpentUpdate
  );
});

DebtItemCard.displayName = 'DebtItemCard';

export default DebtItemCard;
