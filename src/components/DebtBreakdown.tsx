
import { useState } from 'react';
import { DebtItem } from '@/types/debt';
import DebtSummaryCards from './debt/DebtSummaryCards';
import MonthlyDebtProgress from './debt/MonthlyDebtProgress';
import DebtItemCard from './debt/DebtItemCard';
import EditDebtForm from './EditDebtForm';

interface DebtBreakdownProps {
  debts: DebtItem[];
  onUpdateDebt?: (index: number, updatedDebt: DebtItem) => void;
}

const DebtBreakdown = ({ debts, onUpdateDebt }: DebtBreakdownProps) => {
  const [editingDebt, setEditingDebt] = useState<{ debt: DebtItem; index: number } | null>(null);

  const handleEditDebt = (debt: DebtItem, index: number) => {
    setEditingDebt({ debt, index });
  };

  const handleSaveDebt = (updatedDebt: DebtItem) => {
    if (editingDebt && onUpdateDebt) {
      onUpdateDebt(editingDebt.index, updatedDebt);
    }
    setEditingDebt(null);
  };

  return (
    <div className="space-y-4">
      {/* Summary */}
      <DebtSummaryCards debts={debts} />

      {/* Monthly Debt Payment Progress - Against Budget */}
      <MonthlyDebtProgress debts={debts} />

      {/* Debt Items */}
      <div className="space-y-3">
        {debts.map((debt, index) => (
          <DebtItemCard
            key={index}
            debt={debt}
            index={index}
            onEdit={onUpdateDebt ? handleEditDebt : undefined}
          />
        ))}
      </div>

      {/* Edit Debt Dialog */}
      {editingDebt && (
        <EditDebtForm
          debt={editingDebt.debt}
          isOpen={!!editingDebt}
          onClose={() => setEditingDebt(null)}
          onSave={handleSaveDebt}
        />
      )}
    </div>
  );
};

export default DebtBreakdown;
