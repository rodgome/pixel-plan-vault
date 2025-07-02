
import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { DebtItem } from '@/types/debt';
import { DebtWithStrategy } from '@/utils/debtStrategies';
import DebtItemCard from './DebtItemCard';

interface VirtualizedDebtListProps {
  debts: (DebtItem | DebtWithStrategy)[];
  onUpdate?: (index: number, updatedDebt: DebtItem) => void;
  onDelete?: (debt: DebtItem | DebtWithStrategy) => void;
  onBudgetUpdate?: (newBudgetAmount: number) => void;
  onSpentUpdate?: (newSpentAmount: number) => void;
  debtBudget?: number;
  showStrategy?: boolean;
  height?: number;
  itemHeight?: number;
}

interface DebtItemProps {
  index: number;
  style: React.CSSProperties;
  data: {
    debts: (DebtItem | DebtWithStrategy)[];
    onUpdate?: (index: number, updatedDebt: DebtItem) => void;
    onDelete?: (debt: DebtItem | DebtWithStrategy) => void;
    onBudgetUpdate?: (newBudgetAmount: number) => void;
    onSpentUpdate?: (newSpentAmount: number) => void;
    debtBudget?: number;
    showStrategy?: boolean;
  };
}

const DebtItemRenderer = React.memo(({ index, style, data }: DebtItemProps) => {
  const { debts, onUpdate, onDelete, onBudgetUpdate, onSpentUpdate, debtBudget, showStrategy } = data;
  const debt = debts[index];

  const handleUpdate = (_, updatedDebt: DebtItem) => {
    if (onUpdate) {
      onUpdate(index, updatedDebt);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(debt);
    }
  };

  return (
    <div style={style}>
      <div className="pb-3">
        <DebtItemCard
          key={`${debt.name}-${debt.balance}-${debt.interestRate}`}
          debt={debt}
          index={index}
          onUpdate={onUpdate ? handleUpdate : undefined}
          onDelete={onDelete ? handleDelete : undefined}
          onBudgetUpdate={onBudgetUpdate}
          onSpentUpdate={onSpentUpdate}
          debtBudget={debtBudget}
          showStrategy={showStrategy}
        />
      </div>
    </div>
  );
});

DebtItemRenderer.displayName = 'DebtItemRenderer';

const VirtualizedDebtList = React.memo(({
  debts,
  onUpdate,
  onDelete,
  onBudgetUpdate,
  onSpentUpdate,
  debtBudget = 0,
  showStrategy = false,
  height = 400,
  itemHeight = 180
}: VirtualizedDebtListProps) => {
  // Don't use virtualization for small lists
  if (debts.length <= 5) {
    return (
      <div className="space-y-3">
        {debts.map((debt, index) => (
          <DebtItemCard
            key={`${debt.name}-${debt.balance}-${debt.interestRate}`}
            debt={debt}
            index={index}
            onUpdate={onUpdate ? (_, updatedDebt) => onUpdate(index, updatedDebt) : undefined}
            onDelete={onDelete ? () => onDelete(debt) : undefined}
            onBudgetUpdate={onBudgetUpdate}
            onSpentUpdate={onSpentUpdate}
            debtBudget={debtBudget}
            showStrategy={showStrategy}
          />
        ))}
      </div>
    );
  }

  const listData = {
    debts,
    onUpdate,
    onDelete,
    onBudgetUpdate,
    onSpentUpdate,
    debtBudget,
    showStrategy
  };

  return (
    <List
      height={Math.min(height, debts.length * itemHeight)}
      width="100%"
      itemCount={debts.length}
      itemSize={itemHeight}
      itemData={listData}
      className="scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800"
    >
      {DebtItemRenderer}
    </List>
  );
});

VirtualizedDebtList.displayName = 'VirtualizedDebtList';

export default VirtualizedDebtList;
