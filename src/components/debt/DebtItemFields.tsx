
import EditableField from './EditableField';

interface DebtItemFieldsProps {
  debt: any;
  editingField: string | null;
  localEditValue: string;
  increment: number;
  canEdit: boolean;
  onDoubleClick: (fieldName: string, currentValue: number) => void;
  onLocalValueChange: (value: string) => void;
  onFieldBlur: (fieldName: string) => void;
  onIncrement: (fieldName: string) => void;
  onDecrement: (fieldName: string) => void;
}

const DebtItemFields = ({
  debt,
  editingField,
  localEditValue,
  increment,
  canEdit,
  onDoubleClick,
  onLocalValueChange,
  onFieldBlur,
  onIncrement,
  onDecrement
}: DebtItemFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
        <EditableField
          fieldName="balance"
          value={debt.balance}
          label="BALANCE"
          colorClass="text-red-400"
          editingField={editingField}
          localEditValue={localEditValue}
          increment={increment}
          onDoubleClick={onDoubleClick}
          onLocalValueChange={onLocalValueChange}
          onFieldBlur={onFieldBlur}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          canEdit={canEdit}
        />
        <EditableField
          fieldName="interestRate"
          value={debt.interestRate}
          label="INTEREST RATE (%)"
          colorClass="text-yellow-400"
          editingField={editingField}
          localEditValue={localEditValue}
          increment={0.5}
          onDoubleClick={onDoubleClick}
          onLocalValueChange={onLocalValueChange}
          onFieldBlur={onFieldBlur}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          canEdit={canEdit}
          showButtons={false}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
        <EditableField
          fieldName="minPayment"
          value={debt.minPayment}
          label="MIN PAYMENT"
          colorClass="text-orange-400"
          editingField={editingField}
          localEditValue={localEditValue}
          increment={increment}
          onDoubleClick={onDoubleClick}
          onLocalValueChange={onLocalValueChange}
          onFieldBlur={onFieldBlur}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          canEdit={canEdit}
        />
        <EditableField
          fieldName="plannedPayment"
          value={debt.plannedPayment}
          label="PLANNED PAYMENT"
          colorClass="text-blue-400"
          editingField={editingField}
          localEditValue={localEditValue}
          increment={increment}
          onDoubleClick={onDoubleClick}
          onLocalValueChange={onLocalValueChange}
          onFieldBlur={onFieldBlur}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          canEdit={canEdit}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
        <EditableField
          fieldName="totalPaid"
          value={debt.totalPaid}
          label="TOTAL PAID"
          colorClass="text-green-400"
          editingField={editingField}
          localEditValue={localEditValue}
          increment={increment}
          onDoubleClick={onDoubleClick}
          onLocalValueChange={onLocalValueChange}
          onFieldBlur={onFieldBlur}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
          canEdit={canEdit}
        />
        <div></div>
      </div>
    </>
  );
};

export default DebtItemFields;
