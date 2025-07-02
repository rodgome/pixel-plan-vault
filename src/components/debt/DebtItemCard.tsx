
import { DebtItem } from '@/types/debt';
import { DebtWithStrategy } from '@/utils/debtStrategies';
import { useDebtItemLogic } from './useDebtItemLogic';
import DebtItemHeader from './DebtItemHeader';
import DebtItemFields from './DebtItemFields';
import DebtStrategyRecommendation from './DebtStrategyRecommendation';
import DebtProgressBars from './DebtProgressBars';

interface DebtItemCardProps {
  debt: DebtItem | DebtWithStrategy;
  index: number;
  onEdit?: (debt: DebtItem, index: number) => void;
  onUpdate?: (index: number, updatedDebt: DebtItem) => void;
  onDelete?: () => void;
  showStrategy?: boolean;
}

const DebtItemCard = ({ debt, index, onEdit, onUpdate, onDelete, showStrategy = false }: DebtItemCardProps) => {
  const {
    editingField,
    localEditValue,
    increment,
    setEditingField,
    handleDoubleClick,
    handleLocalValueChange,
    handleFieldBlur,
    handleIncrement,
    handleDecrement,
    handleTypeChange,
    handleClickOutside
  } = useDebtItemLogic({ debt, index, onUpdate });

  const isStrategicDebt = 'recommendedPayment' in debt;
  const plannedPayment = isStrategicDebt ? debt.recommendedPayment : debt.plannedPayment;
  const totalPaid = debt.totalPaid;
  const maxPayment = Math.max(debt.minPayment, plannedPayment, totalPaid);

  return (
    <div className="bg-black/20 p-4 rounded border border-slate-600 relative" onClick={handleClickOutside}>
      <DebtItemHeader
        debt={debt}
        editingField={editingField}
        localEditValue={localEditValue}
        showStrategy={showStrategy}
        canEdit={!!onUpdate}
        onDoubleClick={handleDoubleClick}
        onLocalValueChange={handleLocalValueChange}
        onFieldBlur={handleFieldBlur}
        onTypeChange={handleTypeChange}
        onEditingFieldChange={setEditingField}
        onDelete={onDelete}
      />
      
      <DebtItemFields
        debt={debt}
        editingField={editingField}
        localEditValue={localEditValue}
        increment={increment}
        canEdit={!!onUpdate}
        onDoubleClick={handleDoubleClick}
        onLocalValueChange={handleLocalValueChange}
        onFieldBlur={handleFieldBlur}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />

      <DebtStrategyRecommendation debt={debt} showStrategy={showStrategy} />

      <DebtProgressBars
        plannedPayment={plannedPayment}
        totalPaid={totalPaid}
        minPayment={debt.minPayment}
        maxPayment={maxPayment}
        showStrategy={showStrategy}
      />
    </div>
  );
};

export default DebtItemCard;
