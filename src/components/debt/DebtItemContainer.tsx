
import React, { useState } from 'react';
import { DebtItem } from '@/types/debt';
import { DebtWithStrategy } from '@/utils/debtStrategies';
import { useDebtItemLogic } from './useDebtItemLogic';
import DebtItemHeader from './DebtItemHeader';
import DebtItemFields from './DebtItemFields';
import DebtStrategyRecommendation from './DebtStrategyRecommendation';
import DebtProgressBars from './DebtProgressBars';
import BudgetChangeDialog from './BudgetChangeDialog';

interface DebtItemContainerProps {
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

const DebtItemContainer = ({ 
  debt, 
  index, 
  onEdit, 
  onUpdate, 
  onDelete, 
  onBudgetUpdate,
  onSpentUpdate,
  showStrategy = false,
  debtBudget = 0
}: DebtItemContainerProps) => {
  const [showBudgetDialog, setShowBudgetDialog] = useState(false);
  const [pendingPaymentChange, setPendingPaymentChange] = useState<number | null>(null);
  const [originalDebt, setOriginalDebt] = useState<DebtItem | null>(null);

  const {
    editingField,
    localEditValue,
    increment,
    setEditingField,
    handleDoubleClick,
    handleLocalValueChange,
    handleFieldBlur: originalHandleFieldBlur,
    handleIncrement,
    handleDecrement,
    handleTypeChange,
    handleClickOutside
  } = useDebtItemLogic({ debt, index, onUpdate });

  const isStrategicDebt = 'recommendedPayment' in debt;
  const plannedPayment = isStrategicDebt ? debt.recommendedPayment : debt.plannedPayment;
  const totalPaid = debt.totalPaid;
  const maxPayment = Math.max(debt.minPayment, plannedPayment, totalPaid);

  const handleFieldBlur = (fieldName: string) => {
    // Block editing of totalPaid - it should only be changed through allocation
    if (fieldName === 'totalPaid') {
      setEditingField(null);
      return;
    }

    if (fieldName === 'plannedPayment' && onUpdate && onBudgetUpdate) {
      const newPaymentValue = parseFloat(localEditValue);
      if (!isNaN(newPaymentValue) && newPaymentValue >= 0) {
        // Check if the new payment differs significantly from the recommended payment
        const currentRecommended = isStrategicDebt ? debt.recommendedPayment : debt.plannedPayment;
        if (Math.abs(newPaymentValue - currentRecommended) > 10) { // Allow $10 tolerance
          setPendingPaymentChange(newPaymentValue);
          setOriginalDebt({ ...debt } as DebtItem);
          setShowBudgetDialog(true);
          return; // Don't proceed with the update yet
        }
      }
    }
    
    // For all other fields or if no significant change, proceed normally
    originalHandleFieldBlur(fieldName);
  };

  // Fix the function signature to match the expected type
  const handleDoubleClickWrapper = (fieldName: string, currentValue: string | number): void => {
    // Block editing of totalPaid - it should only be changed through allocation
    if (fieldName === 'totalPaid') {
      return;
    }
    handleDoubleClick(fieldName, currentValue.toString());
  };

  const handleConfirmBudgetChange = () => {
    if (pendingPaymentChange !== null && originalDebt && onUpdate && onBudgetUpdate) {
      // Calculate the difference and update the budget
      const currentTotal = isStrategicDebt ? debt.recommendedPayment : debt.plannedPayment;
      const difference = pendingPaymentChange - currentTotal;
      const newBudgetAmount = Math.max(0, debtBudget + difference);
      
      // Update the debt with the new planned payment
      const updatedDebt = { ...originalDebt };
      updatedDebt.plannedPayment = pendingPaymentChange;
      onUpdate(index, updatedDebt);
      
      // Update the budget
      onBudgetUpdate(newBudgetAmount);
    }
    
    setShowBudgetDialog(false);
    setPendingPaymentChange(null);
    setOriginalDebt(null);
    setEditingField(null);
  };

  const handleDiscardChange = () => {
    setShowBudgetDialog(false);
    setPendingPaymentChange(null);
    setOriginalDebt(null);
    setEditingField(null);
  };

  return (
    <>
      <div className="bg-black/20 p-4 rounded border border-slate-600 relative" onClick={handleClickOutside}>
        <DebtItemHeader
          debt={debt}
          editingField={editingField}
          localEditValue={localEditValue}
          showStrategy={showStrategy}
          canEdit={!!onUpdate}
          onDoubleClick={handleDoubleClickWrapper}
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
          onDoubleClick={handleDoubleClickWrapper}
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

      <BudgetChangeDialog
        isOpen={showBudgetDialog}
        onOpenChange={setShowBudgetDialog}
        pendingPaymentChange={pendingPaymentChange}
        currentPayment={isStrategicDebt ? debt.recommendedPayment : debt.plannedPayment}
        debtBudget={debtBudget}
        onConfirm={handleConfirmBudgetChange}
        onCancel={handleDiscardChange}
      />
    </>
  );
};

export default DebtItemContainer;
